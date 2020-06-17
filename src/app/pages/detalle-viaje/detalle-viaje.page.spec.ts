import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleViajePage } from './detalle-viaje.page';

describe('DetalleViajePage', () => {
  let component: DetalleViajePage;
  let fixture: ComponentFixture<DetalleViajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleViajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
