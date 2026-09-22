function calc_total() {
  var quantidade = document.getElementById("cqtd");
  var total = document.getElementById("ctot");
  if (!quantidade || !total) {
    return;
  }
  var qtd = parseInt(quantidade.value, 10);
  var formato = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  total.textContent = isNaN(qtd) || qtd <= 0 ? formato.format(0) : formato.format(qtd * 1500);
}

(function () {
  var formulario = document.getElementById("fcontato");
  if (formulario) {
    formulario.addEventListener("input", calc_total);
  }
}());