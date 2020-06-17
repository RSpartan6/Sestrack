import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorViajesPage } from './monitor-viajes.page';

describe('MonitorViajesPage', () => {
  let component: MonitorViajesPage;
  let fixture: ComponentFixture<MonitorViajesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorViajesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
