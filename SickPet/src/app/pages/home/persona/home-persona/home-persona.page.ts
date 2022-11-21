import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MascotaData, Solicitud, UserReg, SolClinica, SolClinicafil, UserClinica } from 'src/app/models/models';
import { ServiciosMascotas } from 'src/app/services/mascotas.service';
import { ServiciosClinica } from 'src/app/services/serviciosCli.service';
import { ServiciosSolicitudes } from 'src/app/services/solicitudes.service';
import { UserService } from 'src/app/services/user.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BehaviorSubject } from 'rxjs';

declare let google;

@Component({
  selector: 'app-home-persona',
  templateUrl: './home-persona.page.html',
  styleUrls: ['./home-persona.page.scss'],
})
export class HomePersonaPage implements OnInit {

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;

  map: any;
  markerUs: any;
  markerCli: any;
  infowindow: any;
  positionSet: any;
  myUbicacion: userLocation;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();


  uid: any;
  mascotas: MascotaData[] = [];
  clinicabyServicios: SolClinica[] = [];
  clinicabyServiciosFilt: SolClinicafil[] = [];
  selectedCli: SolClinicafil;
  solicitudCli: SolClinicafil = {
    idC: '',
    nombreCli: '',
    numCelCli: '',
    numCelCliOp: '',
    calificacion: '',
    ubicacion: {
      lat: '',
      lng: ''
    },
    serviciosClinica: {
      precio: 0,
      service: ''
    }
  };

  lookSolicitud = true;       //
  searchSolicitud = false;    //solicitud 1 ruta busca
  generateSolicitud = false;  //Solicitud en curso...
  isModalOpen = false;        //lista de clinicas por servicio
  solicitudGenerada = false;  //solicutud 2 generada

  selectmascota: MascotaData;
  solicform: FormGroup;
  dataSolicitud: Solicitud = {
    idC: '',
    estadoSol: false,
    end: false,
    service: '',
    hora: null,
    infoSolicitud: '',
    mascota: {
      nombreMasc: '',
      edad: '',
      raza: '',
      info: '',
      tipomascota: ''
    },
    usuario: {
      nombre: '',
      numCel: ''
    },
    ubicacion: {
      lat: '',
      lng: ''
    },
  };
  verifySolocitud: Solicitud;

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

  services: any[] = [];
  selectedService: any;


