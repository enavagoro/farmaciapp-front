import { Injectable } from '@angular/core';
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
export interface USER {
  nombre: string;
  apellido: string;
  menus : Array<MENU>;
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  currentUser : USER;
  private subject = new Subject<any>();

  constructor() { }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentUser(usuario){
    this.currentUser = usuario;
    return true;
  }

  addMenu(menu: MENU) {
    delete menu.permission;
    this.subject.next({  menu });
  }

  getMenu(): Observable<any> {
      return this.subject.asObservable();
  }
  dropMenu(){
    this.subject.next();
  }

}
