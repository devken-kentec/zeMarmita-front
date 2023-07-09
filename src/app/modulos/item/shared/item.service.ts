import { Item } from './item';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly api = `${environment.api}/comidaApp/api/item`;

  constructor(private http: HttpClient) { }

  public listarUm(id: number){
    return this.http.get(`${this.api}/listarUm/${id}`).pipe(

    );
  }

  public listarItens(){
    return this.http.get<Item[]>(`${this.api}/listarTodos`).pipe(
      take(1)
    );
  }

  public listarItemAtivo(){
    return this.http.get<Item[]>(`${this.api}/listarItemAtivo`).pipe(
      take(1)
    );
  }

  public listarBebidas(){
    return this.http.get<Item[]>(`${this.api}/listarBebidas`).pipe(
      take(1)
    );
  }

  gravarPedidoBebidas(pedido: number, idBebida: number, quantidade: number){
    return this.http.get(`${this.api}/incluirBebidaPedido/${pedido}/${idBebida}/${quantidade}`)
  }

  private salvarItem(item: Item){
    return this.http.post(`${this.api}`, item).pipe(
      take(1)
    );
  }

  private alterarItem(item: Item){
    return this.http.put(`${this.api}`, item).pipe(
      take(1)
    );
  }

  public salvarAlterar(item: Item){
    if(item.id){
      return this.alterarItem(item);
    } else {
      return this.salvarItem(item);
    }
  }
}
