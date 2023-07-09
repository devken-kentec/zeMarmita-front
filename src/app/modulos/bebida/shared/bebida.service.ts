import { take } from 'rxjs';
import { Bebida } from './bebida';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {

  private readonly api = `${environment.api}/comidaApp/api/bebidas`;

  constructor(private http: HttpClient) { }

  public buscarBebidasPorPedido(pedido: number){
    return this.http.get<Bebida[]>(`${this.api}/listarPorPedido/${pedido}`).pipe(
      take(1)
    );
  }

  public somarValoresBebidaPorPedido(pedido: number){
    return this.http.get(`${this.api}/somarValorPorPedido/${pedido}`).pipe(
      take(1)
    );
  }

  public excluirBebida(idBebida: number){
    return this.http.delete(`${this.api}/excluirBebida/${idBebida}`).pipe();
  }
}
