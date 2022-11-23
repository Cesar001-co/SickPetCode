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
  {
    path: 'home-persona/:id',
    loadChildren: () => import('./pages/home/persona/home-persona/home-persona.module').then(m => m.HomePersonaPageModule)
  },
  {
    path: 'home-clinica/:id',
    loadChildren: () => import('./pages/home/clinica/home-clinica/home-clinica.module').then(m => m.HomeClinicaPageModule)
  },
  {
    path: 'mascotas-user/:id',
    loadChildren: () => import('./pages/home/persona/mascotas/mascotas-user/mascotas-user.module').then(m => m.MascotasUserPageModule)
  },
  {
    path: 'registrarmascota/:id',
    loadChildren: () => import('./pages/home/persona/mascotas/registrarmascota/registrarmascota.module')
      .then(m => m.RegistrarmascotaPageModule)
  },
  {
    path: 'mascotasform/:idm/:idu',
    loadChildren: () => import('./pages/home/persona/mascotas/mascotasform/mascotasform.module').then(m => m.MascotasformPageModule)
  },
  {
    path: 'solicitudes-curso/:id',
    loadChildren: () => import('./pages/home/clinica/solicitudes-curso/solicitudes-curso.module').then( m => m.SolicitudesCursoPageModule)
  },
  {
    path: 'solicitud/:id/:solicitud',
    loadChildren: () => import('./pages/home/clinica/solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  },











];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
