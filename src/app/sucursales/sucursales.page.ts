import { Component, OnInit } from '@angular/core';
import { ModalController ,PickerController ,PopoverController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { UsuarioService } from '../_servicios/usuario.service';
//import { DetalleSucursalPage } from './detalle/detalle.page';//
import { SucursalService } from '../_servicios/sucursales.service';
import { LoginService } from '../_servicios/login.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.page.html',
  styleUrls: ['./sucursales.page.scss'],
})
export class SucursalesPage implements OnInit {
  sucursales = [];
  banderas = [];
  usuarios = [];
  constructor(private login : LoginService,private storage : Storage,private sucursalService :SucursalService,private usuarioService:UsuarioService,private modalController: ModalController,public router: Router) {

  }

  ngAfterViewInit(){
    console.log("visible?");
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
  }

  ngOnInit() {
    this.login.getFirstTimeEmpresa().then(val=>{
      console.log(val);
      this.sucursalService.listar().subscribe(s=>{
        this.sucursales = s;
        console.log(this.sucursales);
      })
    })

  }

  abrirSucursal(sucursal){
    console.log(sucursal);
    this.storage.set('sucursal',sucursal);
    this.router.navigate(['/inicio']);

  }


}
