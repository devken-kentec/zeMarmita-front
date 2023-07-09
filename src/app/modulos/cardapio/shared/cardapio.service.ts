import { Cardapio } from './cardapio';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  private readonly api = `${environment.api}/comidaApp/api/cardapio`;

  constructor(private http: HttpClient) { }

  public mostrarUm(id: number){
    return this.http.get(`${this.api}/mostrarUm/${id}`).pipe(
      take(1)
    );
  }

  public listarCardapio(){
    return this.http.get<Cardapio[]>(`${this.api}/listarTodos`).pipe(
      take(1)
    );
  }

  public salvarCardapio(cardapio: Cardapio){
    return this.http.post(`${this.api}`, cardapio).pipe(
      take(1)
    );
  }
}
