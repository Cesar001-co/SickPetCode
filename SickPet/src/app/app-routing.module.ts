import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',redirectTo: 'loader',pathMatch: 'full'},
  {path: 'loader',loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)},
  {path: 'login',loadChildren: () => import('./pages/LoginSreen/login/login.module').then( m => m.LoginPageModule)},
  {
    path: 'signin',
    loadChildren: () => import('./pages/LoginSreen/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'ingresar',
    loadChildren: () => import('./pages/LoginSreen/ingresar/ingresar.module').then( m => m.IngresarPageModule)
  },
  {
    path: 'register-confi',
    loadChildren: () => import('./pages/LoginSreen/register-confi/register-confi.module').then( m => m.RegisterConfiPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./pages/LoginSreen/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'select-user-tipe',
    loadChildren: () => import('./pages/Users/select-user-tipe/select-user-tipe.module').then( m => m.SelectUserTipePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
