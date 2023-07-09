import { ItemCardapio } from './item-cardapio';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemCardapioService {

  private readonly api = `${environment.api}/comidaApp/api/itemCardapio`;

  constructor(private http: HttpClient) { }

  public listarCardapioDia(idCardapio: number){
    return this.http.get<ItemCardapio[]>(`${this.api}/listarCardapioDia/${idCardapio}`).pipe(
      take(1)
    );
  }

  public gerarCardapio(idCardapio: number, iditem: number){
    return this.http.get(`${this.api}/gerar/${idCardapio}/${iditem}`).pipe(
      take(1)
    )
  }

  public removerItemCardapio(id: number){
    return this.http.get(`${this.api}/removerItemCardapio/${id}`).pipe(
      take(1)
    );
  }

  public listarCardapioDiaSemana(diaSemana: string){
    return this.http.get<ItemCardapio[]>(`${this.api}/listarCardapioDiaSemana/${diaSemana}`).pipe(
      take(1)
    );
  }
}
