import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

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

  banderaBarra = true;
  banderaPrincipal = true;
  banderaCalculadora = false;
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

  constructor(private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController) {

  }

  ngOnInit() {
    /* lol */

    this.productos = this.arregloLlegada;
    console.log(this.productos);
  }

  cambiarEstado(valor){
    (valor == 0 ? this.banderaPrincipal = !this.banderaPrincipal : this.banderaBarra = !this.banderaBarra );
  }

  activarCalculadora(){
    this.banderaCalculadora = !this.banderaCalculadora;
  }
  abrirDetalle(producto){
    this.producto = producto;
    this.cambiarEstado(0);
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
    this.cambiarEstado(0);
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
    this.cambiarEstado(0);
    console.log(this.carrito);
  }


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
}
