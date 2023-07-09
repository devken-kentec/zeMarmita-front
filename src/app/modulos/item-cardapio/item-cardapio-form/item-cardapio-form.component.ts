import { ItemCardapioService } from './../shared/item-cardapio.service';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from './../../item/shared/item.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../item/shared/item';
import { ItemCardapio } from '../shared/item-cardapio';

@Component({
  selector: 'app-item-cardapio-form',
  templateUrl: './item-cardapio-form.component.html',
  styleUrls: ['./item-cardapio-form.component.css']
})
export class ItemCardapioFormComponent implements OnInit {

  itemCardapioForm: FormGroup;
  itens: Item[] = [];
  itensCardapio: ItemCardapio[] = [];

  constructor(private fb: FormBuilder,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private itemCardapioService: ItemCardapioService) {

        this.itemCardapioForm = this.fb.group({
           id: [''],
           idItem: [''],
           idCardapio: ['']
        });
   }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    let idCardapio = routeParams["id"];
    this.itemCardapioForm.get("idCardapio")?.setValue(idCardapio);
    this.listarItemAtivo();
    this.listarCardapioDia();
  }

  public listarItemAtivo(){
    this.itemService.listarItemAtivo().subscribe(
      res => this.itens = res
    );
  }

  public listarCardapioDia(){
    let idCardapio = this.itemCardapioForm.get("idCardapio")?.value;
    this.itemCardapioService.listarCardapioDia(idCardapio).subscribe(
      res => this.itensCardapio = res
    );
  }

  public onSubmit(){
    let idCardapio = this.itemCardapioForm.get("idCardapio")?.value;
    let idItem = this.itemCardapioForm.get("idItem")?.value;

      idItem.forEach((element: number) => {
          this.itemCardapioService.gerarCardapio(idCardapio, element).subscribe((res: any)=>{
            console.log("Entrou"),
            this.listarCardapioDia();
          });
      });
  }

  public retirarCardapio(id: number){
    this.itemCardapioService.removerItemCardapio(id).subscribe((res:any)=>{
      this.listarCardapioDia();
    });
  }
}
