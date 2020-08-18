import { Component, OnInit } from '@angular/core';
import { ModalController ,NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { VentaService } from "../../_servicios/venta.service";
import { PERMISSION,UsuarioService } from '../../_servicios/usuario.service';
import { Router } from '@angular/router';
import { StockService } from '../../_servicios/stock.service';
import { ClienteService } from '../../_servicios/cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})

export class DetallePage implements OnInit {
  permission : PERMISSION = {c:false,r:false,u:false,d:false};
  private detalle = [];
  usuario : any;
  private clientes  = [];
  public cliente  = {estado:1,id:0,nombre:'Sin Cliente',rut:'Sin Rut',giro:'Sin Giro',direccion:'Sin Giro',comuna:'Sin Giro',ciudad:'Sin Giro',contacto:'Sin Giro',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
  clientesFiltrado = [];
  rutCliente = "";

  ventas = [];
  public venta  = {estado:0,id:0,idCliente:0,desde:'POS',fecha:new Date().toLocaleDateString(),detalle:[],dias:1,tipoDocumento:0,metodo:1,idEmpresa:0,idUsuario:''};
  metodos = [
    {nombre:"Efectivo",valor:0},
    {nombre:"Debito",valor:1},
    {nombre:"Crédito",valor:2}];
  dias = [
    {nombre:'En el momento',valor:0},
    {nombre:'30 dias',valor:1},
    {nombre:'60 dias',valor:2}];

    clientExist = false;

  constructor(private navParams : NavParams, private modalCtrl: ModalController,
              private ventaService: VentaService,
              private stockService : StockService,
              private usuarioService : UsuarioService,
              private storage : Storage,
              private router : Router,
              private clienteService : ClienteService) {

    var ps = navParams.get("detalle");
    //console.log(ps);
    if(ps){
      this.detalle = ps;
      console.log(this.detalle);
    }

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
  }

  ngOnInit() {
    this.ventaService.listar().then(servicio=>{
      servicio.subscribe(v=>{
          this.ventas = v;
          console.log('ventas',this.ventas);
          console.log('venta',this.venta);
      })
    })

    this.clienteService.listar().then(servicio=>{
        servicio.subscribe(c=>{
          this.clientes = c;
          console.log('clientes',this.clientes);
        })
      })
  }

  cambiarEstadoCliente(){
    if(this.clientExist){
      this.cliente = {estado:1,id:0,nombre:'Sin Cliente',rut:'Sin Rut',giro:'Sin Giro',direccion:'Sin Giro',comuna:'Sin Giro',ciudad:'Sin Giro',contacto:'Sin Giro',tipoCompra:0,detalle : [],idEmpresa:0,idUsuario:0};
    }
  }

    guardarVenta(){
      console.log('dentro de guardar venta');
      this.venta.detalle = this.detalle;
      this.venta.idUsuario = this.usuario['id'];
      this.venta.idCliente = this.cliente.id;
      var i = 0;
      var inventariados = this.venta.detalle.filter(prod=>{return prod.tipo == 1})
      for(var producto of this.venta.detalle){
        console.log('pasé 1');
        if(producto.tipo == 1){
          console.log('pasé 2');
          this.stockService.descontar(producto.cantidad,producto['id']).subscribe(d=>{
            console.log(d);
            if(d['error']){
              alert(d['error']);
            }else{
              i++;
              this.ejecutarInsercion(i,inventariados.length);
            }
          })
        }
      }
      //this.venta.detalle.push(this.productoDescuento);
    }

    public ejecutarInsercion(indice,tam){
      console.log('dentro de ejecutar Insercion');
      if(indice == tam){
        console.log('venta service insertar');
        this.ventaService.insertar(this.venta).subscribe(data=>{
          this.ngOnInit();
          this.detalle = [];
  /*
          this.cliente = undefined;
          this.nombreCliente = "";
  */
          this.venta = {estado:0,id:0,idCliente:0,desde:'POS',fecha:new Date().toLocaleDateString(),detalle:[],dias:1,tipoDocumento:0,metodo:1,idEmpresa:0,idUsuario:''};
        })
      }
    }

    filtrarCliente(){
      this.clientesFiltrado = [];

      for(let i=0; i<this.clientes.length; i++)
      {
        var nombre = this.clientes[i].rut.toUpperCase();

        if(nombre.includes(this.rutCliente.toUpperCase()) && this.clientes[i].estado != 0 ){
          this.clientesFiltrado.push(this.clientes[i]);
        }
      }
      if(this.clientesFiltrado.length == 0 ){
        this.cliente = undefined;
      }

      if(this.rutCliente==""){
        this.filtrarCliente();
      }
    }

    verCliente(cliente){
      this.cliente = cliente;
      this.filtrarCliente();
      console.log('este es el cliente',this.cliente);
    }

}
