import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajesModificarPageRoutingModule } from './viajes-modificar-routing.module';

import { ViajesModificarPage } from './viajes-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajesModificarPageRoutingModule
  ],
  declarations: [ViajesModificarPage]
})
export class ViajesModificarPageModule {}
