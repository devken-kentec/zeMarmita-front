export interface PedidoItemRetorno {
  id: number;
  statusPedidoItem: string;
  quantidade: number;
  descricao: string;
  itens: string;
  precoUnitario: number;
  precoTotal: number;
  observacao: string;
  idPedido: number;
  statusPedido: string;
  tipoPagamento: string;
  statusPagamento: string;
  retiradaProduto: string;
  valorPedido: number;
  valorBebida: number;
  taxaEntraga: number;
  descontos: number;
  dataPedido: string;
  dataEntrega: string;
  foto: string;
  idUsuario: number;
  statusUsuario: string;
  nome: string;
  sobrenome: string;
  endereco: string;
  complemento: string;
  email: string;
  cep: string;
  telefone: string;
  role: string;
}
