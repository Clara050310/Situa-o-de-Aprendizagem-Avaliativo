# Piano Simples

Este projeto é um piano virtual simples desenvolvido com **HTML**, **CSS** e **JavaScript**. O objetivo é criar uma interface onde o usuário pode tocar notas de piano através do teclado ou clicando nas teclas visíveis na interface.

## Funcionalidades

- **Teclas Interativas**: Toque notas do piano clicando nas teclas ou pressionando as teclas do teclado (`a, w, s, e, d, f, t, g, y, h, u, j, k, o, p, ;`).
- **Controle de Volume**: Ajuste o volume do som através de um controle deslizante.
- **Alternar Teclas Visíveis**: Exiba ou oculte as teclas do piano com um simples clique.
- **Reatividade**: O layout e o comportamento da interface se adaptam ao tamanho da tela (responsividade).

## Como Funciona

- **HTML**: Estrutura do piano, contendo as teclas e os controles de volume e visibilidade.
- **CSS**: Estiliza o layout do piano, incluindo a aparência das teclas e a responsividade.
- **JavaScript**: Controla a lógica do piano:
  - Toca uma nota correspondente à tecla pressionada (seja no teclado ou clicando nas teclas visíveis).
  - Controla o volume do áudio.
  - Alterna a visibilidade das teclas.

## Estrutura de Arquivos

O projeto contém os seguintes arquivos:

- `index.html`: Arquivo principal que contém a estrutura da página.
- `style.css`: Arquivo CSS com os estilos para o piano e os controles.
- `script.js`: Arquivo JavaScript que contém a lógica para tocar as notas, ajustar o volume e alternar a visibilidade das teclas.
- **tunes/**: Pasta com os arquivos de áudio (`.wav`) para cada nota do piano.
