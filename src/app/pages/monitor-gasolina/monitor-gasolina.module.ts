import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorGasolinaPageRoutingModule } from './monitor-gasolina-routing.module';

import { MonitorGasolinaPage } from './monitor-gasolina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorGasolinaPageRoutingModule
  ],
  declarations: [MonitorGasolinaPage]
})
export class MonitorGasolinaPageModule {}
