import { Injectable } from '@angular/core';
import { UsuarioService , USER} from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private usuarioService : UsuarioService) {

  }

  getCurrentPathPermission(path){
    let user : USER = this.usuarioService.getCurrentUser();
    let menus = user.menus;
    let currentPath = menus.filter(menu => {
      return menu.url == path
    })
    console.log(currentPath);
    if(currentPath && currentPath[0]){
        return currentPath[0].permission;
    }
    return false;
  }

}
