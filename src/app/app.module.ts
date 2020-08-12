import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

//services
import { ValidationService } from './_servicios/validation.service';
import { AuthService } from './_servicios/auth.service';
import { LoginService } from './_servicios/login.service';
import { EmpresaService } from './_servicios/empresa.service';
import { UsuarioService } from './_servicios/usuario.service';
//import { AppUtilService } from './_servicios/app-util.service';
import { StorageService } from './_servicios/storage.service';
import { SucursalService } from './_servicios/sucursales.service';
import { StockService } from './_servicios/stock.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //servicios
    ValidationService,
    AuthService,
    LoginService,
    EmpresaService,
    UsuarioService,
    StorageService,
    SucursalService,
    StockService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
