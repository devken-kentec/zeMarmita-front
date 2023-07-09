import { GlobalService } from './../../shared/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardapioService } from './../shared/cardapio.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cardapio } from '../shared/cardapio';

@Component({
  selector: 'app-cardapio-form',
  templateUrl: './cardapio-form.component.html',
  styleUrls: ['./cardapio-form.component.css']
})
export class CardapioFormComponent implements OnInit {

  cardapioForm: FormGroup;
  incluirItemCardapio: boolean = false;

  constructor(private fb: FormBuilder,
              private cardapioService: CardapioService,
              private route: ActivatedRoute,
              private router: Router,
              private globalService: GlobalService) {
    this.cardapioForm = this.fb.group({
      id:[''],
      tipo: [''],
      diaSemana: [''],
      status: [''],
      observacao: ['']
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.mostrarUm(routeParams['id']);
  }


  public mostrarUm(id: number){
    if(id != null){
      this.cardapioService.mostrarUm(id).subscribe((res: any)=>{
        this.preencherFormulario(res)
        this.incluirItemCardapio = true;
     });
    }
  }

  public onSubmit(){
    let form = this.cardapioForm;
    if(form.valid){
      this.cardapioService.salvarCardapio(form.value).subscribe((res: any)=>{
            if(res.id != ""){
              this.preencherFormulario(res);
              this.incluirItemCardapio = true;
              this.globalService.saveShow("Salvo com Successo!","Item")
            }
      } );
    }
  }

  public preencherFormulario(cardapio: Cardapio){
    this.cardapioForm.patchValue(cardapio);
  }

  public incluirItensCardapio(){
    let id = this.cardapioForm.get('id')?.value;
    this.router.navigate(['/item-cardapio/editar', id]);
  }

}
