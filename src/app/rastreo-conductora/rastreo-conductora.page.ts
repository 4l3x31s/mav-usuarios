import { MapStyleService } from './../services/util/map-style.service';
import { NavParamService } from './../services/nav-param.service';
import { GeolocalizacionService } from 'src/app/services/db/geolocalizacion.service';
import { MdlCarrera } from 'src/app/modelo/mdlCarrera';
import { MdlGeoLocalizacion } from './../modelo/mdlGeoLocalizacion';

import { NavController, ModalController, Platform } from '@ionic/angular';

import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SesionService } from 'src/app/services/sesion.service';

declare var google;

@Component({
  selector: 'app-rastreo-conductora',
  templateUrl: './rastreo-conductora.page.html',
  styleUrls: ['./rastreo-conductora.page.scss'],
})
export class RastreoConductoraPage implements OnInit, OnDestroy {

  @ViewChild('mapCond') mapElement: ElementRef;
  map: any;
  markers = [];
  watchID: any;
  listaGeoPosicionamiento: MdlGeoLocalizacion[] = [];
  pais: string;
  ciudad: string;
  carrera: MdlCarrera;
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public geolocalizacionService: GeolocalizacionService,
    public paramController: NavParamService,
    public mapStyleService: MapStyleService
    ) {
  }
  ngOnInit() {
    this.initMap();
    this.carrera = this.paramController.get();
    console.log(this.carrera);
    this.geolocalizacionService.ubicarConductora(this.carrera.idConductora).subscribe( data => {
      this.deleteMarkers();
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
        fullscreenControl: false,
        mapTypeControlOptions: {
          mapTypeIds: ['styled_map']
        }
      });
      let geoResults = [];
      let geoResults1 = [];
      this.map.mapTypes.set('styled_map', this.mapStyleService.getStyledMap());
      this.map.setMapTypeId('styled_map');

    }, (error) => {
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
    }, error => {
    });
    /*let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
      let image = 'assets/image/blue-bike.png';
      this.addMarker(updatelocation,image);
      this.setMapOnAll(this.map);
    }, err => {
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
