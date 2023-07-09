export interface PedidoItem {
    id: number;
    quantidade: number
    descricao: string;
    itens: string;
    precoUnitario: number;
    precoTotal: number;
    observacao: string;
    tipoPagamento: string;
    retiradaProduto: string;
    idPedido: number;
}
