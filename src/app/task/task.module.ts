import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksDashboardIndexComponent } from './dashboard/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from "../core/core.module";
import { TasksComponent } from './tasks/tasks.component';
import { TaskModelFormComponent } from './tasks/task-model-form/task-model-form.component';


@NgModule({
    declarations: [
        TasksDashboardIndexComponent,
        TasksComponent,
        TaskModelFormComponent
    ],
    imports: [
        CommonModule,
        TaskRoutingModule,
        SharedModule,
        CoreModule
    ]
})
export class TaskModule { }
