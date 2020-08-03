import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
var firebaseConfig = {
  apiKey: "AIzaSyDe3_rPCSzJNik5HWmpGiStnwCy1nJKK2k",
  authDomain: "grupozango.firebaseapp.com",
  databaseURL: "https://grupozango.firebaseio.com",
  projectId: "grupozango",
  storageBucket: "grupozango.appspot.com",
  messagingSenderId: "585784857681",
  appId: "1:585784857681:web:40d824eff15406c8f4d470",
  measurementId: "G-60Z64F4SME"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    File,
    FileOpener,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LottieSplashScreen
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
