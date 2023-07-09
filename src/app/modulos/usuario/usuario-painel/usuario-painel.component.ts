import { BebidaService } from './../../bebida/shared/bebida.service';
import { ItemService } from './../../item/shared/item.service';
import { ValoresService } from './../../valores/shared/valores.service';
import { GlobalService } from './../../shared/global.service';
import { PedidoItemRetorno } from './../../pedido/shared/pedido-item-retorno';
import { PedidoService } from '../../pedido/shared/pedido.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemCardapioService } from './../../item-cardapio/shared/item-cardapio.service';
import { UsuarioService } from './../shared/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemCardapio } from '../../item-cardapio/shared/item-cardapio';
import { Pedido } from '../../pedido/shared/pedido';
import { Valores } from '../../valores/shared/valores';
import { Item } from '../../item/shared/item';
import { Bebida } from '../../bebida/shared/bebida';

@Component({
  selector: 'app-usuario-painel',
  templateUrl: './usuario-painel.component.html',
  styleUrls: ['./usuario-painel.component.css'],
  preserveWhitespaces: true
})
export class UsuarioPainelComponent implements OnInit {

  id: number = 0
  nome: string = "";
  cep: string = "";
  email: string = "";
  endereco: string = "";
  role: string = "";
  senha: string = "";
  sobrenome: string = "";
  status: string = "";
  telefone: string = "";
  escolharItensMarmita: boolean = false;
  btnFecharPedido: boolean = false;
  data = new Date();
  dias = new Array('Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira','Sábado');
  diaSemana: string = "";
  pedidoForm: FormGroup;
  incluirPedidoForm: FormGroup;
  bebidaForm: FormGroup;
  numeroPedido: number = 0;
  quant: number = 0;
  precoUnitario: any;
  valorTotal: any;
  descricao: string = "Marmita";
  itens: any = "";
  obs: string = "";
  itensCardapio: ItemCardapio[] = [];
  pedidos: Pedido[] =[];
  pedidosItemRetorno: PedidoItemRetorno[] = [];
  valores: Valores[] = [];
  items: Item[] = [];
  bebidas: Bebida[] = [];
  statusPagamento: string = "";
  tipoPagamento: string = "";
  mostrarPedirPedidos: boolean = false;
  somadorBebida: number = 0;
  valorBebidaFechamento: number = 0;

