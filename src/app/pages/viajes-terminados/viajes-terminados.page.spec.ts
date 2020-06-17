import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajesTerminadosPage } from './viajes-terminados.page';

describe('ViajesTerminadosPage', () => {
  let component: ViajesTerminadosPage;
  let fixture: ComponentFixture<ViajesTerminadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesTerminadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesTerminadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
