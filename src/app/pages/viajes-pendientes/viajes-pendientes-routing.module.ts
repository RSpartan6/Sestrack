import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesPendientesPage } from './viajes-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesPendientesPageRoutingModule {}
