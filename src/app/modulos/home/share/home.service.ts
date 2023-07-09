import { Usuario } from './../../usuario/shared/usuario';
import { take } from 'rxjs';
import { Item } from './../../item/shared/item';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly api = `${environment.api}/comidaApp/api`;

  constructor(private http: HttpClient) { }

  public listarItens(){
    return this.http.get<Item[]>(`${this.api}/home/item/listarTodos`).pipe(
      take(1)
    );
  }

  public salvarUsuario(usuario: Usuario){
    return this.http.post(`${this.api}/home/salvarUsuario`, usuario).pipe(
      take(1)
    );
  }

  public buscarUsuarioPorSenha(senha: string){
    return this.http.post(`${this.api}/home/trazerUsuario`, senha).pipe(
      take(1)
    );
  }
}
