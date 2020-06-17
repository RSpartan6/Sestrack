import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesNuevoPageRoutingModule } from './viajes-nuevo-routing.module';

import { ViajesNuevoPage } from './viajes-nuevo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesNuevoPageRoutingModule
  ],
  declarations: [ViajesNuevoPage]
})
export class ViajesNuevoPageModule {}
