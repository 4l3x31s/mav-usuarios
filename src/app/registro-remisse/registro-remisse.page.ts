import { DetalleCarreraPage } from './../comun/detalle-carrera/detalle-carrera.page';
import { Notificaciones } from './../modelo/notificaciones';
import { MdlConductora } from 'src/app/modelo/mldConductora';
import { ConductoraService } from 'src/app/services/db/conductora.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../services/db/cliente.service';
import { LoadingService } from '../services/util/loading.service';
import { AlertService } from '../services/util/alert.service';
import { NavController, ModalController, AlertController, AngularDelegate } from '@ionic/angular';
import { MdlCarrera } from '../modelo/mdlCarrera';
import { MdlCliente } from '../modelo/mdlCliente';
import { MapaPage } from '../comun/mapa/mapa.page';
import { SesionService } from '../services/sesion.service';
import { CarreraService } from '../services/db/carrera.service';
import * as moment from 'moment';
import { NavParamService } from '../services/nav-param.service';
import { MapParamService } from '../services/map-param.service';
import { Observable } from 'rxjs';
import { MdlParametrosCarrera } from '../modelo/mdlParametrosCarrera';
import { ParametrosCarreraService } from '../services/db/parametros-carrera.service';
import * as _ from 'lodash';
import { PushNotifService } from '../services/push-notif.service';
import { UbicacionService } from '../services/ubicacion.service';
import { MapStyleService } from 'src/app/services/util/map-style.service';

@Component({
  selector: 'app-registro-remisse',
  templateUrl: './registro-remisse.page.html',
  styleUrls: ['./registro-remisse.page.scss'],
})
export class RegistroRemissePage implements OnInit {
  frmCarrera: FormGroup;
  
