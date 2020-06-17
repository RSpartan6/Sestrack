import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorTemperaturaPageRoutingModule } from './monitor-temperatura-routing.module';

import { MonitorTemperaturaPage } from './monitor-temperatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorTemperaturaPageRoutingModule
  ],
  declarations: [MonitorTemperaturaPage]
})
export class MonitorTemperaturaPageModule {}
