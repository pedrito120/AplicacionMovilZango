import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PortadaPage } from './portada.page';

describe('PortadaPage', () => {
  let component: PortadaPage;
  let fixture: ComponentFixture<PortadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortadaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PortadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
