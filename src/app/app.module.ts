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
  apiKey: "AIzaSyAgV1vvR-sagn9yWEmSxs8yPa7TADU-i68",
    authDomain: "mav-firebase.firebaseapp.com",
    databaseURL: "https://mav-firebase.firebaseio.com",
    projectId: "mav-firebase",
    storageBucket: "mav-firebase.appspot.com",
    messagingSenderId: "840758066173",
    appId: "1:840758066173:web:f9ac4a33d8ddfe8242f794",
    measurementId: "G-96T3Y91H9H"
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
