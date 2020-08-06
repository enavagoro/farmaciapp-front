import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './_servicios/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  subscription: Subscription;
  public appPages = []/*[
    {
      title: 'Inicio',
      url: 'inicio',
      icon: 'barcode'
    },{
      title: 'Administrador',
      url: 'admin',
      icon: 'cog'
    }
  ]*/;


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private usuarioService : UsuarioService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.subscription = this.usuarioService.getMenu().subscribe(data => {
      if (data) {
        this.appPages.push(data.menu);
      } else {
        this.appPages = [];
      }
    });
  }
  public addPage(page){
    this.appPages.push(page);
  }

  ngOnInit() {
    const path = window.location.pathname.split('inicio/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  ngOnDestroy() {
        // matar suscripcion pa no dejar weas ocupando memoria
        this.subscription.unsubscribe();
  }
}
