import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';



@Injectable()

export class StorageService {

  public idEmpresa = 0;
  public idUsuario = 0;
  constructor(private http: HttpClient,private storage : Storage) {
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value;
    });
    this.storage.get('idEmpresa').then((value)=>{
      this.idEmpresa = value;
      //console.log(value)
    });
  }

  getIdUsuario(){
    return new Promise(resolve => {
      this.storage.get('idUsuario').then((value)=>{
        this.idEmpresa = value;
        resolve(value);
      });
    })
  }
  getIdEmpresa(){
    return new Promise(resolve => {
      this.storage.get('idEmpresa').then((value)=>{
        this.idEmpresa = value;
        resolve(value);
      });
    })
  }

}
