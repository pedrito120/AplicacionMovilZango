import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalizarPage } from './analizar.page';

describe('AnalizarPage', () => {
  let component: AnalizarPage;
  let fixture: ComponentFixture<AnalizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalizarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
