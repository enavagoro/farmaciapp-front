import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ModalController ,ToastController, AlertController} from '@ionic/angular';


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
    /*  this.buscar += event.key; */
      this.buscarInput.setFocus();
      (this.buscar ? this.productos = this.arregloLlegada.filter( producto => this.filtrarProductos(producto,this.buscar)) : this.productos= this.arregloLlegada)
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
  producto = {"titulo":"","precio":0,"descripcion":"","cantidadMaxima":0,"cantidad":0,"estado":"","codigo":""};
  /* hardcodeo del weno */

  arregloLlegada = [{"titulo":"Peineta","precio":1000,"descripcion":"peinetas baratas","cantidadMaxima":23,"estado":"true","codigo":"A-1"},
                    {"titulo":"Pastillas","precio":3000,"descripcion":"pastillas buenas","cantidadMaxima":15,"estado":"true","codigo":"B-2"},
                    {"titulo":"Manzanas","precio":2000,"descripcion":"manzanas baratas","cantidadMaxima":10,"estado":"true","codigo":"C-3"},
                    {"titulo":"Morral","precio":1500,"descripcion":"morral de lana","cantidadMaxima":9,"estado":"true","codigo":"D-4"}
                    ];

  productosAgregados = [];

  selector = {numeroMinimo: 999, numeroActual: 999, numeroMaximo: 990};

  botones = [1,2,3,4,5,7];

  banderaGrande : boolean = false;
  menu = document.querySelector('ion-menu');

  constructor(private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {

  }

  ngOnInit() {
    this.activarMenu();
    this.productos = this.arregloLlegada;
    console.log(this.productos);
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
    this.selector.numeroMaximo = this.producto.cantidadMaxima;
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
    this.producto = {"titulo":"","precio":0,"descripcion":"","cantidadMaxima":0,"cantidad":0,"estado":"","codigo":""};
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
      // actualizar prod
    }else{
        let prod = {codigo:this.producto.codigo,precio : this.producto.precio , titulo : this.producto.titulo , cantidad : this.selector.numeroActual}
        this.carrito.push(prod)
    }
    this.producto.cantidadMaxima - this.selector.numeroActual;
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
