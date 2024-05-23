import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        IndexComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        SharedModule,
    ]
})
export class LoginModule { }
