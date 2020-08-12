import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private url: string = "https://api.vase.cl";
  private datosCargados : boolean = false;
  constructor(private login:LoginService,private http:HttpClient) { }

  async listar() {

    if(!this.datosCargados){
      var token = await this.login.getFirstTimeEmpresa();
      this.datosCargados = true;
    }
    
    return this.http.get<any[]>(`${this.url}/sucursal/` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }

  getProducto(id){
    return this.http.get<any[]>(`${this.url}/sucursal/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  insertar(suc){
    suc.empresa = this.login.getEmpresa();
    return this.http.post<any[]>(`${this.url}/sucursal/`,suc , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
  }
  actualizar(suc,indice){
    return this.http.patch<any[]>(`${this.url}/sucursal/`,suc , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization' , this.login.getToken())
      .set('empresaId' , this.login.getEmpresa())
    });
    //var indice  = this.productos.indexOf(prod);
    //this.productos[indice] = prod;
    //console.log(this.productos[indice]);

  }
}
