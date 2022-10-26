import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { IngresarPageForm } from './new-password.page.forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private alertController: AlertController,
    private router: Router) {
    this.form = new FormGroup({
      email: new FormControl()
    });
  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Email enviado, revisa tu correo',
      buttons: ['OK'],
    });
    this.router.navigate(['/ingresar']);
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

  ngOnInit() {
    this.form = new IngresarPageForm(this.formBuilder).createForm();
  }

  async onReset() {
    try {
      this.userService.resetPassword(this.form.value)
        .then(response => {
          this.confirmAlert();
        })
        .catch(error => this.errorAlert());
    } catch (error) {
      this.errorAlert();
    }
  }
}
