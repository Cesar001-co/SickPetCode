import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { IngresarPage } from './ingresar.page';

describe('IngresarPage', () => {
  let component: IngresarPage;
  let fixture: ComponentFixture<IngresarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarPage ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarPage);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
