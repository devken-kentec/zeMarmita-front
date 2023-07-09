import { GlobalService } from './../../shared/global.service';
import { ItemService } from './../shared/item.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../shared/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private fb: FormBuilder,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private globalService: GlobalService) {

    this.itemForm = this.fb.group({
      id: [''],
      descricao: [''],
      unidadeMedida: [''],
      tipo: [''],
      tamanho: [''],
      valorUnitario: [''],
      imagem: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.listarUm(routeParams['id']);
  }

  public listarUm(id: number){
    if(id != null){
      this.itemService.listarUm(id).subscribe((res: any)=>{
        this.preencherFormulario(res)
     });
    }
  }

  public onSubmit(){
    let form = this.itemForm;
    if(form.valid){
      this.itemService.salvarAlterar(form.value).subscribe((res: any)=>{
        this.globalService.saveShow("Salvo com Successo!","Item")
      });
    }
    form.reset();
  }

  public preencherFormulario(item: Item){
    this.itemForm.patchValue(item);
  }

  public pegarIdUrl(){

  }

}
