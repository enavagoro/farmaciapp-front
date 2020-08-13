import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token : string = "";
  private url: string = "https://api.vase.cl";
  private empresa : string = "";
  constructor(private router:Router,private storage : Storage,private http:HttpClient) {
    this.storage.get('usuarios').then((val) => {
      if(val){
        this.setEmpresa(val['empresa']);
        this.setToken(val['token']);
      }else{
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
  }
  public getUrl(){
    return new Promise(resolve => {
      resolve("https://api.vase.cl");
    });
  }
  public getEmpresa(){
    return this.empresa;
  }
  async getFirstTimeEmpresa(){
    console.log("en first time");
    return new Promise(resolve => {
      this.storage.get('usuarios').then((val) => {
        this.setEmpresa(val['empresa']);
        this.setToken(val['token']);
        console.log("Respuesta firs time",val);
        resolve(val.empresa);
      })
    });

  }
  public setEmpresa(em){
    this.empresa = em;
  }
  public setToken(t){
    this.token = t;
  }
  public getToken(){
    return "Bearer "+this.token;
  }
  public setUser(user){
    this.storage.set('usuarios', user);
  }
  async getUser(form){
    this.url = <string>await this.getUrl();
    this.url = "https://api.vase.cl";
    return this.http.post<any[]>(`${this.url}/users/login/`,form , {
      headers: new HttpHeaders()
      .set('Authorization','Bearer '+this.token)
      .set('Content-Type', 'application/json')

    });
  }
}
