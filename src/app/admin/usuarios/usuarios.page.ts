import { Component, OnInit } from '@angular/core';
import { PermisosService } from '../../_servicios/permisos.service';
import { PERMISSION } from '../../_servicios/usuario.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  permisos : PERMISSION = {c:false,r:false,u:false,d:false};
  constructor(private permisoService : PermisosService) {
  }

  ngOnInit() {
    var permisos = this.permisoService.getCurrentPathPermission('admin/usuarios');
    this.permisos = permisos || {c:false,r:false,u:false,d:false};    
  }
  addUser(){
    alert("hola");
  }

}
