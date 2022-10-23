import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IngresarPageForm } from './ingresar.page.form';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.form = new IngresarPageForm(this.formBuilder).createForm();
  }

  onSubmit() {
    this.userService.login(this.form.value)
    .then(response => {
      this.router.navigate(['/home']);
    })
      .catch(error => console.log(error));
  }

  gotoNewPassword() {
    this.router.navigate(['/new-password']);
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }
}
