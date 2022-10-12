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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }