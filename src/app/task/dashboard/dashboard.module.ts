import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TasksDashboardIndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from "../../core/core.module";


@NgModule({
    declarations: [
        TasksDashboardIndexComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        CoreModule
    ]
})
export class DashboardModule { }
