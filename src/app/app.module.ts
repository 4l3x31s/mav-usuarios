import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaPageModule } from './comun/mapa/mapa.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DetalleCarreraPageModule } from './comun/detalle-carrera/detalle-carrera.module';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { CalificarCarreraPageModule } from './comun/calificar-carrera/calificar-carrera.module';
import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: 'AIzaSyCC22o8Imks6DbAf4DXrxgtW_wPE6XYLHs',
    authDomain: 'mav-db.firebaseapp.com',
    databaseURL: 'https://mav-db.firebaseio.com',
    projectId: 'mav-db',
    storageBucket: 'mav-db.appspot.com',
    messagingSenderId: '69193804419',
    appId: '1:69193804419:web:6c522a0e26f79eb5'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MapaPageModule,
    DetalleCarreraPageModule,
    AngularFireStorageModule,
    CalificarCarreraPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    AngularFireDatabase,
    Geolocation,
    InAppBrowser,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
