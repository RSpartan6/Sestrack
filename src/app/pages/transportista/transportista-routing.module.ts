import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportistaPage } from './transportista.page';

const routes: Routes = [
  {
    path: '',
    component: TransportistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportistaPageRoutingModule {}
