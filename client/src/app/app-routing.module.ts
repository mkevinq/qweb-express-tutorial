import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { AboutComponent } from './components/about/about.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'upload',
    canActivate: [ AuthGuard ],
    component: DragDropComponent
  },
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: HomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
