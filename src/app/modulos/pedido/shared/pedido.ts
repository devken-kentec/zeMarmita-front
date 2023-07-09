export interface Pedido {
  id: number;
	tipoPagamento: string;
	statusPagamento: string;
	retiradaProduto: string;
	valorPedido: number;
	taxaEntraga: number;
	descontos: number;
  dataPedido: string;
	dataEntrega: string;
	foto: string;
	usuario: string;
}
