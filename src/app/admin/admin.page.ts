import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../_servicios/permisos.service';
import { UsuarioService } from '../_servicios/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  listado = [];
  constructor(private permisoService: PermisosService,private usuarioService : UsuarioService) {

  }

  ngOnInit() {
    var user = this.usuarioService.getCurrentUser();
    if(user){
      console.log(user);      
      let listado = user.menus.filter( menu => {
        return menu.url.startsWith('admin/') && menu.permission.r;
      })
      this.listado = listado;
    }else{
      alert("andate loco no estay iniciao");
    }
    console.log(this.listado);

  }

}
