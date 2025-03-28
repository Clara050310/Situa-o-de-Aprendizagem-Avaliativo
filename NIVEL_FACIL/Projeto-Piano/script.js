// Seleção de todos os elementos com a classe 'key' dentro da classe 'piano-keys'
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      // Seleção do controle de volume
      volumeSlider = document.querySelector(".volume-slider input"),
      // Seleção do checkbox para mostrar/ocultar as teclas
      keysCheckbox = document.querySelector(".keys-checkbox input");

// Array para armazenar todas as teclas do piano (notas)
let allKeys = [],
    // Criação de um objeto de áudio que será utilizado para tocar as notas
    audio = new Audio(`tunes/a.wav`); 

// Função para tocar a nota quando uma tecla é pressionada
const playTune = (key) => {
    // Define o caminho do arquivo de áudio conforme a tecla pressionada
    audio.src = `tunes/${key}.wav`;  
    // Reproduz o áudio
    audio.play();  

    // Seleciona a tecla visualmente ativa baseada no 'data-key'
    const clickedKey = document.querySelector(`[data-key="${key}"]`); 
    // Adiciona a classe 'active' para aplicar o efeito visual de "pressionada"
    clickedKey.classList.add("active"); 
    // Remove a classe 'active' após 150ms para simular o efeito de soltar a tecla
    setTimeout(() => { 
        clickedKey.classList.remove("active");
    }, 150);
}

// Adiciona os eventos de clique para todas as teclas do piano
pianoKeys.forEach(key => {
    // Armazena a tecla correspondente ao 'data-key' de cada tecla
    allKeys.push(key.dataset.key);
    // Adiciona um evento de clique que chama a função 'playTune' com a tecla correspondente
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// Função para alterar o volume do áudio com base no controle deslizante
const handleVolume = (e) => {
    audio.volume = e.target.value;  // Define o volume conforme o valor do slider
}

// Função para mostrar ou esconder as teclas do piano
const showHideKeys = () => {
    // Para cada tecla, alterna a classe 'hide' (esconde ou mostra)
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

// Função para detectar a tecla pressionada no teclado
const pressedKey = (e) => {
    // Verifica se a tecla pressionada está na lista de teclas válidas
    if(allKeys.includes(e.key)) playTune(e.key); // Chama 'playTune' se a tecla for válida
}

// Adiciona o evento para mostrar/esconder as teclas quando o checkbox for alterado
keysCheckbox.addEventListener("click", showHideKeys);
// Adiciona o evento para alterar o volume quando o slider for ajustado
volumeSlider.addEventListener("input", handleVolume);
// Adiciona o evento para capturar as teclas pressionadas no teclado
document.addEventListener("keydown", pressedKey);
