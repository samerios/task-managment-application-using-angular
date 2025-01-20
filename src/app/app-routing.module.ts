// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/task/task.module').then((m) => m.TaskModule),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/account', pathMatch: 'full' },
  { path: '**', redirectTo: '/account' }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
