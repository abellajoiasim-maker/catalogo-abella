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

// 🔥 ATUALIZA TOTAL
function atualizarBarra(){

 let total = 0;

 carrinho.forEach(i=>{
  total += i.price * i.quantidade;
 });

 const el = document.getElementById("totalBar");
 if(el){
  el.innerText = "R$ " + total.toFixed(2);
 }
}
