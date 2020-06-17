import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitoresPage } from './monitores.page';

describe('MonitoresPage', () => {
  let component: MonitoresPage;
  let fixture: ComponentFixture<MonitoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
