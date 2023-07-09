import { PedidoService } from './../../pedido/shared/pedido.service';
import { PedidoItemRetorno } from './../../pedido/shared/pedido-item-retorno';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-montagem-list',
  templateUrl: './montagem-list.component.html',
  styleUrls: ['./montagem-list.component.css']
})
export class MontagemListComponent implements OnInit {

  data = new Date();
  dias = new Array('Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado');
  meses = new Array('Janeiro', 'Fevereio', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
  diaSemana: string = "";
  dia: string = "";
  mes: string = "";
  ano: string = "";
  itensMontagem: PedidoItemRetorno[] = [];
  idPedidos: [] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.mostrarListaPedidosMontar()
  }

  public chamarData(){
    this.diaSemana = this.dias[this.data.getDay()];
    this.dia = this.data.getDate().toString();
    this.mes =  this.meses[this.data.getMonth()];
    this.ano = this.data.getFullYear().toString();
  }

  editar(item: number){

  }

  public mostrarListaPedidosMontar(){
    this.pedidoService.mostrarListaPedidosMontar().subscribe((res: any)=>{
        this.itensMontagem = res
    });
  }

}
