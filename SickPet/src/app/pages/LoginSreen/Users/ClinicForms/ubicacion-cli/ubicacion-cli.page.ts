import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
// eslint-disable-next-line no-var
declare var google: any;

@Component({
  selector: 'app-ubicacion-cli',
  templateUrl: './ubicacion-cli.page.html',
  styleUrls: ['./ubicacion-cli.page.scss'],
})
export class UbicacionCliPage implements OnInit {

  @Input() position = {
    lat: 2.445860,
    lng: -76.614580
  };

  label = {
    titulo: 'Ubicacion',
    subtitulo: 'Mi ubicacion Clinica'
  };

  map: any;
  marker: any;
  infowindow: any;
  positionSet: any;

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private modalController: ModalController, private geolocation: Geolocation) { }

  ionViewDidEnter() {
    this.showMap();
  }

  showMap() {
    const position = this.position;

    const latLng = new google.maps.LatLng(position.lat, position.lng);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DORP,
      draggable: true,
      icon: 'assets/icons/SickPetMarker.png'
    });
    this.clickHandleEvent();
    this.infowindow = new google.maps.InfoWindow();
    if (this.label.titulo.length) {
      this.addMarker(position);
      this.setInfowindow(this.marker, this.label.titulo, this.label.subtitulo);
    }
  }
  clickHandleEvent() {
    this.map.addListener('click', (event: any) => {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.addMarker(position);
    });
  }

  addMarker(position: any) {
    const latLng = new google.maps.LatLng(position.lat, position.lng);

    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.position = position;
  }

  setInfowindow(marker: any, titulo: string, subtitulo: string) {
    const contentString = '<div id="contentInsideMap">' +
                          '<div>' +
                          '</div>' +
                          '<p syle="font-size: 25px; margin-bottom: 5px;">'
                          + titulo + '</p>' +
                          '<div id="bodyContent">' +
                          '<p class="normal m-0">'
                          + subtitulo + '</p>' +
                          '</div>' +
                          '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

  async mylocantion() {
    console.log('mylocantion() click');

    this.geolocation.getCurrentPosition().then((res) => {
      console.log('mylocation() get');
      const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      };
      this.addMarker(position);
    });
  }

  aceptar() {
    console.log('click aceptar ->', this.position);
    this.modalController.dismiss({ pos: this.position});
  }

  ngOnInit() {
  }

}
