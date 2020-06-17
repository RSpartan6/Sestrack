import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorTrackingPageRoutingModule } from './monitor-tracking-routing.module';

import { MonitorTrackingPage } from './monitor-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorTrackingPageRoutingModule
  ],
  declarations: [MonitorTrackingPage]
})
export class MonitorTrackingPageModule {}
