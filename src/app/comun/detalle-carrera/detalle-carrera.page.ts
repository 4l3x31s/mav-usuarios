import { CarrerasAceptadasPage } from './../../carreras-aceptadas/carreras-aceptadas.page';
import { MdlCarrera } from './../../modelo/mdlCarrera';
import { AngularFireStorage } from '@angular/fire/storage';
/// <reference types='@types/googlemaps' />
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ModalController, NavController, ActionSheetController, AlertController  } from '@ionic/angular';
import { ClienteService } from 'src/app/services/db/cliente.service';
import { AlertService } from 'src/app/services/util/alert.service';
import { MdlCliente } from 'src/app/modelo/mdlCliente';
import { LoadingService } from 'src/app/services/util/loading.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CarreraService } from 'src/app/services/db/carrera.service';
import { ConductoraService } from 'src/app/services/db/conductora.service';
import { MdlConductora } from 'src/app/modelo/mldConductora';
import { CalificarCarreraPage } from '../calificar-carrera/calificar-carrera.page';
import { FormGroup } from '@angular/forms';
import { NavParamService } from 'src/app/services/nav-param.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { MdlVehiculo } from 'src/app/modelo/mdlVehiculo';
import { VehiculoService } from 'src/app/services/db/vehiculo.service';
import { MapStyleService } from 'src/app/services/util/map-style.service';
import { GeolocalizacionService } from 'src/app/services/db/geolocalizacion.service';
import * as moment from 'moment';



@Component({
  selector: 'app-detalle-carrera',
  templateUrl: './detalle-carrera.page.html',
  styleUrls: ['./detalle-carrera.page.scss'],
})
export class DetalleCarreraPage implements OnInit, OnDestroy {
  

  @Input()
  public carrera: MdlCarrera;
  public mostrarBoton: boolean = false;
  public mostrarCalificacion: boolean = false;

  form: FormGroup;
  distance: any;
  tiempoLlegada: any;

  cliente: MdlCliente;
  conductora: MdlConductora;
  public vehiculo: MdlVehiculo;

  codigoColorCliente: string;
  colores: any[] = [
    {
      codigo: 'red', descripcion: 'Rojo'
    },
    {
      codigo: 'blue', descripcion: 'Azul'
    },
    {
      codigo: 'green', descripcion: 'Verde'
    },
    {
      codigo: 'black', descripcion: 'Negro'
    },
    {
      codigo: 'darkcyan', descripcion: 'Verde Petroleo'
    },
    {
      codigo: 'darkgreen', descripcion: 'Verde Oscuro'
    },
  ];

  @ViewChild('map')
  mapElement: ElementRef;
  latInicio: any;
  lngInicio: any;
  latFin: any;
  lngFin: any;
  urlImagenFirebase: string;
  detectaCambiosVar:Subscription;
  constructor(
    private modalCtrl:ModalController,
    public clienteService:ClienteService,
    public alertService: AlertService,
    public navController: NavController,
    public loadingService: LoadingService,
    public iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    public carreraService: CarreraService,
    public conductoraService: ConductoraService,
    public navParam: NavParamService,
    public ubicacionService: UbicacionService,
    public vehiculoService: VehiculoService,
    public mapStyleService: MapStyleService,
    private storage: AngularFireStorage,
    private geoLocalizacionService: GeolocalizacionService,
    private alertController: AlertController

  ) {

  }

  ngOnInit() {
    // this.mostrarBoton = false;
    // https://firebasestorage.googleapis.com/v0/b/mav-db.appspot.com/o/
    // mav%2Fconductora%2F1559758039889-foto?alt=media&token=95be6f62-ec1b-4d5a-8c3a-6008be9abb9a
    
    this.carreraService.getCarrerasPorId(this.carrera.id).subscribe(carrera=>{
      this.carrera = Object.assign(carrera[0]);
      console.log(this.carrera);
      // if(this.carrera.enCamino){
      //   this.mostrarBoton=true;
      // }
      // this.mostrarCalificacion=true;
      // if(!this.carrera.enCamino){
      //   this.mostrarCalificacion=true;
      // }
      this.detectaCambiosVar = this.detectaCambios(this.carrera)
      .subscribe((carrera: MdlCarrera) => {
          if(carrera.enCamino) {
            if(carrera.enCamino === 1) {
              this.alertService.present('Alerta', 'Tu conductora está en camino, llega en unos minutos.');
            }else if(carrera.enCamino === 2) {
              this.alertService.present('Alerta', 'Tu conductora llegó y te está esperando.');
            }
            
          }
        });

      this.conductoraService.getConductora(this.carrera.idConductora).subscribe(conductora=>{
        this.conductora = conductora;
        let valor = 'mav/conductora/' + conductora.id + '-foto';

        this.storage.ref(valor).getDownloadURL()
          .subscribe(ruta => {
            console.log('pagina....');
            console.log(ruta);
            this.urlImagenFirebase = ruta;

          }, error => {
        
          });

        this.vehiculoService.getVehiculoPorConductora(this.carrera.idConductora)
        .subscribe(vehiculo => {
          console.log(vehiculo[0]);
          this.vehiculo = Object.assign(vehiculo[0]);
        });
        if(this.carrera.estado === 2 && this.carrera.idContrato === undefined) {
          this.geoLocalizacionService.ubicarConductora(this.carrera.idConductora)
            .subscribe(data => {
              console.log('ubicacion')
              console.log(data);
              let ubicacion: any = data
              if(!this.carrera.enCamino){
                console.log("ingresa aca xxxxxxx")
                this.determinarDistanciaTiempo(ubicacion[0].latitude, ubicacion[0].longitude);
              }else if(this.carrera.enCamino) {
                if(this.carrera.enCamino === 0) {
                  console.log("ingresa aca yyyyyyyyyyy")
                  this.determinarDistanciaTiempo(ubicacion[0].latitude, ubicacion[0].longitude);
                }
              }
            })
        }
        
      });
      this.cargarDatos();
    }, error=>{
    });
    
   
  }
  detectaCambios(alertController): Observable<any> {
    return Observable.create((observer) => {
          observer.next(this.carrera);
          observer.complete();
    })
  }
  ngOnDestroy(): void {
    this.detectaCambiosVar.unsubscribe();
  }

