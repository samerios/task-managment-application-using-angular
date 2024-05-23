import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  //  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  // other routes here
  { path: '**', redirectTo: '' }  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
