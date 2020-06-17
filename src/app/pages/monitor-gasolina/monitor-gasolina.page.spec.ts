import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorGasolinaPage } from './monitor-gasolina.page';

describe('MonitorGasolinaPage', () => {
  let component: MonitorGasolinaPage;
  let fixture: ComponentFixture<MonitorGasolinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorGasolinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorGasolinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
