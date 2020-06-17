import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesPendientesPageRoutingModule } from './viajes-pendientes-routing.module';

import { ViajesPendientesPage } from './viajes-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesPendientesPageRoutingModule
  ],
  declarations: [ViajesPendientesPage]
})
export class ViajesPendientesPageModule {}
