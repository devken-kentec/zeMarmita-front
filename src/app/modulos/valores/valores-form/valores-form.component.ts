import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../shared/global.service';
import { ValoresService } from './../shared/valores.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Valores } from '../shared/valores';

@Component({
  selector: 'app-valores-form',
  templateUrl: './valores-form.component.html',
  styleUrls: ['./valores-form.component.css']
})
export class ValoresFormComponent implements OnInit {

  valoresForm: FormGroup;

  constructor(private fb:FormBuilder,
              private valoresService: ValoresService,
              private globalService: GlobalService,
              private route: ActivatedRoute) {
    this.valoresForm = this.fb.group({
        id: [''],
        descricao: [''],
        valor: [''],
        status: ['']
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.listarUmValor(routeParams['id']);
  }

  listarUmValor(id: number){
    if(id != null){
      this.valoresService.listarUmValor(id).subscribe((res: any)=>{
        this.preencherFormulario(res);
      })
    }
  }

  onSubmit(){
      let form = this.valoresForm;
      if(form.valid){
        this.valoresService.salvarAlterarValores(form.value).subscribe((success)=>{
            this.globalService.saveShow("Salvo com Sucesso!", "Valor")
        });
      }
  }

  preencherFormulario(valor: Valores){
      this.valoresForm.patchValue(valor);
  }

}
