import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class CarritoService {
  banderaBarra = false;
  private toggle = new Subject<any>();
  private carrito = new Subject<any>();
  arrayCarrito = [];
  constructor() {
    this.toggleCarrito();
  }

  toggleCarrito() {
    this.banderaBarra = !this.banderaBarra;
    var bandera = this.banderaBarra;
    this.toggle.next({  bandera });
  }
  addProduct(selector, producto){    
    this.carrito.next({selector : selector , producto : producto});
  }
  getProduct(){
    return this.carrito.asObservable();
  }
  getCarrito(): Observable<any> {
      return this.toggle.asObservable();
  }
  getData(){
    return this.arrayCarrito;
  }
  setData(d){
    this.arrayCarrito = d;
  }

}
