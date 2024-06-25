import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardIndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'dashboard' },
  {
    path: 'dashboard', children: [
      { path: '', component: TasksDashboardIndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