  public async determinarDistanciaTiempo(lat: number, lng: number) {
    let responseMatrix: google.maps.DistanceMatrixRequest;

    responseMatrix = {
        origins:
            [{
                lat: Number(lat),
                lng: Number(lng)
            }],
        destinations:
            [{
                lat: Number(this.carrera.latInicio),
                lng: Number(this.carrera.longInicio)
            }],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: false,
        avoidHighways: false,
        avoidTolls: false
    };
    this.distance = new google.maps.DistanceMatrixService();
    let datos = this.getDistanceMatrix(responseMatrix);
    datos.subscribe(data => {
        const origins = data.originAddresses;
        for (let i = 0; i < origins.length; i++) {
            const results = data.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
                const element = results[j];
                const distance = element.distance.value;
                const time = element.duration.value; // dividir entre 60
                this.tiempoLlegada = 'Llego en ' + Math.round((time/60)) + ' Minutos';
                // calcular costos UBER: https://calculouber.netlify.com/
            }
        }
    });
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

  //ubicarConductora

  initAutocomplete() {
    this.latInicio = typeof(this.carrera.latInicio)==='string'?parseFloat(this.carrera.latInicio):this.carrera.latInicio;
    this.lngInicio = typeof(this.carrera.longInicio)==='string'?parseFloat(this.carrera.longInicio):this.carrera.longInicio;
    this.latFin = typeof(this.carrera.latFin)==='string'?parseFloat(this.carrera.latFin):this.carrera.latFin;
    this.lngFin = typeof(this.carrera.longFin)==='string'?parseFloat(this.carrera.longFin):this.carrera.longFin;
    
    const myLatlngIni = { lat: +this.latInicio, lng: +this.lngInicio};
    const myLatlngFin = { lat: +this.latFin, lng: +this.lngFin};
    const mapOptions = {
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      fullScreenControl: false,
      zoomControl: false,
      scaleControl: false,
      rotateControl: false,
      fullscreenControl: false,
      center: myLatlngFin,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      }
    };
     //Associate the styled map with the MapTypeId and set it to display.
     
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#EE4088'
      }
    });
    var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    map.mapTypes.set('styled_map', this.mapStyleService.getStyledMap());
    map.setMapTypeId('styled_map');
    directionsDisplay.setMap(map);
    let respuesta = this.calculateAndDisplayRoute(directionsService, directionsDisplay, myLatlngIni, myLatlngFin);
    respuesta.subscribe(data => {
    });
    let markers = [];
    markers.push(new google.maps.Marker
      ({
        position: myLatlngFin,
        map: map,
        icon: 'assets/image/pin-flag.png' //label: 'B'
      }));
    markers.push(new google.maps.Marker
      ({
        position: myLatlngIni,
        map: map,
        icon: 'assets/image/pin-check.png' //label: 'A'
      }));
    
  }

  public cargarDatos(){
    this.loadingService.present().then(()=>{
      this.clienteService.getCliente(this.carrera.idUsuario).subscribe(cliente=>{
        
        this.cliente = cliente;
        this.codigoColorCliente = this.colores[2].codigo;
        this.initAutocomplete();
        this.loadingService.dismiss();
        }, error=>{
        console.error(error);
        this.loadingService.dismiss();
        this.alertService.present('Error', 'Error al el cliente en la carrera.');
        this.navController.navigateRoot('/login');
      })
    }); 
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  irWhatsApp(){
    this.iab.create('https://api.whatsapp.com/send?phone='+this.conductora.celular+'&text=', '_system', 'location=yes');
  }

  async showOpcionesCarrera(){
    let opciones:any[]=[];
    if(this.carrera.estado === 1){
      opciones.push({
        text: 'Editar Carrera',
        icon: 'create',
        handler: () => {
          this.modalCtrl.dismiss();
          this.navParam.set({
            pais: this.ubicacionService.getPais(),
            ciudad: this.ubicacionService.getCiudad(),
            location: {lat: this.carrera.latInicio, lng: this.carrera.longInicio}
          });
          this.navController.navigateForward('/registro-carrera');
          
        }
      });
    }
    if(this.carrera.enCamino > 2 && this.carrera.estado === 3 && !this.carrera.califCliente){
      opciones.push({
        text: 'Califica la carrera',
        icon: 'star',
        handler: () =>{
          this.calificarCarrera();
        }
      });
    }
    if(this.carrera.enCamino <= 2 && this.carrera.estado < 3){
      //rastreo-conductora
      opciones.push({
        text: 'Seguimiento Conductora',
        icon: 'navigate-circle-outline',
        handler: async() => {
          this.navParam.set(this.carrera);
          this.modalCtrl.dismiss();
          this.navController.navigateRoot('/rastreo-conductora');
        }
      });
      if (moment(this.carrera.fechaInicio) <  moment().add(3, 'minutes') && this.carrera.estado !== 4) {
        opciones.push({
          text: 'Cancelar Carrera',
          icon: 'close-circle-outline',
          handler: async() => {
            const alert = await this.alertController.create({
              header: 'Alerta!',
              message: 'Confirma que quiere cancelar la carrera?',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                  }
                }, {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Confirm Okay');
                    this.carreraService.eliminarCarreraCliente(this.carrera);
                    this.modalCtrl.dismiss();
                    this.navController.navigateRoot('/home');
                  }
                }
              ]
            });
        
            await alert.present();
            
          }
        });
      }
      if (moment(this.carrera.fechaInicio) >=  moment().add(3, 'minutes') && this.carrera.estado !== 4) {
        opciones.push({
          text: 'Cancelar Carrera',
          icon: 'close-circle-outline',
          handler: async() => {
            const alert = await this.alertController.create({
              header: 'Alerta!',
              message: 'Confirma que quiere cancelar la carrera?, tome en cuenta que se le cobrará 3Bs. como penalidad.',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                  }
                }, {
                  text: 'Aceptar',
                  handler: () => {
                    console.log('Confirm Okay');
                    this.carrera.costo = 3;
                    this.carrera.obsCarrera = 'Se canceló la carrea después de 3 minutos, se generó una penalidad.';
                    this.carreraService.eliminarCarreraCliente(this.carrera);
                    this.modalCtrl.dismiss();
                    this.navController.navigateRoot('/home');
                  }
                }
              ]
            });
        
            await alert.present();
            
          }
        });
      }
    //}
    }
    if(this.carrera.estado === 2){

      opciones.push({
        text: 'Compartir carrera',
        icon: 'share',
        handler: () => {
        let respuesta = 'http://www.google.com/maps/dir/'
        + this.latFin
        + ','
        + this.lngFin
        + '/'
        + this.carrera.latInicio
        + ','
        + this.carrera.longInicio
        + '/@'
        + this.latFin
        + ','
        + this.lngFin
        + ',12z/data=!4m2!4m1!3e0';
        this.iab.create('https://api.whatsapp.com/send?&text=Hola:%0AEstoy tomando un movil con la siguiente ruta:%0A'
              + respuesta, '_system', 'location=yes')
        }
      })

      opciones.push({
        text: 'Realizar seguimiento',
        icon: 'map',
        handler: () =>{
          let resp = 'http://www.google.com/maps/dir/'
          + this.latFin
          + ','
          + this.lngFin
          + '/'
          + this.carrera.latInicio
          + ','
          + this.carrera.longInicio
          + '/@'
          + this.latFin
          + ','
          + this.lngFin
          + ',12z/data=!4m2!4m1!3e0';
          this.iab.create(resp, '_system', 'location=yes')
        }
      });
    }
    
    opciones.push({
      text: 'Regresar',
      icon: 'close',
      role: 'cancel'
    });
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones Carrera',
      buttons: opciones
    });
    await actionSheet.present();
  }
  calculateAndDisplayRoute(directionsService, directionsDisplay, myLatlngIni, myLatlngFin): Observable<any> {
    return Observable.create((observer) => {
      directionsService.route({
        origin: myLatlngIni,
        destination: myLatlngFin,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
        observer.next(response);
        observer.complete();
      });
    });
  }
  async calificarCarrera(){
    const modal = await this.modalCtrl.create({
      component: CalificarCarreraPage,
      componentProps: {
        carrera: this.carrera
      }
    });
    modal.onDidDismiss().then(() => {
      this.cargarDatos();
    });
    return await modal.present();
  }
  cambiarColor(){
    this.clienteService.setColorCliente(this.cliente.id, this.codigoColorCliente);
  }
}
