import { TestBed } from '@angular/core/testing';

import { PermisosService } from './permisos.service';

describe('PermisosService', () => {
  let service: PermisosService;
  var usuario = {
    nombre:'Cristopher ',
    apellido:'Orellana',
    menus:[
      {title:'pos',permission:{c:true,r:true,u:true,d:true},path:'inicio'},
      {title:'admin',permission:{c:true,r:true,u:true,d:true},path:'admin'}
    ]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should validate user access permissions',() => {
    expect(service.getCurrentPathPermission('admin')).toBeTruthy();
  })
});
