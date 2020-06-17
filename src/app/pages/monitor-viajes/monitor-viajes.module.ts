import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorViajesPageRoutingModule } from './monitor-viajes-routing.module';

import { MonitorViajesPage } from './monitor-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorViajesPageRoutingModule
  ],
  declarations: [MonitorViajesPage]
})
export class MonitorViajesPageModule {}
