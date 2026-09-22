(function () {
  var itens = [
    { rotulo: 'Home', href: 'index.html' },
    { rotulo: 'Especificações', href: 'specs.html' },
    { rotulo: 'Fotos', href: 'fotos.html' },
    { rotulo: 'Multimídia', href: 'multimidia.html' },
    { rotulo: 'Fale conosco', href: 'fale-conosco.html' }
  ];

  var destino = document.querySelector('#interface');
  if (!destino) {
    return;
  }

  var atual = location.pathname.split('/').pop() || 'index.html';

  var nav = document.createElement('nav');
  nav.id = 'menu';

  var titulo = document.createElement('h1');
  titulo.className = 'sr-only';
  titulo.textContent = 'Menu Principal';
  nav.appendChild(titulo);

  var lista = document.createElement('ul');
  lista.id = 'menu-lista';
  itens.forEach(function (item) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.rotulo;
    if (link.getAttribute('href') === atual) {
      link.setAttribute('aria-current', 'page');
    }
    li.appendChild(link);
    lista.appendChild(li);
  });
  nav.appendChild(lista);

  var botao = document.createElement('button');
  botao.id = 'menu-toggle';
  botao.type = 'button';
  botao.setAttribute('aria-expanded', 'false');
  botao.setAttribute('aria-controls', 'menu-lista');
  botao.setAttribute('aria-label', 'Abrir menu');
  botao.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  nav.appendChild(botao);

  destino.insertBefore(nav, destino.firstChild);

  function fechar() {
    lista.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
  }

  botao.addEventListener('click', function () {
    var aberto = lista.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    botao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  lista.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      fechar();
    }
  });

  nav.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      fechar();
    }
  });
}());