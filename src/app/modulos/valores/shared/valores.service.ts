import { take } from 'rxjs';
import { Valores } from './valores';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  private readonly api = `${environment.api}/comidaApp/api/valores`;

  constructor(private http: HttpClient) { }

  public listarUmValor(id: number){
    return this.http.get(`${this.api}/listarUm/${id}`).pipe(
      take(1)
    );
  }

  public listarValores(){
    return this.http.get<Valores[]>(`${this.api}/listarTodos`).pipe(
      take(1)
    )
  }

  public listarValoresAtivo(){
    return this.http.get<Valores[]>(`${this.api}/listarTodosAtivo`).pipe(
      take(1)
    )
  }

  private salvarValores(valor: Valores){
    return this.http.post(`${this.api}`, valor).pipe(
      take(1)
    );
  }

  private alterarValores(valor: Valores){
    return this.http.put(`${this.api}`, valor).pipe(
      take(1)
    );
  }

  public salvarAlterarValores(valor: Valores){
    if(valor.id){
      return this.alterarValores(valor);
    } else {
      return this.salvarValores(valor);
    }
  }
}