  slidesOptions = {
    slidesPerView: 3.5,
    spaceBetween: 10,
    slidesOffsetBefore: 0
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private clinicaService: ServiciosClinica,
    private mascotasService: ServiciosMascotas,
    private fb: FormBuilder,
    private solicitudService: ServiciosSolicitudes,
    private geolocation: Geolocation) {
    this.solicform = this.fb.group({
      infoSolicitud: [''],
      service: ['', Validators.required],
      mascota: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.mylocantion();
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('user id', this.uid);
    this.getUserData();
    this.getServiciosClinica();
    this.getMascotas(this.uid);
    this.getsolicitud();
  }

  //---------------------------------[MAPS]------------------------------------
  ionViewDidEnter() {
    this.showMap();
  }

  async showMap() {

    const latLng = new google.maps.LatLng(this.myUbicacion.lat, this.myUbicacion.lng);
    const mapOptions = {
      center: latLng,
      zoom: 17,
      disableDefaultUI: true,
      clickableIcons: false
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    this.markerUs = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DORP,
      //draggable: true,
      icon: 'assets/icons/Your Location.png'
    });

    this.markerCli = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DORP,
      //draggable: true,
      icon: 'assets/icons/SickPetMarker.png'
    });
    this.infowindow = new google.maps.InfoWindow();
    this.addMarkerUs(this.myUbicacion);
    this.directionsDisplay.setMap(this.map);
  }

  addMarkerUs(position: any) {
    const latLng = new google.maps.LatLng(position.lat, position.lng);

    this.markerUs.setPosition(latLng);
    this.map.panTo(position);
    this.myUbicacion = position;
  }

  addMarkerCli(position: any) {
    const latLng = new google.maps.LatLng(position.lat, position.lng);
    this.markerCli.setPosition(latLng);
  }

  async mylocantion() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.myUbicacion = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
    }).catch((error) => {
      console.log('ERROR al obtener la localizacion', error);
    });
    this.addMarkerUs(this.myUbicacion);
  }

  removeMarkerCli() {
    this.markerCli.setMap(null);
    this.markerCli = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DORP,
      //draggable: true,
      icon: 'assets/icons/SickPetMarker.png'
    });
    this.directionsDisplay.setMap(null);
  }

  calculateAndDisplayRoute(ubicacion: any) {
    this.directionsDisplay.setMap(this.map);
    this.directionsService.route({
      origin: this.myUbicacion,
      destination: ubicacion,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  //--------------------------------------------------------------------------------

  handleChange(ev) {
    this.selectmascota = ev.target.value;
    this.solicform.get('service').setValue(this.selectmascota);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getUserData() {
    this.userService.getDatosUsuario(this.uid).subscribe(data => {
      this.userData = data;
      this.mascotnum();
    });
  }

  mascotnum() {
    try {
      const lg = this.userData.mascota.length;
      const lhg = '0';
      //console.log('mascota => ', this.userData.mascota.length);
      if (lg === Number(lhg)) {
        this.presentAlert();
      }
    } catch (error) {
      if (this.userData.mascota === null) {
        this.presentAlert();
      }
    }
  }

  getServiciosClinica() {
    this.clinicaService.getServices().subscribe(data => {
      this.services = [];
      data.forEach((element: any) => {
        this.services.push({
          ...element.payload.doc.data(),
        });
      });
    });
  }

  getClinicasServicio(service: any) {
    this.solicitudService.getClinicasByService().subscribe((actionArray) => {
      this.clinicabyServicios = actionArray.map((item) => ({
        idC: item.payload.doc.id,
        nombreCli: item.payload.doc.data().nombreCli,
        numCelCli: item.payload.doc.data().numCelCli,
        numCelCliOp: item.payload.doc.data().numCelCliOp,
        calificacion: item.payload.doc.data().calificacion,
        ubicacion: {
          lat: item.payload.doc.data().ubicacion.lat,
          lng: item.payload.doc.data().ubicacion.lng,
        },
        serviciosClinica: item.payload.doc.data().serviciosClinica
      }));
      this.getCliFilterByService(service);
    });
  }

  getCliFilterByService(service: any) {
    this.clinicabyServiciosFilt = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.clinicabyServicios.length; i++) {
      console.log(this.clinicabyServicios[i].serviciosClinica.map(x => x.service === service));
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let y = 0; y < this.clinicabyServicios[i].serviciosClinica.length; y++) {
        const a = this.clinicabyServicios[i].serviciosClinica[y].service;
        if (a === service) {
          this.clinicabyServiciosFilt.push({
            idC: this.clinicabyServicios[i].idC,
            nombreCli: this.clinicabyServicios[i].nombreCli,
            numCelCli: this.clinicabyServicios[i].numCelCli,
            numCelCliOp: this.clinicabyServicios[i].numCelCliOp,
            calificacion: this.clinicabyServicios[i].calificacion,
            ubicacion: {
              lat: this.clinicabyServicios[i].ubicacion.lat,
              lng: this.clinicabyServicios[i].ubicacion.lng,
            },
            serviciosClinica: {
              precio: this.clinicabyServicios[i].serviciosClinica[y].precio,
              service: this.clinicabyServicios[i].serviciosClinica[y].service,
            }
          });
        }
      }
    }
    console.log('Lista filtrada => ', this.clinicabyServiciosFilt);
  }

  getMascotas(id: any) {
    this.mascotasService.getUserMascotas(id).subscribe(data => {
      this.mascotas = [];
      data.forEach((element: any) => {
        this.mascotas.push({
          idM: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    });
  }

  getSelectedService(serv: any) {
    this.setDefaultColor();
    this.selectedService = serv;
    // console.log(this.selectedService);
    this.solicform.get('mascota').setValue(serv);

    this.setColor(serv, 'var(--ion-color-myColor)');
  }

  setColor(serv: any, color: any) {
    const intro = document.getElementById(serv);
    intro.style.cssText = '--background: ' + color + ';';
  }

  setDefaultColor() {
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let index = 0; index < this.services.length; index++) {
      this.setColor(this.services[index].service, '#D6B0F2');
    }
  }

  // ==================
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Para poder generar una solicitud debes agregar a tu amigo peludo.',
      buttons: [
        {
          text: '+ Agregar',
          role: 'confirm',
          handler: () => {
            console.log('go to agregar');
            this.goToRegisterMasc();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async selectErrAlert(err: any) {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Debe seleccionar ' + err,
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

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'Desea generar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            this.generarSolicitud();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async cancelSolAlert() {
    const alert = await this.alertController.create({
      header: 'Solicitud',
      message: 'Desea Cancelar la solicitud?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'destructive',
          handler: () => {
          },
        },
        {
          text: 'CONFIRMAR',
          role: 'confirm',
          handler: () => {
            this.cancelSolicitud();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }

  async solAlert() {
    const alert = await this.alertController.create({
      header: 'Solicitud generada',
      message: 'Esperando a que la clinica acepte la solicitud. Estimado 5 minutos',
      buttons: [
        {
          text: 'Cancel',
          role: 'destructive',
          handler: () => {
            this.solicitudService.deleteSolicitud(this.uid);
            this.goToInicio();
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false
    });

    await alert.present();
  }
  // ==================

  countDown(duration: any) {
    clearInterval(this.interval);
    this.timer = duration * 60;
    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds;
    this.time.next(text);
    console.log(text);

    --this.timer;

    if (this.timer < 0) {
      this.stopTimer();
      this.alertController.dismiss();
      this.solicitudService.deleteSolicitud(this.uid);
      this.goToInicio();
    }
  }

  goToRegisterMasc() {
    this.router.navigate(['/mascotas-user', this.uid]);
  }

  goToHomeUser() {
    this.router.navigate(['/home-persona', this.uid]);
  }

  goToInicio() {
    this.lookSolicitud = true;
    this.solicform.get('service').setValue('');
    this.solicform.get('mascota').setValue('');
    this.removeMarkerCli();
    this.stopTimer();
  }

  cancelSolicitud() {
    this.lookSolicitud = true;
    this.searchSolicitud = false;
    this.solicitudGenerada = false;
    this.solicform.get('service').setValue('');
    this.solicform.get('mascota').setValue('');
    this.removeMarkerCli();
    this.solicitudService.deleteSolicitud(this.uid);
  }

  goTolocalizacion(cli: any) {
    this.setOpen(false);
    this.selectedCli = cli;
    this.lookSolicitud = false;
    this.searchSolicitud = true;
    this.addMarkerCli(this.selectedCli.ubicacion);
    this.calculateAndDisplayRoute(this.selectedCli.ubicacion);
  }

  generarSolicitud() {
    this.dataSolicitud.estadoSol = false;
    this.dataSolicitud.service = this.selectedService;
    this.dataSolicitud.hora = new Date();
    // data mascta
    this.dataSolicitud.infoSolicitud = this.solicform.get('infoSolicitud').value;
    this.dataSolicitud.mascota.nombreMasc = this.selectmascota.nombreMasc;
    this.dataSolicitud.mascota.edad = this.selectmascota.edad;
    this.dataSolicitud.mascota.raza = this.selectmascota.raza;
    this.dataSolicitud.mascota.tipomascota = this.selectmascota.tipomascota;
    // data usuario
    this.dataSolicitud.usuario.nombre = this.userData.nombres + ' ' + this.userData.apellidos;
    this.dataSolicitud.usuario.numCel = this.userData.numCon;
    // data clinica
    this.dataSolicitud.idC = this.selectedCli.idC;
    this.dataSolicitud.ubicacion.lat = this.selectedCli.ubicacion.lat;
    this.dataSolicitud.ubicacion.lng = this.selectedCli.ubicacion.lng;
    console.log(this.dataSolicitud);
    this.solicitudService.generarSolicitudCollection(this.uid, this.dataSolicitud);
    this.getsolicitud();
    this.solAlert();
    this.countDown(5);
  }

  getsolicitud() {
    try {
      this.solicitudService.getSolicitudbyUser(this.uid).subscribe((data) => {
        this.verifySolocitud = data;
        console.log(this.verifySolocitud.estadoSol);
        if (this.verifySolocitud.estadoSol === true) {
          this.alertController.dismiss();
          this.stopTimer();
          this.gotoSolicitud();
        }
        if (this.verifySolocitud.end === true){
          console.log();
        }
      });
    } catch (error) { }
  }

  getClinica(idC: any) {
    this.solicitudService.getClinica(idC).subscribe((data) => {
      this.solicitudCli = data;
    });
  }

  gotoSolicitud() {
    this.lookSolicitud = false;
    this.searchSolicitud = false;
    this.solicitudGenerada = true;

    //this.getUserSolicitud();
    this.getClinica(this.verifySolocitud.idC);
    this.addMarkerCli(this.verifySolocitud.ubicacion);
    this.calculateAndDisplayRoute(this.verifySolocitud.ubicacion);
  }

  buscarSolicitud() {
    this.isModalOpen = true;
    this.getClinicasServicio(this.selectedService);
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface userLocation {
  lat: number;
  lng: number;
}
