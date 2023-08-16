class CaixaDaLanchonete {
    constructor(){
        this.produtos = new Map();
        this.produtos.set('cafe',3.00);
        this.produtos.set('chantily',1.50);
        this.produtos.set('suco',6.20);
        this.produtos.set('sanduiche',6.50);
        this.produtos.set('queijo',2.00);
        this.produtos.set('salgado',7.25);
        this.produtos.set('combo1',9.50);
        this.produtos.set('combo2',7.50);

        this.extras = new Map();
        this.extras.set('chantily','cafe');
        this.extras.set('queijo','sanduiche');

        this.formaPagamento = new Map();
        this.formaPagamento.set('dinheiro',0.95);
        this.formaPagamento.set('debito',1);
        this.formaPagamento.set('credito',1.03);
    }
    calcularValorDaCompra(metodoDePagamento, itens) {
        var produtos = this.produtos;
        var extras = this.extras;
        var formaPagamento = this.formaPagamento
        if (typeof metodoDePagamento != 'string'){
            //return 'Forma de pagamento deve ser uma string';
            return 'Forma de pagamento inválida!';
        }
        if (!(formaPagamento.has(metodoDePagamento))){
            return 'Forma de pagamento inválida!';
        }
        if (itens.length == 0){
            return 'Não há itens no carrinho de compra!';
        }
        //separa os itens
        var itemMap = new Map();
        var itemCod = '';
        var qnt = '';
        for (var item of itens){
            var tupla = item.split(',');
            if (tupla.length != 2){
                //return 'Erro na formatação dos itens';
                return 'Item inválido!'
            }
            itemCod = tupla[0];
            if (!(produtos.has(itemCod))){
                return 'Item inválido!';
            }
            qnt = tupla[1];
            qnt = parseInt(qnt);
            if (isNaN(qnt) || qnt<1){
                return 'Quantidade inválida!';
            }
            itemMap.set(itemCod,qnt);
        }
        //verifica os itens extras
        for (var item of itemMap.keys()){
            if (extras.has(item)){
                if (!(itemMap.has(extras.get(item)))){
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }
        }
        //calcula o valor da compra
        var valor=0;
        for (var [item, qnt] of itemMap){
            valor += produtos.get(item)*qnt;
        }
        valor=valor*formaPagamento.get(metodoDePagamento);
        valor = valor.toFixed(2);
        valor = valor.replace('.',',');
        valor = 'R$ '+valor;
        return valor;
    }

}

export { CaixaDaLanchonete };
