import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from './core/auth/guard/can-activate.guard';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  //  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule), canActivate: [CanActivateAuthGuard], canDeactivate: [CanActivateAuthGuard] },
  // other routes here
  { path: '**', redirectTo: '' }  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
