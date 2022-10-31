import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  createUser: FormGroup;
  // datos: UserReg = {
  //   nombres: null,
  //   apellidos: null,
  //   uID: null,
  //   email: null,
  //   numDoc: null,
  //   numCon: null,
  //   perfil: null
  // };

  // Validators =======================================
  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,) {
    this.createUser = this.fb.group({
      uID: [''],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
      numDoc: ['', [Validators.required, Validators.minLength(6)]],
      numCel: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.createUser.get('repeatPassword').setValidators(this.matchPasswordandRepeatPassword(this.createUser));
  }

  matchPasswordandRepeatPassword(form: FormGroup): ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => password.value === repeatPassword.value ? null : { isntMatching: true };
    return validator;
  }
  async agregarUsuer() {
    console.log('datos ->', this.createUser);
    this.userService.sendObjectSourse(this.createUser.value);
    this.router.navigate(['/user-tipes']);
  }

  ngOnInit() {}
}