  public lstParametrosCarrera: MdlParametrosCarrera [] = [];
  public lstFiltroParametrosCarrera: MdlParametrosCarrera [] = [];
  public parametroCarrera: MdlParametrosCarrera;
  public cliente: MdlCliente;
  public carrera: MdlCarrera = new MdlCarrera(null, null, null, null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 
    null, null, null);
  public fechaMin: string;
  lat: any;
  lng: any;
  latF: any;
  lngF: any;
  estado: number = 0;
  fecha:any;
  markers = [];
  pais: string;
  ciudad: string;
  distance: any;
  filtros = {};
  location: any;
  direccionIni: any = null;
  direccionFin: any = null;
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#EE4088'
      }
    });
  @ViewChild('mapre') mapElemnt: ElementRef;
  constructor(
    public fb: FormBuilder,
    public carreraService: CarreraService,
    public loadingServices: LoadingService,
    public alertService: AlertService,
    public navController: NavController,
    public modalController: ModalController,
    public sesionService: SesionService,
    public navParams: NavParamService,
    public alertController: AlertController,
    public mapParamService: MapParamService,
    public parametrosCarreraService: ParametrosCarreraService,
    public conductoraService: ConductoraService,
    public pushNotifService: PushNotifService,
    public ubicacionService: UbicacionService,
    public mapStyleService: MapStyleService
  ) { 
    this.pais = this.ubicacionService.getPais();//this.navParams.get().pais;
    this.ciudad = this.ubicacionService.getCiudad();//this.navParams.get().ciudad;
    this.distance = new google.maps.DistanceMatrixService();
    this.location = this.navParams.get().location;
    
  }
  get f(): any { return this.frmCarrera.controls; }
  ngOnInit() {
    this.estado=1;
    this.iniciarValidaciones();
    this.sesionService.crearSesionBase()
    .then(() => {
      this.sesionService.getSesion()
        .subscribe((cliente) => {
          if (cliente) {
            this.cliente = cliente;
            //calcular costo
            this.determinarDistanciaTiempo();
          } else {
            this.navController.navigateRoot('/login');
          }
        });
    });
    this.parametrosPorPais(this.pais);
    this.iniciarMapa();
    
    
  }
  trazarMapaDevuelto() {
    let respuesta = this.trazarMapa(this.directionsDisplay);
    respuesta.subscribe(data => {
      this.directionsDisplay.setDirections(data);
    })
    /*this.sesionService.crearSesionBase().then(() => {
    this.sesionService.getSesion().subscribe((cliente) => {
        if (cliente){
          this.cliente = cliente;
          this.determinarDistanciaTiempo();
        } else {
          this.navController.navigateRoot('/login');
        }
      });
    });*/
  }
  public iniciarMapa(){
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#EE4088'
      }
    });
    console.log(this.location);
    this.lat = this.location.lat;
    this.lng = this.location.lng;
    this.latF = this.location.lat;
    this.lngF = this.location.lng;
    const mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false,
      zoomControl: false,
      scaleControl: false,
      rotateControl: false,
      fullscreenControl: false,
      center: this.location,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      }
    };
    this.map = new google.maps.Map(this.mapElemnt.nativeElement, mapOptions);
    this.map.mapTypes.set('styled_map', this.mapStyleService.getStyledMap());
    this.map.setMapTypeId('styled_map');

    
    this.directionsDisplay.setMap(this.map);
    /*let marker = new google.maps.Marker({
      position: this.location,
      map: this.map,
      title: '',
      draggable: false,
      animation: google.maps.Animation.DROP,
      icon: 'assets/image/pin-check.png'
    });*/
  
    let marker = new google.maps.Marker({
      position: this.location,
      map: this.map,
      icon: 'assets/image/pin-check.png',
      title: 'prueb'
    });
    
    //this.addMarker(this.location,image);
    this.markers[0] = marker;
    var geocoder = new google.maps.Geocoder();
    let mylocation = new google.maps.LatLng(this.lat, this.lng);
    this.setMapOnAll(this.map);
    geocoder.geocode({'location': mylocation}, (results, status: any) => {
      if (status === 'OK') {
        this.processLocation(results, true);
      }
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
  async irMapaOrigen() {
    let ubicacion: any = { lat: this.lat, lng: this.lng};
    
    this.mapParamService.set(ubicacion);
    const modal = await this.modalController.create({
      component: MapaPage
    }).then( dato => {
      dato.present();
      dato.onDidDismiss().then(resultado => {
        this.lat = resultado.data.lat;
        this.lng = resultado.data.lng;
        var geocoder = new google.maps.Geocoder();
        let mylocation = new google.maps.LatLng(this.lat, this.lng);
        geocoder.geocode({'location': mylocation}, (results, status: any) => {
          if (status === 'OK') {
            this.processLocation(results, true);
          }
        });
        this.clearMarkers();
        this.markers[0] = null;
        let marker = new google.maps.Marker({
          position: mylocation,
          map: this.map,
          icon: 'assets/image/pin-check.png',
          title: 'prueb'
        });
        this.markers[0] = marker;
        this.setMapOnAll(this.map);
        var geocoder = new google.maps.Geocoder();
        if (this.estado !== 1) {
          this.determinarDistanciaTiempo();
          this.trazarMapaDevuelto();
        }
      });
    });
  }
  async irMapaDestino() {
    this.estado = 2;
    let ubicacion: any = { lat: this.latF, lng: this.lngF};
    this.mapParamService.set(ubicacion);
    const modal = await this.modalController.create({
        component: MapaPage
    }).then(dato => {
        dato.present();
        dato.onDidDismiss().then(resultado => {
          this.latF = resultado.data.lat;
          this.lngF = resultado.data.lng;
          var geocoder = new google.maps.Geocoder();
          let mylocation = new google.maps.LatLng(this.latF, this.lngF);
          geocoder.geocode({'location': mylocation}, (results, status: any) => {
            if (status === 'OK') {
              this.processLocation(results, false);
            }
          });
          this.clearMarkers();
          this.markers[1] = null;
          let marker = new google.maps.Marker({
            position: mylocation,
            map: this.map,
            icon: 'assets/image/pin-check.png',
            title: 'prueb'
          });
          this.markers[1] = marker;
          this.setMapOnAll(this.map);
          this.determinarDistanciaTiempo();
          this.trazarMapaDevuelto()
        });
    });
  }
  public iniciarValidaciones(){
    this.frmCarrera = this.fb.group({
      vDesde: ['', [
        Validators.required,
      ]],
      vHasta: ['', [
        Validators.required,
      ]],
    });
  }
  public trazarMapa(directionsDisplay: any): Observable<any>{
    const myLatlngIni = { lat: +this.lat, lng: +this.lng};
    const myLatlngFin = { lat: +this.latF, lng: +this.lngF};
    return Observable.create((observer) => {
      this.directionsService.route({
        origin: myLatlngIni,
        destination: myLatlngFin,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status: any) {
        observer.next(response);
        observer.complete();
      });
    });
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay, myLatlngIni, myLatlngFin): Observable<any> {
    return Observable.create((observer) => {
      directionsService.route({
        origin: myLatlngIni,
        destination: myLatlngFin,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === 'OK') {
          if(directionsDisplay!=null) {
            directionsDisplay.setDirections(response);
          }else{
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setDirections({routes: []});
          }
        } else {
          //window.alert('Directions request failed due to ' + status);
          console.log(status);
        }
        observer.next(response);
        observer.complete();
      });
    });
  }
  
  async confirmarFecha() {
    this.fecha = moment().format();
    console.log(this.fecha)
    let fechaCarrera =  moment(this.fecha).toObject();
    let fechaCarreraMoment = moment(fechaCarrera);
    let fechaActual = moment().format();
    let mensaje = null;
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Desea crear la carrera en:  <br>' +
                'Fecha:  <strong>' + fechaCarrera.date  + '/' + (fechaCarrera.months + 1) + '/' + fechaCarrera.years + '</strong> <br> ' +
                'Hora :  <strong>' + fechaCarrera.hours + ':' + fechaCarrera.minutes + ' ? </strong>',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log(this.fecha);
            this.grabar();
          }
        }
      ]
    });
    await alert.present();
  }
  public grabar(){
    this.loadingServices.present();
    //Notificaciones PUSH
    //var identificadorPrueba = Date.now();
    this.carrera.idUsuario = this.cliente.id;
    this.carrera.estado = 1;
    this.carrera.nombreCliente = this.cliente.nombre;
    this.carrera.pais = this.pais;
    this.carrera.ciudad = this.ciudad;
    this.carrera.direccionInicio = this.direccionIni;
    this.carrera.direccionDestino = this.direccionFin;
    this.carrera.latInicio = this.lat;
    this.carrera.longInicio = this.lng;
    this.carrera.latFin = this.latF;
    this.carrera.longFin = this.lngF;
    this.carrera.fechaInicio = this.fecha;

    let carrera:MdlCarrera = this.carrera;
    console.log('*************CARRERA REGISTRADA******************');
    console.log(this.carrera);
      this.carreraService.crearCarrera(this.carrera)
      .then(() => {
        console.log('*************CARRERA REGISTRADA 2******************');
        console.log(this.carrera);
        setTimeout(() => {
          this.carreraService.getCarrerasPorId(carrera.id).subscribe(data => {
            if(data[0].estado === 1) {
              this.alertService.present('Info','Espere un momento porfavor, estamos buscando la conductora más cercana.');
            }
          });
        }, 30000);
        setTimeout(() => {
          this.carreraService.getCarrerasPorId(carrera.id).subscribe(data => {
            if(data[0].estado === 1) {
              this.alertService.present('Info', 'Lo sentimos no hay conductoras disponibles.');
              this.carrera.estado = 1000;
              this.carreraService.eliminarCarrera(carrera.id);
              this.modalController.dismiss();
              this.navController.navigateRoot('/home');
            }
          });
        }, 120000);

        this.conductoraService.getConductoraPorPaisCiudad(this.pais.toUpperCase(), this.ciudad.toUpperCase())
          .subscribe( lstConductoras => {
            for(let item of lstConductoras) {
              if(item.ui) {
                let notificaciones = {
                  notification:{
                    title: 'Mujeres al Volante',
                    body: 'Hay una carrera disponible, deberias tomarla!!!!',
                    sound: 'default',
                    click_action: 'FCM_PLUGIN_ACTIVITY',
                    icon: 'fcm_push_icon'
                  },
                  data: {
                    landing_page: 'home',
                  },
                  to: item.ui,
                  priority: 'high',
                  restricted_package_name: ''
                };
                this.pushNotifService.postGlobal(notificaciones, '')
                .subscribe(response => {
                  this.loadingServices.dismiss();
                });
                this.pushNotifService.postGlobal(notificaciones, '')
                .subscribe(response => {
                  this.loadingServices.dismiss();
                });
              }
            }
          });
          this.loadingServices.dismiss();
          this.abrirModal();
        
        this.alertService.present('Información', 'Estamos buscando una conductora disponible.');
        this.carrera = this.carreraService.getCarreraSesion();
        
      })
      .catch( error => {
        this.loadingServices.dismiss();
        this.alertService.present('Error','Hubo un error al grabar los datos');
      })

      this.navController.navigateRoot('/calendario-carrera');
  }
  
  async abrirModal() {
    this.loadingServices.dismiss();
    let carreraSeleccionada:MdlCarrera = this.carrera;
    const modal = await this.modalController.create({
      component: DetalleCarreraPage,
      componentProps: {
        carrera: carreraSeleccionada
      }
    });
    return await modal.present();
  }

  processLocation(location, tipo: boolean) {
    if (location[1]) {
      for (var i = 0; i < location.length; i++) {
        for (let j = 0; j < location[i].types.length; j++) {
          if (location[i].types[j] === 'route') {
            if (tipo) {
              this.direccionIni = location[i].formatted_address;
            } else {
              this.direccionFin = location[i].formatted_address;
            }
          }
        }
      }
    }
  }

  public async determinarDistanciaTiempo() {
    let responseMatrix: google.maps.DistanceMatrixRequest;
    responseMatrix = {
        origins:
            [{
                lat: Number(this.lat),
                lng: Number(this.lng)
            }],
        destinations:
            [{
                lat: Number(this.latF),
                lng: Number(this.lngF)
            }],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: false,
        avoidHighways: false,
        avoidTolls: false
    };
    //this.parametrosPorPais(this.pais);
    let datos = this.getDistanceMatrix(responseMatrix);
    datos.subscribe(data => {
        const origins = data.originAddresses;
        for (let i = 0; i < origins.length; i++) {
            const results: any = data.rows[i].elements;
            if(results[0].status === 'ZERO_RESULTS') {

            }else{
            for (let j = 0; j < results.length; j++) {
                const element = results[j];
                const distance = element.distance.value;
                const time = element.duration.value;
                // calcular costos UBER: https://calculouber.netlify.com/
                let montoFinal: number = (Math.round((this.parametroCarrera.base + ((element.duration.value / 60) * this.parametroCarrera.tiempo) + ((element.distance.value / 1000) * this.parametroCarrera.distancia))* this.parametroCarrera.tarifaDinamica) + this.parametroCarrera.cuotaSolicitud);
                if (montoFinal < 10) {
                    this.carrera.costo = 10;
                } else {
                    this.carrera.costo = montoFinal;
                }
            }
          }
        }
    });
  }

  public parametrosPorPais(pais: string) {
    this.loadingServices.present();    
    this.parametrosCarreraService.getParametrosPorPais(pais).subscribe( data => {
      this.loadingServices.dismiss();
      this.lstParametrosCarrera = Object.assign(data);
      this.filtrar('ciudad',this.ciudad.toUpperCase());
    },  error => {
      this.loadingServices.dismiss();
    });
  }

  public filtrar(atributo: string, valor: any) {
    this.filtros[atributo] = val => val == valor;
    this.lstFiltroParametrosCarrera = _.filter(this.lstParametrosCarrera, _.conforms(this.filtros) );
    this.parametroCarrera = this.lstFiltroParametrosCarrera[0];    
  }

  getDistanceMatrix(req: google.maps.DistanceMatrixRequest): Observable<google.maps.DistanceMatrixResponse> {
    return Observable.create((observer) => {
        this.distance.getDistanceMatrix(req, (rsp, status) => {
            // status checking goes here
      
            observer.next(rsp);
            observer.complete();
        });
    });
  }
}