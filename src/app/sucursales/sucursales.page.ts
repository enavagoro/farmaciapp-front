import { Component, OnInit } from '@angular/core';
import { ModalController ,PickerController ,PopoverController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { UsuarioService } from '../_servicios/usuario.service';
//import { DetalleSucursalPage } from './detalle/detalle.page';//
import { SucursalService } from '../_servicios/sucursales.service';
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
  constructor(private storage : Storage,private sucursalService :SucursalService,private usuarioService:UsuarioService,private modalController: ModalController,public router: Router) {

  }

  ngAfterViewInit(){
    this.storage.get('usuarios').then((val) => {
      this.sucursalService.listar().then(sucursales=>{
        sucursales.subscribe(s=>{
            this.sucursales = s;
            console.log(this.sucursales);
        })
      })
    })
    console.log("visible?");
    var menu = document.querySelector('ion-menu');
    menu.hidden = true;
  }

  ngOnInit() {

  }

  abrirSucursal(sucursal){
    console.log(sucursal);
    this.storage.set('sucursal',sucursal);
    this.router.navigate(['/inicio']);

  }


}
