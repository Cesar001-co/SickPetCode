import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MascotaData, TipoMascota } from 'src/app/models/models';
import { ServiciosMascotas } from 'src/app/services/mascotas.service';

@Component({
  selector: 'app-mascotasform',
  templateUrl: './mascotasform.page.html',
  styleUrls: ['./mascotasform.page.scss'],
})
export class MascotasformPage implements OnInit {

  idM: any;
  uid: any;
  tipos: TipoMascota[] = [];
  selectmascota: TipoMascota;
  createmascota: FormGroup;
  mascotaData: MascotaData = {
    uID: '',
    tipomascota: '',
    nombreMasc: '',
    edad: '',
    raza: '',
    inf: ''
  };
  values: any;

  customAlertOptions = {
    header: 'Tipo de mascota',
    translucent: true,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private mascotasService: ServiciosMascotas,
    private router: Router,
    private fb: FormBuilder) {
    this.createmascota = this.fb.group({
      tipomascota: [''],
      nombreMasc: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required]],
      raza: ['', [Validators.required, Validators.minLength(2)]],
      inf: [''],
    });
  }

  ngOnInit() {
    this.idM = this.activatedRoute.snapshot.paramMap.get('idm');
    this.uid = this.activatedRoute.snapshot.paramMap.get('idu');
    console.log('macota id', this.idM);
    console.log('user id', this.uid);

    this.getTiposMascotas();
    this.getMascotaData();
  }

  // ============================
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Mascota modificada con exito',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('go to agregar');
            this.goBack();
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
      message: 'Confirme modificacion de mascota',
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
            this.modificarMascota();
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

  goBack() {
    this.router.navigate(['/mascotas-user', this.uid]);
  }

  getMascotaData() {
    this.mascotasService.getMascotaData(this.idM).subscribe(data => {
      this.values = data.payload.data().tipomascota;
      this.createmascota.setValue({
        tipomascota: this.values,
        nombreMasc: data.payload.data().nombreMasc,
        edad: data.payload.data().edad,
        raza: data.payload.data().raza,
        inf: data.payload.data().inf
      });
    });
  }

  modificarMascota() {
    this.mascotaData.uID = this.uid;
    this.mascotaData.tipomascota = ''+this.selectmascota;
    console.log(this.selectmascota);
    if (this.mascotaData.tipomascota === undefined) {
      this.tipoErrAlert();
    } else {
      this.mascotaData.nombreMasc = this.createmascota.get('nombreMasc').value;
      this.mascotaData.edad = this.createmascota.get('edad').value;
      this.mascotaData.raza = this.createmascota.get('raza').value;
      this.mascotaData.inf = this.createmascota.get('inf').value;

      console.log('modificado => ', this.mascotaData);
      this.mascotasService.actualizarMascotaCollection(this.mascotaData, this.idM)
        .then(es => {
          this.presentAlert();
        });
    }
  }
}
