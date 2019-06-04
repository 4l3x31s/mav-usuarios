import { NavController, ModalController, Platform } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MdlGeoLocalizacion } from '../modelo/mdlGeoLocalizacion';
import { GeolocalizacionService } from '../services/db/geolocalizacion.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavParamService } from '../services/nav-param.service';
import { Observable } from 'rxjs';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('mapge') mapElement: ElementRef;
  map: any;
  markers = [];
  watchID: any;
  pais: string;
  ciudad: string;

  listaGeoPosicionamiento: MdlGeoLocalizacion[] = [];
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public geolocalizacionService: GeolocalizacionService,
    public navParam: NavParamService,
    ) {}
  ngOnInit() {
    this.initMap();
    this.geolocalizacionService.listarCambios().subscribe( data => {
      this.deleteMarkers();
      console.log(data);
      this.listaGeoPosicionamiento = Object.assign(data);
      for (let geoObj of this.listaGeoPosicionamiento) {
        let image = 'assets/image/pin-mav.png';
          let updatelocation = new google.maps.LatLng(geoObj.latitude, geoObj.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
      }
    });
  }

  initMap() {
      navigator.geolocation.getCurrentPosition((resp) => {
        let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 15,
          center: mylocation,
          mapTypeControl: false,
          streetViewControl: false,
          fullScreenControl: false,
          zoomControl: false,
          scaleControl: false,
          rotateControl: false,
          fullscreenControl: false
        });
        let geoResults = [];
        let geoResults1 = [];
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': mylocation}, (results, status) =>{
          if (status === 'OK') {
            console.log('entra a status ok');
            this.processLocation(results);
          }
        })
      }, (error) => {
        console.log("error current position")
        console.log(error);
      }, { enableHighAccuracy: true });
        this.watchID = navigator.geolocation.watchPosition((data) => {
        this.deleteMarkers();
        if(this.listaGeoPosicionamiento.length > 0) {
          for (let geoObj of this.listaGeoPosicionamiento) {
            let image = 'assets/image/pin-mav.png';
              let updatelocation = new google.maps.LatLng(geoObj.latitude, geoObj.longitude);
              this.addMarker(updatelocation,image);
              this.setMapOnAll(this.map);
          }
        }
        let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        let image = 'assets/image/car-pin.png';
        this.addMarker(updatelocation,image);
        this.setMapOnAll(this.map);
      }, error => {
        console.log(error);
      });
  }

  processLocation(location) {    
    if (location[1]) {
      for (var i = 0; i < location.length; i++) {
        if (location[i].types[0] === "locality") {
          this.ciudad = location[i].address_components[0].short_name;
          this.pais = location[i].address_components[2].long_name;  
          console.log(this.ciudad, this.pais);
        }
      }
    }   
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }
  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }
  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
  updateGeolocation(geoposicionamineto: MdlGeoLocalizacion) {
    this.geolocalizacionService.crearGeolocalizacion(geoposicionamineto);
  }
  ngOnDestroy(): void {
    navigator.geolocation.clearWatch(this.watchID);
  }

  public irMapCarrera(){
    this.navParam.set({
      pais: this.pais,
      ciudad: this.ciudad
    });
    this.navCtrl.navigateForward('/map-carrera');
  }
}
