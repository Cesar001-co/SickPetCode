import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'loader', pathMatch: 'full' },
  { path: 'loader', loadChildren: () => import('./pages/loader/loader.module').then(m => m.LoaderPageModule) },
  { path: 'login', loadChildren: () => import('./pages/LoginSreen/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'signin',
    loadChildren: () => import('./pages/LoginSreen/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'ingresar',
    loadChildren: () => import('./pages/LoginSreen/ingresar/ingresar.module').then(m => m.IngresarPageModule)
  },
  {
    path: 'register-confi',
    loadChildren: () => import('./pages/LoginSreen/register-confi/register-confi.module').then(m => m.RegisterConfiPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./pages/LoginSreen/new-password/new-password.module').then(m => m.NewPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'user-tipes',
    loadChildren: () => import('./pages/LoginSreen/Users/user-tipes/user-tipes.module').then(m => m.UserTipesPageModule)
  },
  {
    path: 'datos-cli',
    loadChildren: () => import('./pages/LoginSreen/Users/ClinicForms/datos-cli/datos-cli.module').then(m => m.DatosCliPageModule)
  },
  {
    path: 'services-cli',
    loadChildren: () => import('./pages/LoginSreen/Users/ClinicForms/services-cli/services-cli.module').then(m => m.ServicesCliPageModule)
  },
  {
    path: 'ubicacion-cli',
    loadChildren: () => import('./pages/LoginSreen/Users/ClinicForms/ubicacion-cli/ubicacion-cli.module')
      .then(m => m.UbicacionCliPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
