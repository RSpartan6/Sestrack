import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorTemperaturaPage } from './monitor-temperatura.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorTemperaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorTemperaturaPageRoutingModule {}
