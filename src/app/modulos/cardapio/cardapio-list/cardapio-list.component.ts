import { Router, ActivatedRoute } from '@angular/router';
import { CardapioService } from './../shared/cardapio.service';
import { Component, OnInit } from '@angular/core';
import { Cardapio } from '../shared/cardapio';

@Component({
  selector: 'app-cardapio-list',
  templateUrl: './cardapio-list.component.html',
  styleUrls: ['./cardapio-list.component.css'],
  preserveWhitespaces: true
})
export class CardapioListComponent implements OnInit {

  cardapios: Cardapio[] = [];

  constructor(private cardapioService: CardapioService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  public listarTodos(){
    this.cardapioService.listarCardapio().subscribe(
        res => this.cardapios = res
    );
  }

  editar(id: number){
    this.router.navigate(["editar", id], {relativeTo: this.route});
  }

}
