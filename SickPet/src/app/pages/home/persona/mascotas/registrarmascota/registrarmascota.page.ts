import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MascotaData, TipoMascota, UserReg } from 'src/app/models/models';
import { ServiciosMascotas } from 'src/app/services/mascotas.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrarmascota',
  templateUrl: './registrarmascota.page.html',
  styleUrls: ['./registrarmascota.page.scss'],
})
export class RegistrarmascotaPage implements OnInit {

  selectmascota: TipoMascota;
  uid: any;
  tipos: TipoMascota[] = [];
  createmascota: FormGroup;
  mascotaData: MascotaData = {
    uID: '',
    mascotaTipe: {
      idTipo: '',
      tipomascota: ''
    },
    nombreMasc: '',
    edad: '',
    raza: '',
    inf: ''
  };

  userData: UserReg = {
    nombres: null,
    apellidos: null,
    uID: null,
    email: null,
    numDoc: null,
    numCon: null,
    perfil: null,
    mascota: null
  };

  customAlertOptions = {
    header: 'Tipo de mascota',
    translucent: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private mascotasService: ServiciosMascotas,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.createmascota = this.fb.group({
      uID: [''],
      mascota: {
        idTipo: [''],
        tipomascota: ['']
      },
      nombreMasc: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required]],
      raza: ['', [Validators.required, Validators.minLength(2)]],
      inf: [''],
    });
  }

  // ============================
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Mascota agregada con exito',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('go to agregar');
            this.router.navigate(['/mascotas-user', this.uid]);
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }
  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Confirme registro mascota',
      buttons: [
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
            console.log('cancelado');
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            console.log('confirmado');
            this.agregarMascota();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async tipoErrAlert() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Debe seleccionar tipo de mascota',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
          }
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }
  // ============================

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('user id', this.uid);

    this.getTiposMascotas();
    this.getUserData();
  }

  getTiposMascotas() {
    this.mascotasService.getTipos().subscribe(data => {
      this.tipos = [];
      data.forEach((elemento: any) => {
        this.tipos.push({
          idTipo: elemento.payload.doc.id,
          ...elemento.payload.doc.data()
        });
      });
    });
  }

  handleChange(ev) {
    this.selectmascota = ev.target.value;
  }

  async agregarMascota() {
    this.mascotaData.uID = this.uid;
    this.mascotaData.mascotaTipe = this.selectmascota;
    if (this.mascotaData.mascotaTipe === undefined) {
      this.tipoErrAlert();
    } else {
      this.mascotaData.nombreMasc = this.createmascota.get('nombreMasc').value;
      this.mascotaData.edad = this.createmascota.get('edad').value;
      this.mascotaData.raza = this.createmascota.get('raza').value;
      this.mascotaData.inf = this.createmascota.get('inf').value;
      console.log(this.mascotaData);

      this.mascotasService.registrarMascotaCollection(this.mascotaData)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);

          const d = this.userData.mascota;

          if (d == null) {
            this.userData.mascota = [{ idM: docRef.id }];
          } else {
            d.push({
              idM: docRef.id
            });
            this.userData.mascota = d;
          }
          this.userService.actualizarUserCollection(this.userData, this.uid)
            .then(ee => {
              this.presentAlert();
            });
        });
    }
  }

  getUserData() {
    this.userService.getDatosUsuario(this.uid).subscribe(data => {
      this.userData = data;
    });
  }
}
