import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-solicitar-contrato',
  templateUrl: './solicitar-contrato.page.html',
  styleUrls: ['./solicitar-contrato.page.scss'],
})
export class SolicitarContratoPage implements OnInit {

  constructor(
    public iab: InAppBrowser,

  ) { }

  ngOnInit() {
  }
  irWhatsApp(){
    this.iab.create('https://api.whatsapp.com/send?phone=591'+71525805+'&text=Hola', '_system', 'location=yes');
  }

}
