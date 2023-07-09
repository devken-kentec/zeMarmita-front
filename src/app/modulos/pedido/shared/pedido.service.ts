import { PedidoItemRetorno } from './pedido-item-retorno';
import { take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PedidoItem } from './pedido-item';
import { Pedido } from './pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly api = `${environment.api}/comidaApp/api/pedido`;

  constructor(private http: HttpClient) { }

  //todo
  public mostrarPedido(idPedido: number){
    return this.http.get<Pedido[]>(`${this.api}/mostrarPedido/${idPedido}`).pipe(
      take(1)
    );
  }

  public mostrarListaPedidosUsuarios(idUsuario: number){
    return this.http.get<PedidoItemRetorno[]>(`${this.api}/mostrarListaPedidosUsuarios/${idUsuario}`).pipe(
      take(1)
    );
  }

  public mostrarListaPedidosMontar(){
    return this.http.get<PedidoItemRetorno[]>(`${this.api}/mostrarListaPedidosMontar`).pipe(
      take(1)
    );
  }

  public iniciarPedido(idUsuario: number){
    return this.http.get(`${this.api}/iniciarPedido/${idUsuario}`).pipe(
      take(1)
    );
  }

  public enviarPedido(pedido: PedidoItem){
    return this.http.post(`${this.api}/enviar`, pedido).pipe(
      take(1)
    );
  }

  public cancelarPedido(id: number){
    return this.http.get(`${this.api}/cancelarPedido/${id}`).pipe(
      take(1)
    );
  }

  public somarValorPedido(idPedido: number){
    return this.http.get(`${this.api}/somarValorPedido/${idPedido}`).pipe(
      take(1)
    );
  }
}
