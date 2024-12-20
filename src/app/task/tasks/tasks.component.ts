import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskDetailsService } from '../services/task-details.service';
import { take } from 'rxjs';
import { TaskDetails } from 'src/app/models/task/task-details';
import { TableConfig } from 'src/app/models/components-models/table/table-config';
import { ColumnConfig } from 'src/app/models/components-models/table/column-config';
import { MatDialog } from '@angular/material/dialog';
import { TaskModelFormComponent } from './task-model-form/task-model-form.component';
import { UserService } from 'src/app/core/auth/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  @ViewChild("taskModelForm") taskModelForm!: TaskModelFormComponent;

  /**
   * Task details table configuration
   */
  tasksDetailsTableConfig!: TableConfig;

  columnsConfig: ColumnConfig[] = [];

  constructor(private taskDetailsService: TaskDetailsService, private userService: UserService) { }

  ngOnInit(): void {
    this.columnsConfig = [
      new ColumnConfig("id", "MODULES.TASK.ID", 'text', true),
      new ColumnConfig("title", "MODULES.TASK.Title"),
      new ColumnConfig("description", "MODULES.TASK.Description"),
      new ColumnConfig("priority", "MODULES.TASK.Priority", 'translatedText', true, null, 'MODULES.TASK.PRIORITY'),
      new ColumnConfig("status", "MODULES.TASK.Status", 'translatedText', true, null, 'MODULES.TASK.STATUS'),
      new ColumnConfig("dueDate", "MODULES.TASK.Due_date", 'DateTime', true)
    ];
    this.initData();
  }

  initData() {
    this.taskDetailsService.getUserTasks(this.userService.getCurrentUser.id).pipe(take(1)).subscribe((data: TaskDetails[]) => {
      this.tasksDetailsTableConfig = new TableConfig(data, this.columnsConfig, "id", false, true);
    })
  }

  openTaskModel(e: any) {
    e.preventDefault();
    this.taskModelForm.open();
  }
}
