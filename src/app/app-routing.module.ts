import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'detalle-viaje',
    loadChildren: () => import('./pages/detalle-viaje/detalle-viaje.module').then( m => m.DetalleViajePageModule)
  },
  {
    path: 'gastos',
    loadChildren: () => import('./pages/gastos/gastos.module').then( m => m.GastosPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'incidencias',
    loadChildren: () => import('./pages/incidencias/incidencias.module').then( m => m.IncidenciasPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mail',
    loadChildren: () => import('./pages/mail/mail.module').then( m => m.MailPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'monitor-gasolina',
    loadChildren: () => import('./pages/monitor-gasolina/monitor-gasolina.module').then( m => m.MonitorGasolinaPageModule)
  },
  {
    path: 'monitor-temperatura',
    loadChildren: () => import('./pages/monitor-temperatura/monitor-temperatura.module').then( m => m.MonitorTemperaturaPageModule)
  },
  {
    path: 'monitor-tracking',
    loadChildren: () => import('./pages/monitor-tracking/monitor-tracking.module').then( m => m.MonitorTrackingPageModule)
  },
  {
    path: 'monitor-viajes',
    loadChildren: () => import('./pages/monitor-viajes/monitor-viajes.module').then( m => m.MonitorViajesPageModule)
  },
  {
    path: 'monitores',
    loadChildren: () => import('./pages/monitores/monitores.module').then( m => m.MonitoresPageModule)
  },
  {
    path: 'nuevo-gasto',
    loadChildren: () => import('./pages/nuevo-gasto/nuevo-gasto.module').then( m => m.NuevoGastoPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'reporte-viajes',
    loadChildren: () => import('./pages/reporte-viajes/reporte-viajes.module').then( m => m.ReporteViajesPageModule)
  },
  {
    path: 'transportista',
    loadChildren: () => import('./pages/transportista/transportista.module').then( m => m.TransportistaPageModule)
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./pages/ubicacion/ubicacion.module').then( m => m.UbicacionPageModule)
  },
  {
    path: 'viajes-modificar',
    loadChildren: () => import('./pages/viajes-modificar/viajes-modificar.module').then( m => m.ViajesModificarPageModule)
  },
  {
    path: 'viajes-nuevo',
    loadChildren: () => import('./pages/viajes-nuevo/viajes-nuevo.module').then( m => m.ViajesNuevoPageModule)
  },
  {
    path: 'viajes-pendientes',
    loadChildren: () => import('./pages/viajes-pendientes/viajes-pendientes.module').then( m => m.ViajesPendientesPageModule)
  },
  {
    path: 'viajes-terminados',
    loadChildren: () => import('./pages/viajes-terminados/viajes-terminados.module').then( m => m.ViajesTerminadosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
