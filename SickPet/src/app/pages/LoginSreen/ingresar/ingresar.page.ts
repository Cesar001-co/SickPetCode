import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IngresarPageForm } from './ingresar.page.form';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new IngresarPageForm(this.formBuilder).createForm();
  }

  gotoNewPassword(){
    this.router.navigate(['/new-password']);
  }

  gotoHome(){
    this.router.navigate(['/home']);
  }

  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
