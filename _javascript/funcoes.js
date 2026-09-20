function mudaFoto(foto) {
  document.getElementById("icone").src = foto;
}

function calc_total() {
  var quantidade = document.getElementById("cqtd");
  var total = document.getElementById("ctot");
  if (!quantidade || !total) {
    return;
  }
  var qtd = parseInt(quantidade.value, 10);
  if (isNaN(qtd) || qtd <= 0) {
    total.value = "";
    return;
  }
  total.value = (qtd * 1500).toFixed(2);
}

function initNavigation() {
  var menu = document.getElementById("menu");
  var icone = document.getElementById("icone");
  if (!menu || !icone) {
    return;
  }
  icone.setAttribute("data-padrao", icone.getAttribute("src"));
  menu.addEventListener("mouseover", onNavEnter, true);
  menu.addEventListener("mouseout", onNavLeave);
  menu.addEventListener("focusin", onNavEnter, true);
  menu.addEventListener("focusout", onNavLeave);
}

function onNavEnter(event) {
  var alvo = event.target.closest("[data-icone]");
  if (alvo) {
    mudaFoto(alvo.getAttribute("data-icone"));
  }
}

function onNavLeave(event) {
  var menu = document.getElementById("menu");
  var destino = event.relatedTarget;
  if (destino && menu && menu.contains(destino)) {
    return;
  }
  var icone = document.getElementById("icone");
  if (icone) {
    mudaFoto(icone.getAttribute("data-padrao"));
  }
}

initNavigation();