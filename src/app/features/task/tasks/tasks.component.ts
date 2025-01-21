import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TaskDetailsService } from '../services/task-details.service';
import { take } from 'rxjs';
import { TaskModelFormComponent } from './task-model-form/task-model-form.component';
import { FormStatus } from 'src/app/shared/models/components-models/model-form-configuration';
import { ColumnConfig } from 'src/app/shared/models/components-models/table/column-config';
import { TableConfig } from 'src/app/shared/models/components-models/table/table-config';
import { TaskDetails } from 'src/app/shared/models/task/task-details';
import { AccountService } from 'src/app/core/services/account.service';
import { SystemDialogComponent } from 'src/app/shared/components/system-dialog/system-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  @ViewChild('taskModelForm') taskModelForm!: TaskModelFormComponent;

  readonly dialog = inject(MatDialog);

  /**
   * Task details table configuration
   */
  tasksDetailsTableConfig!: TableConfig;

  columnsConfig: ColumnConfig[] = [];

  constructor(
    private taskDetailsService: TaskDetailsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.columnsConfig = [
      new ColumnConfig('id', 'MODULES.TASK.ID', 'text', true),
      new ColumnConfig('title', 'MODULES.TASK.Title'),
      new ColumnConfig(
        'priority',
        'MODULES.TASK.Priority',
        'translatedText',
        true,
        null,
        'MODULES.TASK.PRIORITY'
      ),
      new ColumnConfig(
        'status',
        'MODULES.TASK.Status',
        'translatedText',
        true,
        null,
        'MODULES.TASK.STATUS'
      ),
      new ColumnConfig('dueDate', 'MODULES.TASK.Due_date', 'DateTime', true),
    ];
    this.initData();
  }

  initData() {
    this.taskDetailsService
      .getUserTasks(this.accountService.getCurrentUser!.id)
      .pipe(take(1))
      .subscribe((data: TaskDetails[]) => {
        this.tasksDetailsTableConfig = {
          data: data,
          columnConfig: this.columnsConfig,
          primaryKeyColumn: 'id',
          deletable: true,
          editable: true,
        };
      });
  }

  openTaskModel(
    e: any,
    formStatus: FormStatus = 'ADD',
    selectedRow?: TaskDetails
  ) {
    e.preventDefault();
    this.taskModelForm.open(formStatus, selectedRow);
  }

  openDeleteTaskDialog(e: Event, selectedTaskId: number) {
    e.preventDefault();
    const dialogRef = this.dialog.open(SystemDialogComponent, {
      data: {
        dialogType: 'YesNoPrompt',
        title: 'MODULES.TASK.MESSAGES.DELETE_TASK.TITLE',
        content: 'MODULES.TASK.MESSAGES.DELETE_TASK.CONTENT',
        entityId: selectedTaskId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result == 'yes') {
          this.taskDetailsService
            .deleteTask(selectedTaskId)
            .pipe(take(1))
            .subscribe(() => {
              this.initData();
            });
        } else {
          return;
        }
      });
  }
}
