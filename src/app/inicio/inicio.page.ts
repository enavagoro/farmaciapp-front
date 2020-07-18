import { Component, OnInit } from '@angular/core';

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
  banderaBarra = true;
  productos = [];
  /* hardcodeo del weno */

  arregloLlegada = [{"titulo":"peineta","precio":"1000","descripcion":"peinetas baratas","cantidadMaxima":"23","estado":"true","codigo":"A-1"},
                    {"titulo":"pastillas","precio":"3000","descripcion":"pastillas buenas","cantidadMaxima":"15","estado":"true","codigo":"B-2"},
                    {"titulo":"manzanas","precio":"2000","descripcion":"manzanas baratas","cantidadMaxima":"10","estado":"true","codigo":"C-3"},
                    {"titulo":"morral","precio":"1500","descripcion":"morral de lana","cantidadMaxima":"9","estado":"true","codigo":"D-4"}
                    ];

  productosAgregados = [];

  constructor() {

  }

  ngOnInit() {
    /* lol */
    
    this.productos = this.arregloLlegada;
    console.log(this.productos);
  }

  cambiarEstado(){
    this.banderaBarra = !this.banderaBarra;
  }

/* las funciones aún no están realizadas es mero testeo */

  agregarProductos(producto){
    this.productosAgregados.push(producto);
    console.log(this.productosAgregados);
  }
}