  constructor(private route: ActivatedRoute,
              private usuarioService: UsuarioService,
              private itemCardapioService: ItemCardapioService,
              private itemService: ItemService,
              private fb: FormBuilder,
              private pedidoService: PedidoService,
              public globalService: GlobalService,
              public valoresService: ValoresService,
              private router: Router,
              private bebidaService: BebidaService) {

                this.pedidoForm = this.fb.group({
                  valorMarmita: ['',[Validators.required]],
                  itemDescricao: ['']
                });

                this.bebidaForm = this.fb.group({
                  idBebida: ['',[Validators.required]],
                  quantidade: ['',[Validators.required]]
                });

                this.incluirPedidoForm = this.fb.group({
                  quantidade: [''],
                  descricao: [''],
                  itens: [''],
                  precoUnitario: [''],
                  precoTotal: [''],
                  observacao: [''],
                  tipoPagamento: [''],
                  retiradaProduto: [''],
                  idPedido: ['']
                });
              }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.pegarUsuario(routeParams['id']);
    this.chamarData();
    this.listarValoresAtivo();
  }

  public chamarData(){
    this.diaSemana = this.dias[this.data.getDay()];
  }

  public pegarUsuario(id: number){
    if(id != null){
      this.mostrarUm(id);
      this.mostrarlistaPedidosUsuarios(id);
    }
  }

  public mostrarUm(id: number){
    this.usuarioService.mostraUm(id).subscribe((res: any)=>{
         this.id = res.id,
         this.nome = res.nome,
         this.cep = res.cep,
         this.email = res.email,
         this.endereco = res.endereco,
         this.role = res.role,
         this.senha = res.senha,
         this.sobrenome = res.sobrenome,
         this.status = res.status
         this.telefone = res.telefone
    });
  }

  public fazerPedido(){
    this.mostrarPedirPedidos = !this.mostrarPedirPedidos;
  }

  public pedirBebidas(pedido: number){
    this.somadorBebida = 0;
    this.numeroPedido = pedido;
    this.listarBebidasCombo();
    this.listarBebidas(this.numeroPedido);
    this.somarValorBebidasPorPedido(this.numeroPedido);
  }

  public listarBebidasCombo(){
      this.itemService.listarBebidas().subscribe(
          res => this.items = res
      );
  }

  public listarBebidas(pedido: number){
    this.bebidaService.buscarBebidasPorPedido(pedido).subscribe((res: any)=>{
           this.bebidas = res
    });
  }

  public somarValorBebidasPorPedido(pedido: number){
    this.bebidaService.somarValoresBebidaPorPedido(pedido).subscribe((res: any)=>{
        this.somadorBebida = res
    });
  }

  public somarValorBebidasFechamento(pedido: number){
    this.bebidaService.somarValoresBebidaPorPedido(pedido).subscribe((res: any)=>{
        this.valorBebidaFechamento = res
    });
  }

  public excluirBebida(idBebida: number){
    this.bebidaService.excluirBebida(idBebida).subscribe((res: any)=>{
        this.globalService.removeShow("Retirado com Sucesso","Bebida"),
        this.listarBebidas(this.numeroPedido);
        this.somarValorBebidasPorPedido(this.numeroPedido);
    })
  }

  public solicitarBebida(pedido: number){
    let idBebida: number = this.bebidaForm.get('idBebida')?.value;
    let quantidade: number = this.bebidaForm.get('quantidade')?.value;
    this.itemService.gravarPedidoBebidas(pedido, idBebida, quantidade).subscribe((res: any)=>{
        this.globalService.saveShow("Incluido com Sucesso", "Bebida!"),
        this.listarBebidas(pedido),
        this.somarValorBebidasPorPedido(pedido);
    });
    this.bebidaForm.reset();
  }

  public iniciarPedido(){
    let idUsuario = this.id;
    this.pedidoService.iniciarPedido(idUsuario).subscribe((res: any)=>{
      this.numeroPedido = res.id;
      this.escolharItensMarmita = true;
      this.listarCardapioDiaSemana();
    });
  }

  public finalizarPedido(){
    this.router.navigate(['/home']);
  }

  public listarCardapioDiaSemana(){
    this.itemCardapioService.listarCardapioDiaSemana(this.diaSemana).subscribe(
      res => this.itensCardapio = res
    );
  }

  public limparItensSelecionados(){
    this.pedidoForm.get('itemDescricao')?.setValue("");
  }

  public incluirPedido(){
    this.incluirPedidoForm.get("idPedido")?.setValue(this.numeroPedido);
    this.incluirPedidoForm.get("descricao")?.setValue(this.descricao);
    let item = this.pedidoForm.get("itemDescricao")?.value;
    this.precoUnitario = this.pedidoForm.get("valorMarmita")?.value;
    this.quant = this.incluirPedidoForm.get("quantidade")?.value;
    this.incluirPedidoForm.get("precoUnitario")?.setValue(this.precoUnitario);
    this.incluirPedidoForm.get("precoTotal")?.setValue(this.precoUnitario*this.quant);
    this.valorTotal = this.incluirPedidoForm.get("precoTotal")?.value;
    this.itens = this.incluirPedidoForm.get("itens")?.setValue(String(item));
    this.precoUnitario = this.precoUnitario.toString().replace(".",",");
    this.valorTotal = this.valorTotal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  public enviarPedido(){
    let form = this.incluirPedidoForm;
    if(form.valid){
      this.pedidoService.enviarPedido(form.value).subscribe((res:any)=>{
          this.globalService.saveShow("Incluido com Sucesso!","Pedido"),
          this.mostrarlistaPedidosUsuarios(this.id);
          this.btnFecharPedido = true;
      });
    }
    form.reset();
    this.incluirPedidoForm.get("itens")?.setValue("");
  }

  public mostrarlistaPedidosUsuarios(idUsuario: number){
    this.pedidoService.mostrarListaPedidosUsuarios(idUsuario).subscribe((res: any)=> {
        this.pedidosItemRetorno = res
    });
  }

  public cancelarPedido(id: number){
    this.pedidoService.cancelarPedido(id).subscribe((res:any)=>{
          this.mostrarlistaPedidosUsuarios(this.id)
    });
  }

  public editarPedido(pedidoItemRetorno: PedidoItemRetorno){
    this.numeroPedido = pedidoItemRetorno.idPedido;
    this.statusPagamento = pedidoItemRetorno.statusPagamento;
    this.tipoPagamento = pedidoItemRetorno.tipoPagamento;
  }

  public passarNumeroPedido(numeroPedido: number){
    this.numeroPedido = numeroPedido;
  }

  public fecharPedido(idPedido: number){
    this.pedidoService.somarValorPedido(idPedido).subscribe((res:any)=>{
      this.mostrarlistaPedidosUsuarios(this.id)
    });
  }

  public listarValoresAtivo(){
    this.valoresService.listarValoresAtivo().subscribe(
      res => this.valores = res
    );
  }

  public somarPedidoBebida(valorPedido: number, valorBebida: number): number{
    let valorTotal = valorPedido + valorBebida
    return valorTotal;
  }
}
