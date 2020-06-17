import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesModificarPage } from './viajes-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesModificarPageRoutingModule {}
