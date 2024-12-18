import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { FormStatus } from 'src/app/models/components-models/model-form-configuration';
import { TaskDetailsService } from '../../services/task-details.service';
import { TaskDetails } from 'src/app/models/task/task-details';
import { UserService } from 'src/app/core/auth/services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-model-form',
  templateUrl: './task-model-form.component.html',
  styleUrl: './task-model-form.component.scss'
})
export class TaskModelFormComponent implements OnInit {

  @ViewChild("sidenav") sidenavRef!: MatSidenav;

  @Output() onCreate = new EventEmitter();

  form!: FormGroup;

  formStatus: FormStatus = 'ADD';

  class!: string;

  taskPriorityList = ['High', 'Medium', 'Low'];

  taskStatusList: any = [{ "ToDo": "To Do" }, { "InProgress": "In Progress" }, { "Done": "Done" }];

  constructor(private fb: FormBuilder, private taskDetailService: TaskDetailsService, private user: UserService) {
    this.taskStatusList = this.taskStatusList.flatMap((status: any) =>
      Object.entries(status).map(([key, value]) => ({ key, value }))
    );
  }

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
    return this.formStatus == 'ADD' ? 'MODULES.TASK.ADD_TASK' : 'MODULES.TASK.EDI_TASK';
  }

  open(formStatus: FormStatus = 'ADD') {
    this.formStatus = formStatus
    this.class = 'task-form-container';
    this.sidenavRef.toggle();
  }

  close() {
    this.class = '';
    this.sidenavRef.close();
  }

  onSave(e: any) {
    e.preventDefault();
    if (this.form.valid) {
      let taskDetails: any = {};

      Object.assign(taskDetails, this.form.value);
      taskDetails.userId = JSON.parse(this.user.getCurrentUser()).id;

      this.taskDetailService.setTask(taskDetails as TaskDetails).pipe(take(1)).subscribe((response) => {
        this.close();
        this.onCreate.emit();
      })
    }
  }
}
