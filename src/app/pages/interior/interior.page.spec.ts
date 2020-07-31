import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InteriorPage } from './interior.page';

describe('InteriorPage', () => {
  let component: InteriorPage;
  let fixture: ComponentFixture<InteriorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteriorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InteriorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
