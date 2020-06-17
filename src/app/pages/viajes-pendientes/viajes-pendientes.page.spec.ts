import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajesPendientesPage } from './viajes-pendientes.page';

describe('ViajesPendientesPage', () => {
  let component: ViajesPendientesPage;
  let fixture: ComponentFixture<ViajesPendientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesPendientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
