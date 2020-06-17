import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportistaPageRoutingModule } from './transportista-routing.module';

import { TransportistaPage } from './transportista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportistaPageRoutingModule
  ],
  declarations: [TransportistaPage]
})
export class TransportistaPageModule {}
