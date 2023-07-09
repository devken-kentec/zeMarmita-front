import { GlobalService } from './../../shared/global.service';
import { UsuarioService } from './../../usuario/shared/usuario.service';
import { Router } from '@angular/router';
import { HomeService } from './../share/home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemCardapioService } from './../../item-cardapio/shared/item-cardapio.service';
import { ItemCardapio } from './../../item-cardapio/shared/item-cardapio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.css']
})
export class HomeFormComponent implements OnInit {

  data = new Date();
  dias = new Array('Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado');
  meses = new Array('Janeiro', 'Fevereio', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro');
  diaSemana: string = "";
  dia: string = "";
  mes: string = "";
  ano: string = "";
  parte1: boolean = true;
  parte2: boolean = false;
  itensCardapio: ItemCardapio[] = [];
  usuarioForm: FormGroup;
  validarSenha: boolean = false;
  senhaDefinida: string = "";
  gravado: boolean = false;
  senha: string = "";

  constructor(private itemCardapioService: ItemCardapioService,
              private fb: FormBuilder,
              private homeService: HomeService,
              private router: Router,
              private globalService: GlobalService) {
                this.usuarioForm = this.fb.group({
                    nome: ['', [Validators.required]],
                    sobrenome: [''],
                    cep: [''],
                    telefone: ['', [Validators.required]],
                    endereco: ['', [Validators.required]],
                    complemento: [''],
                    email: [''],
                    senha: ['',[Validators.required]],
                    testarSenha: ['']
              });
  }

  ngOnInit(): void {
    this.chamarData();
    this.listarCardapioDiaSemana();
  }

  public chamarData(){
    this.diaSemana = this.dias[this.data.getDay()];
    this.dia = this.data.getDate().toString();
    this.mes =  this.meses[this.data.getMonth()];
    this.ano = this.data.getFullYear().toString();
  }


  public criarConta(){
    this.parte1 = !this.parte1;
  }

  public voltar(){
    this.parte1 = !this.parte1;
  }

  public onSubmit(){
    let form = this.usuarioForm;
    if(form.valid){
      this.senhaDefinida = form.get('senha')?.value;
      this.homeService.salvarUsuario(form.value).subscribe((success)=>{
         this.gravado = !this.gravado;
         (error: any) => { this.globalService.warningShow("já esta sendo Utilizada","Esta Senha,")}
      });
    }
    form.reset();
  }

  public listarCardapioDiaSemana(){
    this.itemCardapioService.listarCardapioDiaSemana(this.diaSemana).subscribe(
      res => this.itensCardapio = res
    );
  }

  public limparValidacaoSenhas(){
      this.usuarioForm.get('senha')?.setValue("");
      this.usuarioForm.get('testarSenha')?.setValue("");
      if(this.validarSenha){
          this.validarSenha = !this.validarSenha;
      }
  }

  public testarSenhas(){
    let senha = this.usuarioForm.get('senha')?.value;
    let repetirSenha = this.usuarioForm.get('testarSenha')?.value;
    if(senha != repetirSenha){
      this.validarSenha = !this.validarSenha;
      setTimeout(()=>{
        this.limparValidacaoSenhas()},
        2000);
    }
  }

  public logar(){
    this.homeService.buscarUsuarioPorSenha(this.senha).subscribe((res: any)=>{
      this.router.navigate(['/usuario/area/', res.id])
    });
  }
}
