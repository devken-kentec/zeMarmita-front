import { ItemService } from './../shared/item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  preserveWhitespaces: true
})
export class ItemListComponent implements OnInit {

  itens: Item[] = [];

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarItens();
  }

  public listarItens(){
    this.itemService.listarItens().subscribe(
      res => this.itens = res
    );
  }

  editar(id: number){
    this.router.navigate(["editar", id], {relativeTo: this.route });
  }

}
