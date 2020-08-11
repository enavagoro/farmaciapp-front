import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

export interface Usuario{
  id : number;
  nombre : string;
  apellido : string;
  correo : string;
  clave : string;
  estado : number;
}

@Injectable()

export class UsuarioService {

  private url: string = "http://201.239.13.125";
  idEmpresa = '';
  idUsuario = '';
  constructor(private login:LoginService,private http: HttpClient) {

  }

  async listar() {
    
    this.url = "https://api.vase.cl";
    return this.http.get<Usuario[]>(`${this.url}/users/`,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  async insertar(cliente : Usuario){
    
    this.url = "https://api.vase.cl";
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

}
