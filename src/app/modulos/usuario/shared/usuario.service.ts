import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly api = `${environment.api}/comidaApp/api/usuario`;

  constructor(private http: HttpClient) { }

  public mostraUm(id: number){
    return this.http.get(`${this.api}/mostrarUm/${id}`).pipe(
      take(1)
    );
  }
}
