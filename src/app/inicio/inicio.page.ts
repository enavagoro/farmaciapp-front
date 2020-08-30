import { Component, OnInit, HostListener, ViewChild , ElementRef} from '@angular/core';
import { ModalController ,ToastController, AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CarritoService } from '../_servicios/carrito.service';
import { ProductoService } from '../_servicios/producto.service';
import { StockService } from '../_servicios/stock.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild('subscriptionSlider',{static:false}) subscriptionSlider;
  slideActual = 0;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };
  @ViewChild('buscarInput',{static:false}) buscarInput;
  @ViewChild(IonInfiniteScroll,{static:false}) infiniteScroll: IonInfiniteScroll;

  //@HostListener('document:click', ['$event']) onKeydownHandler(event: KeyboardEvent) {

    //console.log('target ', event.target);
    /*
    console.log('id-container',document.getElementById("contenedor-categorias"));
    console.log('id-boton',document.getElementById("boton-categoria"));
*/
/*
    if(event.target != document.getElementById("contenedor-categorias")){
      console.log('el target está afuera de categorias');
    }
    */
/*
    console.log("aprete una tecliña",event);
    let asciiMenor = 32;
    let asciiMayor = 126;
    let valorEscape = 27;


    if(event.keyCode > asciiMenor && event.keyCode < asciiMayor){

      this.buscarInput.setFocus();
      (this.buscar ? this.productos = this.productos.filter( producto => this.filtrarProductos(producto,this.buscar)) : this.productos = this.productos)
    }
*/
  //}
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
  cantidad = 50;
  banderaBarra = true;
  banderaPrincipal = true;
  banderaCalculadora = true;
  banderaMenu = true;
  banderaDescuento = true;

  banderaCategoria = false;
  todosLosProductos = [];

  productos = [];
  carrito = [];
  total = Number(null);
  ventas = [];
  public venta  = {estado:0,id:0,idCliente:0,desde:'POS',fecha:new Date().toLocaleDateString(),detalle:[],dias:1,tipoDocumento:0,metodo:1,idEmpresa:0,idUsuario:''};
  //producto = {"titulo":"","venta":0,"descripcion":"","cantidadMaxima":0,"cantidad":0,"estado":"","codigo":""};
  producto = {"cantidad":0,"categorias":[],"codigo":"","costo:":0,"id":"","empresa":"","estado":"","titulo":"","venta":0,"sucursal":""};

  productosFiltrados = [];
  productosRespaldados = [];
  productosAgregados = [];

  selector = {numeroMinimo: 999, numeroActual: 999, numeroMaximo: 999};

  botones = [1,2,3,4,5,7];

  banderaGrande : boolean = false;
  menu = document.querySelector('ion-menu');
  detalle = [];
  sucursal = {codigo:'',empresa:'',encargado:'',titulo:''};

  categorias = [];
  categoriasRespaldo = [];

  constructor(private toastController : ToastController,
              private alertController :AlertController,
              private modalCtrl : ModalController,
              private storage : Storage,
              private productoService : ProductoService,
              private stockService : StockService,
              private carritoService : CarritoService,
              private router : Router,
              private eRef : ElementRef) {
/*
               this.storage.get('usuarios').then((val) => {
                  if(val){
                    this.usuario = val;
                    console.log(val);
                    var permission = this.usuarioService.tienePermiso(val,'ventas');
                    if(permission){
                      this.permission = permission;
                      if(!permission.r){
                        this.storage.clear();
                        this.router.navigate(['/login'], {replaceUrl: true});
                      }
                    }
                  }
                })
                */
            }

  cambiarSlide(event){
    console.log("CAmbiado",event);
    this.subscriptionSlider.getActiveIndex().then(index => {
      let realIndex = index;
      if (event.target.swiper.isEnd) {  // Added this code because getActiveIndex returns wrong index for last slide
        realIndex = this.productosFiltrados.length - 1;
      }
      this.producto = this.productosFiltrados[realIndex];
      // You can now use real index
    });
    //this.producto = prod;
  }
  ngAfterViewInit(){
    this.carritoService.toggleCarrito();
    //this.ngOnInit();
  }
  ngOnInit() {


    this.carritoService.getCarrito().subscribe(estado => {
      this.banderaBarra = estado['bandera'];
    });

    this.activarMenu();
    this.storage.get('sucursal').then((val) => {
      console.log('val',val);
      this.stockService.listarPorSucursal(val.id).subscribe(ps=>{
        //ps = ps.filter(dato=>{return dato.estado});

        for(var producto of ps){
          if(producto.estado){
            this.productos.push(producto);

            producto.categorias.map(c=>{
              var t = this.categorias.filter(x => x.nombre == c.nombre);
              if(t.length==0)
              {
                this.categorias.push(c);
                c['active']=false;
                this.categoriasRespaldo.push(c);
              }
            })
          }
        }

        console.log('productos',this.productos);
        var productosAgrupados = [];
        this.productos.map(producto=>{
          var indice = -1;
          for(var i = 0 ; i < productosAgrupados.length ; i++){
              if(producto.codigo == productosAgrupados[i].codigo ){
                indice = i;
              }
          }
          if(indice === -1){
            productosAgrupados.push(producto);
          }else{
            productosAgrupados[indice].cantidad += producto.cantidad;
          }
        })

        this.todosLosProductos = productosAgrupados;
        this.productosFiltrados = this.todosLosProductos.slice(0, this.cantidad);;
        this.productosRespaldados = productosAgrupados;

      })
    })
  }

  activarCarrito(){
    this.carritoService.toggleCarrito();
  }

  activarCalculadora(){
    this.banderaCalculadora = !this.banderaCalculadora;
  }

  activarPagePrincipal(){
    this.banderaPrincipal = !this.banderaPrincipal;
  }

  activarCategorias(){
    console.log('entre a categorias')
    this.banderaCategoria = !this.banderaCategoria;
  }

  activarMenu(){
    this.banderaMenu = !this.banderaMenu;
    this.menu.hidden = this.banderaMenu;
  }
  loadData(event) {
    this.cantidad += 50;
    this.productosFiltrados = this.todosLosProductos.slice(0, this.cantidad);;
    event.target.complete();
    //if (this.productosFiltrados.length == this.todosLosProductos.length) {
    //  event.target.disabled = true;
    //}
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  filtrarListaProductos(){
    this.productosFiltrados = [];
    console.log('buscar',this.buscar);

    for(let i=0; i<this.productos.length; i++){

      var titulo = this.productos[i].titulo.toUpperCase();

      if(titulo.includes(this.buscar.toUpperCase()) && this.productos[i].estado != 0 ){
        this.productosFiltrados.push(this.productos[i]);
      }
    }

    if(this.buscar==""){
      this.productosFiltrados = this.productos;
    }
    console.log('productos filtrados despues del for',this.productosFiltrados);

  }

  abrirDetalle(producto,indice){
    this.producto = producto;
    this.activarPagePrincipal();
    this.iniciarSelector();
    this.slideActual = indice;
  }
  cargarSlide(){
    console.log("en el slide");
    this.subscriptionSlider.slideTo(this.slideActual);
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

  /* Carrito  */

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
    if(!this.banderaBarra){
      this.carritoService.toggleCarrito();
    }
    this.carritoService.addProduct(this.selector,this.producto);
    this.activarPagePrincipal()

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

  /* estilos barra */
  cambiarBarra(){
    this.banderaGrande = !this.banderaGrande;
  }

  cambiarDescuento(){
    this.banderaDescuento = !this.banderaDescuento;
  }

  filtrarProductos(producto,valorInput){
    console.log(producto);
    console.log(valorInput);
    if(!valorInput){return true};
    return producto.titulo.includes(valorInput);
  }

  filtrar(categoria,cx){
    if(categoria == 'Todos'){
      cx['active']=false;
      this.restart();
    }
    else{
      var productosFiltrados = [];
      this.filtrarCategorias(categoria);

      console.log('categoria', categoria);
      console.log('productos filtrados', this.productosFiltrados);
      for(var producto of this.productosFiltrados){
        producto.categorias.map(x => {
          if(x.nombre == categoria.nombre){
            productosFiltrados.push(producto);
          }
        })
        /*
        for (var categoriaProducto of producto.categorias){
          if(categoriaProducto.nombre == categoria){
            console.log('que pasa chavales');
          }
        }
        */
      }
      this.productosFiltrados = productosFiltrados;
    }
  }

  filtrarCategorias(categoria){
    this.categorias = this.categorias.filter(x => x.nombre == categoria.nombre);
    this.categorias.map(c => c['active']=true);
    console.log('buenas chavales',this.categorias);
  }

  restart(){
    this.categorias = this.categoriasRespaldo;
    this.productosFiltrados = this.productosRespaldados;
  }
}
