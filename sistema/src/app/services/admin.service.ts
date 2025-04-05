import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  autenticar(codigo: string, senha: string): boolean {
    if(codigo == "admin" && senha == "123") {
      return true;
    } else {
      return false;
    }
  }

  registrarAutenticacao(){
    localStorage.setItem('adminAutenticado', JSON.stringify(1));
  }

  encerrarAutenticacao(){
    localStorage.removeItem('adminAutenticado');
  }
}
