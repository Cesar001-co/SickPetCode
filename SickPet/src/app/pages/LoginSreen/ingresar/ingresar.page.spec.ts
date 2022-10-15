import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { IngresarPage } from './ingresar.page';

describe('IngresarPage', () => {
  let component: IngresarPage;
  let fixture: ComponentFixture<IngresarPage>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarPage);
    router = TestBed.get(Router);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should go to new-password', () => {
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/new-password']);
  });
});
