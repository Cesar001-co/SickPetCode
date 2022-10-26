import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserReg } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  createUser: FormGroup;
  datos: UserReg = {
    nombres: null,
    apellidos: null,
    uID: null,
    email: null,
    numDoc: null,
    numCon: null,
    perfil: null
  };

  // Validators =======================================
  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private alertController: AlertController) {
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
  // ==================================================
  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Usuario registrado con exito',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Algo mal ocurrio, verifica tu email',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // ==================================================
  async agregarUsuer() {
    console.log('datos ->', this.createUser);
    const res = await this.userService.register(this.createUser.value)
      .catch(error => {
        this.errorAlert();
      });
    if (res) {
      this.confirmAlert();
      this.router.navigate(['/register-confi']);
      const id = res.user.uid;
      this.datos.uID = id;
      this.datos.nombres = this.createUser.get('nombre').value;
      this.datos.apellidos = this.createUser.get('apellidos').value;
      this.datos.email = this.createUser.get('email').value;
      this.datos.numDoc = this.createUser.get('numDoc').value;
      this.datos.numCon = this.createUser.get('numCel').value;
      this.datos.perfil = 'per';
      this.userService.registrarUserCollection(this.datos, id);
    }
  }

  ngOnInit() {
    // this.form = new IngresarPageForm(this.formBuilder).createForm();
  }



  // onSubmit() {
  //   this.userService.register(this.form.value)
  //     .then(response => {
  //       this.router.navigate(['/register-confi']);
  //     })
  //     .catch(error => console.log(error));
  // }
}


