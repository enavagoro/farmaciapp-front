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
    if(valor==0){
      this.banderaPrincipal = !this.banderaPrincipal;
    }
    if(valor==1){
      this.banderaBarra = !this.banderaBarra;
    }
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

  sumarProducto(){
    console.log('entré');

    if(this.selector.numeroActual < this.selector.numeroMaximo)
    {
      console.log('pasé el if');
      this.selector.numeroActual ++;
    }

  }

  restarProducto(){
    console.log('entré');
    console.log('numeroActual',this.selector.numeroActual);
    console.log('numeroMinimo',this.selector.numeroMinimo)
    if(this.selector.numeroActual > this.selector.numeroMinimo)
    {
      console.log('pasé el if');
      this.selector.numeroActual --;
    }
  }

  cerrarDetalle(){
    this.producto = {"titulo":"","precio":0,"descripcion":"","cantidadMaxima":0,"cantidad":0,"estado":"","codigo":""};
    this.cambiarEstado(0);
    this.limpiarSelector();
  }

/* las funciones aún no están realizadas es mero testeo */

  agregarProducto(){
    console.log('holo');
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
