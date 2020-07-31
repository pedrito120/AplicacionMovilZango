import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExterioresPage } from './exteriores.page';

describe('ExterioresPage', () => {
  let component: ExterioresPage;
  let fixture: ComponentFixture<ExterioresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExterioresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExterioresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
