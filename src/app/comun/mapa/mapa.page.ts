import { AlertService } from './../../services/util/alert.service';
import { ToastService } from './../../services/util/toast.service';
import { NavController, ModalController } from '@ionic/angular';
import { NavParamService } from './../../services/nav-param.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitud: string;
  longitud: string;
  paginaRetorno: string;
  searchBox: any;

  constructor(
    public navParam: NavParamService,
    public navCtrl: NavController,
    public toastCtrl: ToastService,
    public modalController: ModalController,
    public alertController: AlertService
    ) { }

  ngOnInit() {
    if (this.navParam.get()){
      this.paginaRetorno = this.navParam.get().page;
    } else {
      console.log('no hay pagina retorno');
    }
    this.initAutocomplete();
  }
  initAutocomplete() {
    const myLatlng = { lat: -16.4978888, lng: -68.1314424};
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
    this.searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', () =>{
      this.searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    markers.push(new google.maps.Marker
      ({
        position: myLatlng,
        map: map,
        draggable: true,
        title: 'Mueveme'
      }));
    markers[0].addListener('dragend', () => {
      console.log(JSON.stringify(markers[0].getPosition()));
      const objStr: string = JSON.stringify(markers[0].getPosition());
      const obj = JSON.parse(objStr);
      // window.alert(JSON.stringify(marker.getPosition()));
      this.latitud = obj.lat;
      this.longitud = obj.lng;
    });
    // {"lat":-16.498217987944532,"lng":-68.13232216455685}
    let respuesta = this.buscarTexto(map, markers, this.alertController);
    respuesta.subscribe( markers2 => {
      console.log("ingreso")
      let respuesta = this.markerEvent(markers2);
          respuesta.subscribe(obj => {
            this.latitud = obj.lat;
            this.longitud = obj.lng;
            console.log(this.latitud);
          })
    })
  }

  buscarTexto(map,markers, alertController): Observable<any> {
    return Observable.create((observer) => {
      this.searchBox.addListener('places_changed', () =>{
        let places = this.searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        let contador = 0;
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("El lugar buscado no existe");
            return;
          }
          if (contador < 1) {
            markers.push(new google.maps.Marker({
              map: map,
              draggable: true,
              title: 'Mueveme',
              position: place.geometry.location
            }));
            console.log(markers.length);
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          }
          contador++;
          
        });
        console.log(markers.length);
        if(contador === 1) {
          map.fitBounds(bounds);
          observer.next(markers);
          observer.complete();
        } else {
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          alertController.present('Alerta', 'debes escojer una opcion de la lista');
          return;
        }
      });
  });
  }
  markerEvent(markers): Observable<any> {
    return Observable.create((observer) => {
      console.log(JSON.stringify(markers[0].getPosition()));
      const objStr: string = JSON.stringify(markers[0].getPosition());
      const obj = JSON.parse(objStr);
        markers[0].addListener('dragend', () => {
        console.log(JSON.stringify(markers[0].getPosition()));
        const objStr: string = JSON.stringify(markers[0].getPosition());
        const obj = JSON.parse(objStr);
        observer.next(obj);
        observer.complete();
      });
      observer.next(obj);
      observer.complete();
  });
  }
  guardarLatLong() {
    if(this.latitud && this.longitud){
      this.toastCtrl.presentToast('Los datos fueron guardados exitosamente');
      this.modalController.dismiss({
        lat: this.latitud,
        lng: this.longitud
    });
    } else {
      this.alertController.present('Alerta', 'Debes seleccionar un punto antes de terminar.');
    }
  }
}
