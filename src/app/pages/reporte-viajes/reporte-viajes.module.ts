import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteViajesPageRoutingModule } from './reporte-viajes-routing.module';

import { ReporteViajesPage } from './reporte-viajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteViajesPageRoutingModule
  ],
  declarations: [ReporteViajesPage]
})
export class ReporteViajesPageModule {}
