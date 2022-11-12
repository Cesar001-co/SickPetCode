import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { IngresarPageForm } from './ingresar.page.form';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  form: FormGroup;

  rol = '';
  uid = '';

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService,
    private alertController: AlertController) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.form = new IngresarPageForm(this.formBuilder).createForm();
  }

  async onSubmit() {
    const res = await this.userService.login(this.form.value)
      .catch(error => {
        this.errorAlert();
        console.log('error');
      });
    if (res) {
      const id = res.user.uid;
      this.uid = id;
      console.log('uID: ', id);

      this.userService.getDatosUsuario(id).subscribe(data => {
        this.rol = data.perfil;
        this.redirectUser();
      });
    }
  }

  redirectUser() {
    if (this.rol === 'per') {
      this.router.navigate(['/home-persona',this.uid]);
    } else {
      this.router.navigate(['/home-clinica',this.uid]);
    }
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

  // ====================================
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Algo mal ocurrio, verifica tu email y/o contraseña',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
