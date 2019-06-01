import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MdlCarrera } from 'src/app/modelo/mdlCarrera';
import { ModalController, NavController, ActionSheetController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/db/cliente.service';
import { AlertService } from 'src/app/services/util/alert.service';
import { MdlCliente } from 'src/app/modelo/mdlCliente';
import { LoadingService } from 'src/app/services/util/loading.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CarreraService } from 'src/app/services/db/carrera.service';

@Component({
  selector: 'app-detalle-carrera',
  templateUrl: './detalle-carrera.page.html',
  styleUrls: ['./detalle-carrera.page.scss'],
})
export class DetalleCarreraPage implements OnInit {

  @Input()
  carrera: MdlCarrera;
  
  cliente: MdlCliente;
  
  @ViewChild('map')
  mapElement: ElementRef;

  constructor(
    private modalCtrl:ModalController,
    public clienteService:ClienteService,
    public alertService: AlertService,
    public navController: NavController,
    public loadingService: LoadingService,
    public iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    public carreraService: CarreraService
  
  ) { }

  ngOnInit() {
    this.carreraService.getCarrerasPorId(this.carrera.id).subscribe(carrera=>{
      this.carrera = Object.assign(carrera[0]); 
    },error=>{
      
    });
    console.log("this.carrera: ", this.carrera);
    
    this.loadingService.present()
      .then(()=>{
        this.clienteService.getCliente(this.carrera.idUsuario)
          .subscribe(cliente=>{
            this.cliente = cliente;
            this.initAutocomplete();
            this.loadingService.dismiss();
          },error=>{
            console.error(error);
            this.loadingService.dismiss();
            this.alertService.present('Error', 'Error al el cliente en la carrera.');
            this.navController.navigateRoot('/login');
          })
      })
     
  }

  initAutocomplete() {
    const myLatlngIni = { lat: parseFloat(this.carrera.latInicio), lng: parseFloat(this.carrera.longInicio)};
    const myLatlngFin = { lat: parseFloat(this.carrera.latFin), lng: parseFloat(this.carrera.longFin)};
    const mapOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: true,
      fullScreenControl: false,
      center: myLatlngFin
    };
    var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let markers = [];
    markers.push(new google.maps.Marker
      ({
        position: myLatlngFin,
        map: map,
        icon: 'assets/image/pin-end.png' //label: 'B'
      }));
    markers.push(new google.maps.Marker
      ({
        position: myLatlngIni,
        map: map,
        icon: 'assets/image/pin-user.png' //label: 'A'
      }));
    
  }

  cerrar(){
    this.modalCtrl.dismiss();
  }

  irWhatsApp(){
    this.iab.create('https://api.whatsapp.com/send?phone=591'+this.cliente.cel+'&text=', '_system', 'location=yes');
  }

  async showOpcionesCarrera(){
    let opciones:any[]=[];
    opciones.push({
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        
      }
    });
    if(this.carrera.estado == 1){
      opciones.push({
        text: 'Editar Carrera',
        icon: 'create',
        handler: () => {
          console.log('Editar Carrera...');
          this.navController.navigateForward('/registro-carrera');
          this.modalCtrl.dismiss();
        }
      });

      
    }
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones Carrera',
      buttons: opciones
    });
    await actionSheet.present();
  }

}
