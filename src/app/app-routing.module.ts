// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/login.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [LoginGuard],canActivateChild:[LoginGuard] },
  { 
    path: 'tasks', 
    loadChildren: () => import('./task/dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard] 
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
