import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../_servicios/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private usuarioService : UsuarioService){
  }

  ngOnInit() {

  }
  login(){
    this.usuarioService.dropMenu();
    // validate formbuilder
    var usuario = {
      nombre:'Cristopher ',
      apellido:'Orellana',
      menus:[
        {title:'pos',permission:{c:true,r:true,u:true,d:true},url:'inicio',icon:'barcode',principal:true},
        {title:'admin',permission:{c:true,r:true,u:true,d:true},url:'admin',icon:'cog',principal:true},
        {title:'Usuarios',permission:{c:false,r:true,u:true,d:true},url:'admin/usuarios',icon:'cog',principal:false},
        {title:'Punto de venta',permission:{c:true,r:true,u:true,d:true},url:'admin/pos',icon:'cog',principal:false},
        {title:'Configuraciones',permission:{c:true,r:true,u:true,d:true},url:'admin/config',icon:'cog',principal:false},
      ]
    };

    this.usuarioService.setCurrentUser(usuario);

    for(var menu of usuario.menus){
      if(menu.permission.r && menu.principal){
        this.usuarioService.addMenu(menu)
      }
    }

  }

}
