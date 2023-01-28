import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './main/components/not-found/not-found.component';
import { SigninComponent } from './main/components/signin/signin.component';
import { SignupComponent } from './main/components/signup/signup.component';
import { AuthGuard } from './main/utils/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/modules/user/user.module').then((m) => m.UserModule),
    canActivate:[AuthGuard],
    data:{role:'USER'},
  },
  {
    path: 'admin',
    loadChildren: () => import('./main/modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate:[AuthGuard],
    data:{role:'ADMIN'},
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
