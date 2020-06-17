import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorTrackingPage } from './monitor-tracking.page';

describe('MonitorTrackingPage', () => {
  let component: MonitorTrackingPage;
  let fixture: ComponentFixture<MonitorTrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
