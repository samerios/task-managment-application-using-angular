import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginIndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'login' },
  {
    path: '', children: [
      { path: 'login', component: LoginIndexComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
