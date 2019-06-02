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
  listaGeoPosicionamiento: MdlGeoLocalizacion[] = [];
  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public geolocalizacionService: GeolocalizacionService) {}
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
        geocoder.geocode({'location': mylocation}, function(results, status){
          if (status === 'OK') {
            geoResults  = results[0];
            geoResults1 = geoResults['address_components'];
            for(var i=0; i < geoResults1.length; i++){
              if(geoResults1[i].types[0]=='locality'){
                this.ciudad=geoResults1[i].short_name;
              }
              if(geoResults1[i].types[0]=='country'){
                this.pais=geoResults1[i].long_name;
              }
            }
            console.log(this.ciudad);
            console.log(this.pais);
            geoResults = [];
            geoResults1 = [];
          }
        })

      }, (error) => {
        console.log("error current position")
        console.log(error);
      }, { enableHighAccuracy: true });

      //navigator.geolocation.clearWatch(watchID);
      /*this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
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
      }, err => {
        console.log(err);
      });*/

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
      /*let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.deleteMarkers();
        let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        let image = 'assets/image/blue-bike.png';
        this.addMarker(updatelocation,image);
        this.setMapOnAll(this.map);
      }, err => {
        console.log(err);
      });*/
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
}
