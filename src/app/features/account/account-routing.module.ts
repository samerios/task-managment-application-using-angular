import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginIndexComponent } from './login/components/index/index.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginIndexComponent,
  },

  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
