import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajesModificarPage } from './viajes-modificar.page';

describe('ViajesModificarPage', () => {
  let component: ViajesModificarPage;
  let fixture: ComponentFixture<ViajesModificarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesModificarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
