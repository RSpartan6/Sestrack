import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorTrackingPage } from './monitor-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorTrackingPageRoutingModule {}
