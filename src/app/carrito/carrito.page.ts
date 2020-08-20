import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController} from '@ionic/angular';
import { DetallePage } from './detalle/detalle.page';
import { CarritoService } from '../_servicios/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private modalCtrl : ModalController,private carritoService : CarritoService) { }
  detalle = [];
  carrito = [];
  total = 0;
  banderaDescuento : boolean = false;
  banderaBarra : boolean = true;
  menu : Subscription;
  carro : Subscription;
  producto = {"cantidad":0,"categorias":[],"codigo":"","costo:":0,"id":"","empresa":"","estado":"","titulo":"","venta":0,"sucursal":""};
  selector = {numeroMinimo: 999, numeroActual: 999, numeroMaximo: 999};

  ngOnInit() {
    console.log("on init");
    this.carrito = this.carritoService.getData();
    if(this.carrito.length == 0){
      this.menu = this.carritoService.getCarrito().subscribe(estado => {
        console.log("nuevo estado ",estado);
        this.banderaBarra = estado['bandera'];
      });
      this.carro = this.carritoService.getProduct().subscribe(dato=>{
        this.producto = dato['producto'];
        this.selector = dato['selector'];
        this.agregarProducto();

        console.log(dato);
      })
    }

  }

  traerCarrito(){
    console.log('dentro de la función traer carrito',this.detalle);
    this.detalle = this.carrito;
  }
  activarCarrito(){
    this.carritoService.toggleCarrito();
  }
  async abrirConfirmacion(){
    this.traerCarrito();

    const modal = await this.modalCtrl.create({
      component: DetallePage,
      cssClass: 'modals',
      componentProps:{
        'detalle' : this.detalle
      }
    });
    console.log('Pasamos a detalle');

    return await modal.present();
  }
  encontrarPorCodigo(codigo:string){
    console.log(codigo);
    var encontrados = this.carrito.filter(prod => { return prod.codigo ==  codigo});
    return  encontrados;
  }
  agregarProducto(){
    console.log(this.selector);
    console.log(this.producto);
    var previos = this.encontrarPorCodigo(this.producto.codigo);

    if(previos.length){
      previos[0].cantidad += this.selector.numeroActual;
      if(previos[0].cantidad >= this.selector['numeroMaximo']){
        alert("loco ya basta de agregar mas weas");
        previos[0].cantidad = this.selector['numeroMaximo'];
        this.actualizarTotal();
      }
      // actualizar prod
    }else{
        let prod = {codigo:this.producto.codigo,venta : this.producto.venta , titulo : this.producto.titulo , cantidad : this.selector.numeroActual}
        this.carrito.push(prod)
        this.actualizarTotal();
    }
    this.producto.cantidad - this.selector.numeroActual;
    this.actualizarTotal();
    console.log('carrito',this.carrito);
  }

  actualizarTotal(){
    console.log('entré');
    var total = Number(null);
    if(this.carrito.length==0){
      total = 0;
    }
    else{
      for(let i = 0; i<this.carrito.length; i++){
        total += (this.carrito[i].cantidad * this.carrito[i].venta);
      }
    }
    console.log('total',total);
    this.total = total;
    console.log('total final (this.total)',this.total);
  }
  disminuirProducto(indice){
    console.log(this.carrito);
    console.log(indice);
    this.carrito[indice]['cantidad'] --;
    if(!this.carrito[indice]['cantidad']){
      this.carrito.splice(indice,1);
      this.actualizarTotal();
    }
    this.carrito[indice]['total'] = ((this.carrito[indice]['cantidad']) * (this.carrito[indice]['venta']));
    this.actualizarTotal();
  }

  aumentarProducto(indice){

  }

  quitarProducto(indice){
    this.carrito.splice(indice,1);
    this.actualizarTotal();
  }

  restarProducto(){
    if(this.selector.numeroActual > this.selector.numeroMinimo)
    {
      this.selector.numeroActual --;
    }
  }

  cambiarDescuento(){
    this.banderaDescuento = !this.banderaDescuento;
  }

  ngOnDestroy() {
    this.carritoService.setData(this.carrito);
    //this.carro.unsubscribe();
    //this.menu.unsubscribe();
    console.log("destroy");

  }
}
