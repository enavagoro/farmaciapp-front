import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

export interface Empresa{
  id : number;
  nombre : string;
  rut : string;
  giro : string;
  direccion : string;
  comuna : string;
  ciudad : string;
  contacto : string;
  estado : number;
  url : string;
}

@Injectable()

export class EmpresaService {

  public url: string = "http://201.239.13.125";
  constructor(private login:LoginService,private http:HttpClient) {

  }

  guardar(form){
    //console.log(form);
    this.http.post(`${this.url}/empresa/archivo`, form, {
      headers: new HttpHeaders()
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa()),
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
            //console.log(event);
        });
  }

  async listar() {

    this.url = "https://api.vase.cl";
    return this.http.get<any[]>(`${this.url}/empresa/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  async getempresa(id){

    this.url = "https://api.vase.cl";
    return this.http.get<any>(`${this.url}/empresa/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  async insertar(prod){

    this.url = "https://api.vase.cl";
    return this.http.post<any[]>(`${this.url}/empresa/`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(prod,id){
    return this.http.patch<any[]>(`${this.url}/empresa/${id}`,prod , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  eliminar(prod,id){
      prod.estado = false;
      delete prod.__v;
      return this.http.patch<any[]>(`${this.url}/empresa/${id}`,prod , {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization' , this.login.getToken())
        .set('empresaId' , this.login.getEmpresa())
      });
  }
}
