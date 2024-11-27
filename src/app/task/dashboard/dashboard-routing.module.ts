import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardIndexComponent } from './index/index.component';
import { TasksComponent } from '../tasks/tasks.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'dashboard' },
  {
    path: 'dashboard', component: TasksDashboardIndexComponent
  },
  {
    path: 'tasks', component: TasksComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
