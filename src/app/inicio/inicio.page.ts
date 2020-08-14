import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ModalController ,ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ProductoService } from '../_servicios/producto.service';
import { StockService } from '../_servicios/stock.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('buscarInput',{static:false}) buscarInput;

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    console.log("aprete una tecliña",event);
    let asciiMenor = 32;
    let asciiMayor = 126;
    let valorEscape = 27;


    if(event.keyCode > asciiMenor && event.keyCode < asciiMayor){

      this.buscarInput.setFocus();
      (this.buscar ? this.productos = this.productos.filter( producto => this.filtrarProductos(producto,this.buscar)) : this.productos = this.productos)
    }

  }
  buscar : string = undefined;
  /* Producto
    {
      id: String,
      titulo: String,
      estado: Boolean,
      precio: Number,
      codigo: String,
      tag: Array,
    }

  */

  // (para después de llamar el servicio) -> producto = {id:0,titulo:'',precio:0,descripcion:'',cantidadMaxima:0,estado:false,codigo:''};

  banderaBarra = false;
  banderaPrincipal = true;
  banderaCalculadora = false;
  banderaMenu = true;

  productos = [];
  carrito = [];
  //producto = {"titulo":"","venta":0,"descripcion":"","cantidadMaxima":0,"cantidad":0,"estado":"","codigo":""};
  producto = {"cantidad":0,"categorias":[],"codigo":"","costo:":0,"id":"","empresa":"","estado":"","titulo":"","venta":0,"sucursal":""};
  productosFiltrados = [];
  /* hardcodeo del weno */

  productosAgregados = [];

  selector = {numeroMinimo: 999, numeroActual: 999, numeroMaximo: 999};

  botones = [1,2,3,4,5,7];

  banderaGrande : boolean = false;
  menu = document.querySelector('ion-menu');

  sucursal = {codigo:'',empresa:'',encargado:'',titulo:''};

  constructor(private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController,
              private storage : Storage,
              private productoService : ProductoService,
              private stockService : StockService) {

  }

  ngOnInit() {
    this.activarMenu();
    this.storage.get('sucursal').then((val) => {
      console.log('val',val);

      this.stockService.listarPorSucursal(val.id).subscribe(ps=>{
        console.log('listar por sucursal', ps);
        this.productos = ps;
        console.log(this.productos);
      })
    })

    /*
    this.productoService.listar().then(servicio=>{
      servicio.subscribe(p=>{
          this.productos = p;
          console.log('productos service ',this.productos);
      })
    })
    */
  }

  activarCarrito(){
    this.banderaBarra = !this.banderaBarra;
  }

  activarCalculadora(){
    this.banderaCalculadora = !this.banderaCalculadora;
  }

  activarPagePrincipal(){
    this.banderaPrincipal = !this.banderaPrincipal;
  }

  activarMenu(){
    this.banderaMenu = !this.banderaMenu;
    this.menu.hidden = this.banderaMenu;
  }

  abrirDetalle(producto){
    this.producto = producto;
    this.activarPagePrincipal();
    this.iniciarSelector();
  }

  iniciarSelector(){
    this.selector.numeroMaximo = this.producto.cantidad;
    this.selector.numeroActual = 0;
    this.selector.numeroMinimo = 0;
  }


  limpiarSelector(){
    this.selector = {numeroMinimo: 999, numeroActual: 999, numeroMaximo: 990};
  }

  disminuirProducto(indice){
    console.log(this.carrito);
    console.log(indice);
    this.carrito[indice]['cantidad'] --;
    if(!this.carrito[indice]['cantidad']){
      this.carrito.splice(indice,1);
    }
    this.carrito[indice]['total'] = ((this.carrito[indice]['cantidad']) * (this.carrito[indice]['venta']));
  }

  sumarProducto(){
    if(this.selector.numeroActual < this.selector.numeroMaximo)
    {
      this.selector.numeroActual ++;
    }
  }

  restarProducto(){
    if(this.selector.numeroActual > this.selector.numeroMinimo)
    {
      this.selector.numeroActual --;
    }
  }

  cerrarDetalle(){
    this.producto = {"cantidad":0,"categorias":[],"codigo":"","costo:":0,"id":"","empresa":"","estado":"","titulo":"","venta":0,"sucursal":""};
    this.activarPagePrincipal();
    this.limpiarSelector();
  }

  encontrarPorCodigo(codigo:string){
    console.log(codigo);
    var encontrados = this.carrito.filter(prod => { return prod.codigo ==  codigo});
    return  encontrados;
  }
/* las funciones aún no están realizadas es mero testeo */

  agregarProducto(){
    console.log(this.selector);
    console.log(this.producto);
    var previos = this.encontrarPorCodigo(this.producto.codigo);

    if(previos.length){
      previos[0].cantidad += this.selector.numeroActual;
      if(previos[0].cantidad >= this.selector['numeroMaximo']){
        alert("loco ya basta de agregar mas weas");
        previos[0].cantidad = this.selector['numeroMaximo'];
      }
      // actualizar prod
    }else{
        let valorTotal = (this.selector.numeroActual * this.producto.venta);
        console.log(valorTotal);
        let prod = {codigo:this.producto.codigo,venta : this.producto.venta , titulo : this.producto.titulo , cantidad : this.selector.numeroActual, total : valorTotal}
        this.carrito.push(prod)
    }
    this.producto.cantidad - this.selector.numeroActual;
    this.activarPagePrincipal();
    console.log(this.carrito);
  }

/*
  async confirmarAgregar(){

    const alert = await this.alertController.create({
      header: '¿Estás Seguro?',
      message: '¿Deseas agregar este producto al detalle? ',//definir bien el concepto de boleta,detalle,carrito? tu conoces el modelo de negocio :p
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.agregarProducto();
          }
        }
      ]
    });

    await alert.present();
  }
  */

  /* estilos barra */
  cambiarBarra(){
    this.banderaGrande = !this.banderaGrande;
  }

  filtrarProductos(producto,valorInput){
    console.log(producto);
    console.log(valorInput);
    if(!valorInput){return true};
    return producto.titulo.includes(valorInput);
  }

}
