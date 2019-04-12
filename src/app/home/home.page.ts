import { AlertService } from './../services/util/alert.service';
import { NavParamService } from './../services/nav-param.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavController, ModalController } from '@ionic/angular';
import { MdlCliente } from '../modelo/mdlCliente';
import { SesionService } from '../services/sesion.service';
import { ToastService } from '../services/util/toast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  cliente: MdlCliente;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitud: string;
  longitud: string;
  paginaRetorno: string;
  constructor(
    public sesionService: SesionService,
    public navParam: NavParamService,
    public navCtrl: NavController,
    public toastCtrl: ToastService,
    public modalController: ModalController,
    public alertController: AlertService,
    public geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.sesionService.crearSesionBase()
      .then(() => {
        this.sesionService.getSesion()
          .then((cliente) => {
            if (cliente) {
              this.cliente = cliente;
            } else {
              this.navCtrl.navigateRoot('/login');
            }
          });
      });
      this.posicionamiento();
  }
  posicionamiento() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      const myLatlng = { lat: resp.coords.latitude, lng: resp.coords.longitude};
      this.cargarMapa(myLatlng);
     }).catch((error) => {
       console.log('Error getting location', error);
       const myLatlng = { lat: -16.4978888, lng: -68.1314424};
       this.cargarMapa(myLatlng);
     });
  }
  cargarMapa(myLatlng) {
    // const myLatlng = { lat: -16.4978888, lng: -68.1314424};
    const mapOptions = {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: true,
      fullScreenControl: false,
      center: myLatlng
    };
    this.latitud = myLatlng.lat.toString();
    this.longitud = myLatlng.lng.toString();
    var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let input = document.getElementById('pac-input');
    let searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', () =>{
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    let marker = new google.maps.Marker
    ({
      position: myLatlng,
      map: map,
      draggable: true,
      title: 'Mueveme'
    });
    marker.addListener('dragend', () => {
      console.log(JSON.stringify(marker.getPosition()));
      const objStr: string = JSON.stringify(marker.getPosition());
      const obj = JSON.parse(objStr);
      // window.alert(JSON.stringify(marker.getPosition()));
      this.latitud = obj.lat;
      this.longitud = obj.lng;
    });
    // {"lat":-16.498217987944532,"lng":-68.13232216455685}
    searchBox.addListener('places_changed', () =>{
      //marker.setMap(null);
      let places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("El lugar buscado no existe");
          return;
        }
        markers.push(new google.maps.Marker({
          map: map,
          draggable: true,
          title: 'Mueveme',
          position: place.geometry.location
        }));
        markers[0].addListener('dragend', () => {
          console.log(JSON.stringify(markers[0].getPosition()));
          const objStr: string = JSON.stringify(markers[0].getPosition());
          const obj = JSON.parse(objStr);
          this.latitud = obj.lat;
          this.longitud = obj.lng;
        });
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}
