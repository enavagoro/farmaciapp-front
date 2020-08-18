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

//
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//services
import { CarritoService } from './_servicios/carrito.service';
import { ValidationService } from './_servicios/validation.service';
import { AuthService } from './_servicios/auth.service';
import { LoginService } from './_servicios/login.service';
import { EmpresaService } from './_servicios/empresa.service';
import { UsuarioService } from './_servicios/usuario.service';
//import { AppUtilService } from './_servicios/app-util.service';
import { StorageService } from './_servicios/storage.service';
import { SucursalService } from './_servicios/sucursales.service';
import { StockService } from './_servicios/stock.service';
import { VentaService } from './_servicios/venta.service';
import { ClienteService } from './_servicios/cliente.service';

//pages modales
import { DetallePage } from './carrito/detalle/detalle.page'
@NgModule({
  declarations: [AppComponent,DetallePage],
  entryComponents: [DetallePage],
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
    CarritoService,
    SucursalService,
    StockService,
    VentaService,
    ClienteService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
