(function () {
  var itens = [
    { rotulo: 'Home', href: 'index.html', icone: '_imagens/home.png' },
    { rotulo: 'Especificações', href: 'specs.html', icone: '_imagens/especificacoes-02.jpeg' },
    { rotulo: 'Fotos', href: 'fotos.html', icone: '_imagens/fotos.png' },
    { rotulo: 'Multimídia', href: 'multimidia.html', icone: '_imagens/multimidia.png' },
    { rotulo: 'Fale conosco', href: 'fale-conosco.html', icone: '_imagens/contato.png' }
  ];

  var destino = document.querySelector('header#cabecalho');
  if (!destino) {
    return;
  }

  var atual = location.pathname.split('/').pop() || 'index.html';

  var nav = document.createElement('nav');
  nav.id = 'menu';

  var titulo = document.createElement('h1');
  titulo.textContent = 'Menu Principal';
  nav.appendChild(titulo);

  var lista = document.createElement('ul');
  itens.forEach(function (item) {
    var li = document.createElement('li');
    var link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.rotulo;
    link.setAttribute('data-icone', item.icone);
    if (link.getAttribute('href') === atual) {
      link.setAttribute('aria-current', 'page');
    }
    li.appendChild(link);
    lista.appendChild(li);
  });
  nav.appendChild(lista);

  destino.insertBefore(nav, destino.firstChild);
}());