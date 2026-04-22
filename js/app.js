let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

function salvarCarrinho(){
 localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function addCarrinho(prod){
 const item = carrinho.find(i => i.id === prod.id);

 if(item){
  item.quantidade++;
 } else {
  carrinho.push({...prod, quantidade:1});
 }

 salvarCarrinho();
 atualizarBarra();
}

function removerItem(id){
 carrinho = carrinho.filter(i => i.id !== id);
 salvarCarrinho();
 atualizarBarra();
 location.reload();
}

function alterarQtd(id, delta){
 const item = carrinho.find(i => i.id === id);
 if(!item) return;

 item.quantidade += delta;

 if(item.quantidade <= 0){
  removerItem(id);
  return;
 }

 salvarCarrinho();
 atualizarBarra();
 location.reload();
}

function calcularTotal(){

 let subtotal = 0;
 carrinho.forEach(i => subtotal += i.price * i.quantidade);

 let pct =
 subtotal>=2500?20:
 subtotal>=1000?15:
 subtotal>=500?10:
 subtotal>=300?5:0;

 let desconto = subtotal * (pct/100);
 let pix = subtotal>=300 ? subtotal*0.05 : 0;

 let total = subtotal - desconto - pix;

 return {subtotal, desconto, pix, total, pct};
}

function atualizarBarra(){
 const el = document.getElementById("totalBar");
 if(!el) return;

 const {total} = calcularTotal();
 el.innerText = "R$ " + total.toFixed(2);
}
