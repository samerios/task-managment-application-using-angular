import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { TaskDetailsService } from '../../services/task-details.service';
import { take } from 'rxjs';
import { FormStatus } from 'src/app/shared/models/components-models/model-form-configuration';
import {
  CreateTaskDetails,
  TaskDetails,
} from 'src/app/shared/models/task/task-details';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-task-model-form',
  templateUrl: './task-model-form.component.html',
  styleUrl: './task-model-form.component.scss',
})
export class TaskModelFormComponent implements OnInit {
  @ViewChild('sidenav') sidenavRef!: MatSidenav;

  @Output() onCreate = new EventEmitter();

  @Output() onClose = new EventEmitter();

  taskForm!: FormGroup;

  formStatus: FormStatus = 'ADD';

  class!: string;

  taskPriorityList = ['High', 'Medium', 'Low'];

  taskStatusList: any = ['ToDo', 'InProgress', 'Done'];

  selectedTaskToEdit: TaskDetails | null = null;

  constructor(
    private fb: FormBuilder,
    private taskDetailService: TaskDetailsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: [''],
      priority: ['Low', [Validators.required]],
      status: ['ToDo', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
  }

  get header() {
    return this.formStatus == 'ADD'
      ? 'MODULES.TASK.ADD_TASK'
      : 'MODULES.TASK.EDIT_TASK';
  }

  open(formStatus: FormStatus = 'ADD', selectedRow: any) {
    if (formStatus == 'EDIT' && selectedRow != null) {
      this.selectedTaskToEdit = selectedRow;
      this.taskForm.patchValue(selectedRow);
    }

    this.formStatus = formStatus;
    this.class = 'task-form-container';
    this.sidenavRef.toggle();
  }

  close() {
    this.selectedTaskToEdit = null;
    this.class = '';
    this.sidenavRef.close();
    this.onClose.emit();
  }

  getDirtyValues(form: FormGroup): any {
    const dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);

      if (control instanceof FormGroup) {
        // Recursively call for nested FormGroups
        const nestedDirtyValues = this.getDirtyValues(control);
        if (Object.keys(nestedDirtyValues).length > 0) {
          dirtyValues[key] = nestedDirtyValues;
        }
      } else if (control?.dirty) {
        // Include only dirty controls
        dirtyValues[key] = control.value;
      }
    });

    return dirtyValues;
  }

  onSave(e: Event) {
    e.preventDefault();

    if (this.taskForm.valid) {
      let taskDetails: any = {};

      Object.assign(
        taskDetails,
        this.formStatus === 'ADD'
          ? this.taskForm.value
          : this.getDirtyValues(this.taskForm)
      );

      if (this.formStatus == 'ADD') {
        let user = this.accountService.getCurrentUser;
        taskDetails.userId = user?.id;
        this.taskDetailService
          .createTask(taskDetails as CreateTaskDetails)
          .pipe(take(1))
          .subscribe(() => {
            this.close();
            this.onCreate.emit();
          });
      } else {
        taskDetails.id = this.selectedTaskToEdit!.id;

        this.taskDetailService
          .putTask(this.selectedTaskToEdit!.id, taskDetails)
          .pipe(take(1))
          .subscribe(() => {
            this.close();
            this.onClose.emit();
            this.onCreate.emit();
          });
      }
    }
  }
}
