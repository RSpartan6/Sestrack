import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajesNuevoPage } from './viajes-nuevo.page';

const routes: Routes = [
  {
    path: '',
    component: ViajesNuevoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajesNuevoPageRoutingModule {}
