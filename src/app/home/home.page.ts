import { MapStyleService } from './../services/util/map-style.service';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MdlGeoLocalizacion } from '../modelo/mdlGeoLocalizacion';
import { GeolocalizacionService } from '../services/db/geolocalizacion.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavParamService } from '../services/nav-param.service';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/util/loading.service';
import { UbicacionService } from '../services/ubicacion.service';

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
  location: any;
  subscription: any;

  listaGeoPosicionamiento: MdlGeoLocalizacion[] = [];
  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public geolocalizacionService: GeolocalizacionService,
    public navParam: NavParamService,
    public loadingService: LoadingService,
    public ubicacionService: UbicacionService,
    public mapStyleService: MapStyleService,
    public platform: Platform,
    ) {}
  ngOnInit() {
    this.loadingService.present();
    this.initMap();
    this.geolocalizacionService.listarCambios().subscribe( data => {
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
        this.location = {lat: resp.coords.latitude, lng: resp.coords.longitude};

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
         //Associate the styled map with the MapTypeId and set it to display.
         this.map.mapTypes.set('styled_map', this.mapStyleService.getStyledMap());
         this.map.setMapTypeId('styled_map');
        let geoResults = [];
        let geoResults1 = [];
        this.pais = this.ubicacionService.getPais();
        this.ciudad = this.ubicacionService.getCiudad();
        console.log(this.ciudad);
        this.loadingService.dismiss();
      }, (error) => {
        this.loadingService.dismiss();
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
        let image = 'assets/image/pin-mav.png';
        // let image = 'assets/image/car-pin.png';
        this.addMarker(updatelocation,image);
        this.setMapOnAll(this.map);
        this.loadingService.dismiss();
      }, error => {
        this.loadingService.dismiss();
      });
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image,
      title: 'prueb'
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

  public irMapCarrera() {
    this.navParam.set({
      pais: this.pais.toUpperCase(),
      ciudad: this.ciudad.toUpperCase(),
      location: this.location
    });
    this.navCtrl.navigateForward('/registro-carrera');
  }
  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
        navigator['app'].exitApp();
    });
}

ionViewWillLeave(){
    this.subscription.unsubscribe();
}
}