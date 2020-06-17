import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajesNuevoPage } from './viajes-nuevo.page';

describe('ViajesNuevoPage', () => {
  let component: ViajesNuevoPage;
  let fixture: ComponentFixture<ViajesNuevoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesNuevoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesNuevoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
