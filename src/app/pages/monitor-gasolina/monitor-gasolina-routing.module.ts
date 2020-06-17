import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorGasolinaPage } from './monitor-gasolina.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorGasolinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorGasolinaPageRoutingModule {}
