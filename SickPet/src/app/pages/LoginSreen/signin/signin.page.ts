import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IngresarPageForm } from './signin.page.forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  form: FormGroup;

  // datos: UserReg = {
  //   nombres: null,
  //   apellidos: null,
  //   uid: null,
  //   email: null,
  //   password: null,
  //   numDoc: null,
  //   numContacto: null
  // };

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {
    this.form = new FormGroup({
      email: new FormControl(),
      password1: new FormControl()
    });
  }

  // async registrar(){
  //   console.log('datos ->', this.datos);
  //   const res = await this.userService.registrarUser(this.datos)
  //     .catch(error => {
  //       console.log('error');
  //     });
  //     if (res) {
  //       console.log('Exito al crear el usuario');
  //       const path = 'Usuarios';
  //       const id = res.user.uid;
  //       this.datos.uid = id;
  //       this.datos.password = null;
  //       await this.userService.createDoc(this.datos, path, id);
  //     }
  // }

  ngOnInit() {
    this.form = new IngresarPageForm(this.formBuilder).createForm();
  }

  // gotoLoginConfi(){
  //   this.router.navigate(['/register-confi']);
  // }

  onSubmit() {
    this.userService.register(this.form.value)
      .then(response => {
        this.router.navigate(['/register-confi']);
      })
      .catch(error => console.log(error));
  }

}
