import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable, Subject } from 'rxjs';

export interface PERMISSION{
  c:boolean;
  r:boolean;
  u:boolean;
  d:boolean;
};
export interface MENU {
  title:string;
  permission:PERMISSION;
  principal:boolean;
  url:string;
  icon:string;
};

export interface Usuario{
  id : number;
  nombre : string;
  apellido : string;
  correo : string;
  clave : string;
  menu : Array<MENU>;
  estado : number;
}

@Injectable()

export class UsuarioService {

  private subject = new Subject<any>();
  private url : string = "https://api.vase.cl";
  idEmpresa = '';
  idUsuario = '';
  constructor(private login:LoginService,private http: HttpClient) {

  }

  async listar() {

    return this.http.get<Usuario[]>(`${this.url}/users/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  async insertar(cliente : Usuario){


    return this.http.post<Usuario>(`${this.url}/users/`,cliente, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(user,id){
    return this.http.patch<any[]>(`${this.url}/users/${id}`,user , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  eliminar(user,id){
      user.estado = false;
      delete user.__v;
      return this.http.patch<any[]>(`${this.url}/user/${id}`,user , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization' , this.login.getToken())
        .set('empresaId' , this.login.getEmpresa())
      });
  }
  tienePermiso(usuario,path){
    if(usuario.menu){
      var currentMenu = {};
      usuario.menu.map(menu=>{
        if(menu.url == path){
          currentMenu = menu;
        }
      });
    }
    return currentMenu['permission'];
  }
  addMenu(menu: MENU) {
    this.subject.next({  menu });
  }

  getMenu(): Observable<any> {
      return this.subject.asObservable();
  }
  dropMenu(){
    this.subject.next();
  }

}
