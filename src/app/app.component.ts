import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
//import { AppUtilService } from './_servicios/app-util.service';
import { StorageService } from './_servicios/storage.service';
//import { NotificationService } from './_servicios/notification.service';
import { LoginService } from './_servicios/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inicio',
      url: 'inicio',
      icon: 'barcode'
    },

  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private loginService : LoginService,
    private sService : StorageService,
    private storage : Storage,
    private router : Router,
    /*private appUtil: AppUtilService,*/
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar) {
    this.initializeApp();
  }

  cerrarSesion(){
    console.log("cerrar sesion");
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
    this.storage.clear();
    this.router.navigate(['/login'], {replaceUrl: true});
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storage.get('usuarios').then((val) => {
        console.log(val);
        if(!val){
          this.router.navigate(['/login'], {replaceUrl: true})
        }else{
          this.loginService.setToken(val['token']);
          this.loginService.setEmpresa(val['empresa']);
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('login/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  cerrarInicio(){
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
    this.router.navigate(['/sucursales'], {replaceUrl: true});
  }
}
