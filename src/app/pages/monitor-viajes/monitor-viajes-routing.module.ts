import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorViajesPage } from './monitor-viajes.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorViajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorViajesPageRoutingModule {}
