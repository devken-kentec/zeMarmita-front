import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private readonly api = `${environment.api}/comidaApp/api`;

  constructor(private toastr: ToastrService, private http: HttpClient) { }

  saveShow(mensagem: string, titulo: string){
    this.toastr.success(mensagem, titulo);
  }

  removeShow(mensagem: string, titulo: string){
    this.toastr.error(mensagem, titulo)
  }

  warningShow(mensagem: string, titulo: string){
    this.toastr.warning(mensagem, titulo)
  }

  consultaCep(cep: number){
    return this.http.get(`${this.api}/cadastro/buscarCep/${cep}` ).pipe(
      take(1)
    );
  }

  formatarDate(data: string){
    let dataCompleta = "";
			 let dia = data.substring(8,10);
			 let mes = data.substring(5,7);
       let ano = data.substring(0,4);

       if(dia.length == 1){
        dia = "0" + dia;
     }
      if(mes.length == 1){
        mes = "0" + mes
      }
     dataCompleta = dia+"/"+mes+"/"+ano
		 return dataCompleta;
  }

  formatarTime(time: string){
    let horaCompleta = "";
    let hora = time.substring(11,13);
    let minuto = time.substring(14, 16);

    if(hora.length == 1){
      hora = "0" + hora;
    }

    if(minuto.length == 1){
      minuto = "0" + minuto;
    }
    horaCompleta = hora + ":" + minuto;
    return horaCompleta;
  }

}
