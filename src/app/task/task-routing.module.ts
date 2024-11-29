import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardIndexComponent } from './dashboard/index/index.component';
import { TasksComponent } from './tasks/tasks.component';

const routes: Routes = [
  {
    path: 'dashboard', component: TasksDashboardIndexComponent
  },
  {
    path: 'tasks', component: TasksComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {
}
