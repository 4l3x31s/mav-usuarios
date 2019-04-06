import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast;
  constructor(public toastController: ToastController) { }

  async presentToast(mensaje: string) {
    this.toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    }).then( (a) => {
      a.present();
    });

  }


}
