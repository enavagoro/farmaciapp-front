import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
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
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get empty current user', () => {
    expect( service.getCurrentUser() )
    .toBeUndefined();
  });

  it('Should assign user ', () => {
    expect( service.setCurrentUser(usuario) )
    .toBeTruthy();
  });



});
