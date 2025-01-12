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
import { TaskDetails } from 'src/app/shared/models/task/task-details';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-task-model-form',
  templateUrl: './task-model-form.component.html',
  styleUrl: './task-model-form.component.scss',
})
export class TaskModelFormComponent implements OnInit {
  @ViewChild('sidenav') sidenavRef!: MatSidenav;

  @Output() onCreate = new EventEmitter();

  form!: FormGroup;

  formStatus: FormStatus = 'ADD';

  class!: string;

  taskPriorityList = ['High', 'Medium', 'Low'];

  taskStatusList: any = ['ToDo', 'InProgress', 'Done'];

  selectedTaskToEdit!: TaskDetails | null;

  constructor(
    private fb: FormBuilder,
    private taskDetailService: TaskDetailsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
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
      this.form.patchValue(selectedRow);
    }

    this.formStatus = formStatus;
    this.class = 'task-form-container';
    this.sidenavRef.toggle();
  }

  close() {
    this.selectedTaskToEdit = null;
    this.class = '';
    this.sidenavRef.close();
  }

  getChangedFields(): any {
    let changes: any[] = [];

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control && control.dirty) {
        changes.push({ op: 'replace', path: `/${key}`, value: control.value });
      }
    });
    return changes;
  }

  onSave(e: any) {
    e.preventDefault();
    if (this.form.valid) {
      let taskDetails: any = {};

      Object.assign(
        taskDetails,
        this.formStatus === 'ADD' ? this.form.value : this.getChangedFields()
      );

      if (this.formStatus == 'ADD') {
        let user = this.userService.getCurrentUser;
        taskDetails.userId = user.id;
        this.taskDetailService
          .createTask(taskDetails as TaskDetails)
          .pipe(take(1))
          .subscribe((response) => {
            this.close();
            this.onCreate.emit();
          });
      } else {
        this.taskDetailService
          .putTask(this.selectedTaskToEdit?.id || 0, taskDetails)
          .pipe(take(1))
          .subscribe((response) => {
            this.close();
            this.onCreate.emit();
          });
      }
    }
  }
}
