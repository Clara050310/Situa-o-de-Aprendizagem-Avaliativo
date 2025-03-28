document.addEventListener("DOMContentLoaded", function () { 
    // Espera o carregamento completo do conteúdo HTML antes de executar o código

    // Obtém os elementos HTML que serão manipulados pelo JavaScript
    const display = document.getElementById("display"); // Exibe o tempo no temporizador
    const startButton = document.getElementById("start"); // Botão para iniciar o temporizador
    const pauseButton = document.getElementById("pause"); // Botão para pausar o temporizador
    const resetButton = document.getElementById("reset"); // Botão para reiniciar o temporizador
    const historyList = document.getElementById("history"); // Lista que exibe o histórico de ações do temporizador
    const timeInput = document.getElementById("timeInput"); // Campo de entrada onde o usuário define o tempo do temporizador
    const saveHistoryButton = document.getElementById("saveHistory"); // Botão para salvar e limpar o histórico
    const toggleThemeButton = document.getElementById("toggleTheme"); // Botão para alternar entre os modos claro e escuro

    let timer; // Armazena o temporizador em execução
    let timeLeft = 60; // Tempo inicial do temporizador (em segundos)
    let running = false; // Indica se o temporizador está em execução
    let startTime = null; // Armazena o tempo de início do temporizador
    let history = JSON.parse(localStorage.getItem("timerHistory")) || []; // Obtém o histórico armazenado no localStorage (se houver)

    // Função que atualiza o display com o tempo formatado
    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60); // Converte os segundos restantes em minutos
        let seconds = timeLeft % 60; // Obtém os segundos restantes após os minutos
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; 
        // Exibe o tempo no formato MM:SS
    }

    // Função que adiciona entradas no histórico de ações do temporizador
    function addHistoryEntry(action) {
        const now = new Date(); // Pega o horário atual
        const start = startTime ? startTime : now; // Se o temporizador já foi iniciado, usa o horário de início, caso contrário, usa o horário atual
        const duration = Math.floor((now - start) / 1000); // Calcula a duração da ação em segundos
        const minutes = Math.floor(duration / 60); // Converte a duração em minutos
        const seconds = duration % 60; // Obtém os segundos restantes após os minutos
        // Cria a entrada do histórico com o horário, ação e duração
        const entry = `${start.toLocaleString()} - ${action} - Duração: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        history.push(entry); // Adiciona a entrada ao histórico
        localStorage.setItem("timerHistory", JSON.stringify(history)); // Salva o histórico no localStorage
        loadHistory(); // Atualiza o histórico exibido
    }

    // Função para carregar o histórico e exibi-lo na página
    function loadHistory() {
        if (historyList) { // Se a lista de histórico existir
            historyList.innerHTML = ""; // Limpa a lista de histórico
            history.forEach(entry => { // Para cada entrada do histórico
                const listItem = document.createElement("li"); // Cria um item de lista
                listItem.textContent = entry; // Define o conteúdo do item de lista
                historyList.appendChild(listItem); // Adiciona o item à lista
            });
        }
    }

    // Função que inicia o temporizador
    function startTimer() {
        if (!running) { // Se o temporizador não estiver em execução
            timeInput.value === "" ? null : timeLeft = timeInput.value; // Se o campo de tempo não estiver vazio, usa o valor definido
            running = true; // Define que o temporizador está em execução
            startTime = new Date(); // Armazena o horário de início
            addHistoryEntry("Iniciado"); // Adiciona a entrada "Iniciado" ao histórico
            timer = setInterval(() => { // Inicia o temporizador com intervalo de 1 segundo
                if (timeLeft > 0) { // Se o tempo restante for maior que 0
                    timeLeft--; // Diminui o tempo restante em 1 segundo
                    updateDisplay(); // Atualiza o display com o novo tempo
                } else { // Se o tempo restante for 0 ou menor
                    clearInterval(timer); // Para o temporizador
                    running = false; // Define que o temporizador não está mais em execução
                    addHistoryEntry("Tempo esgotado"); // Adiciona a entrada "Tempo esgotado" ao histórico
                    alert("Tempo esgotado!"); // Exibe um alerta informando que o tempo acabou
                    // Notificação sonora
                    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
                    audio.play(); // Toca o som de notificação
                }
            }, 1000); // Intervalo de 1 segundo
        }
    }

    // Função que pausa o temporizador
    function pauseTimer() {
        if (running) { // Se o temporizador estiver em execução
            clearInterval(timer); // Para o temporizador
            running = false; // Define que o temporizador não está mais em execução
            addHistoryEntry("Pausado"); // Adiciona a entrada "Pausado" ao histórico
        }
    }

    // Função que reinicia o temporizador
    function resetTimer() {
        clearInterval(timer); // Para o temporizador
        running = false; // Define que o temporizador não está mais em execução
        timeLeft = parseInt(timeInput.value) || 60; // Define o tempo de reinício com base no valor fornecido, ou 60 segundos como padrão
        updateDisplay(); // Atualiza o display com o tempo reiniciado
        addHistoryEntry("Reiniciado"); // Adiciona a entrada "Reiniciado" ao histórico
    }

    // Função para alternar entre o modo claro e escuro
    toggleThemeButton?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode"); // Alterna a classe "dark-mode" no body
        document.getElementById("timer-container").classList.toggle("dark-mode"); // Alterna a classe "dark-mode" no contêiner do temporizador
        document.getElementById("display").classList.toggle("dark-mode"); // Alterna a classe "dark-mode" no display
        const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light"; // Verifica se o modo escuro está ativado
        localStorage.setItem("theme", currentTheme); // Salva o tema no localStorage
    });

    // Função para salvar e limpar o histórico
    saveHistoryButton?.addEventListener("click", () => {
        localStorage.setItem("timerHistory", JSON.stringify([])); // Limpa o histórico no localStorage
        history = []; // Limpa o array do histórico
        loadHistory(); // Atualiza a lista de histórico na página
        alert("Histórico salvo e limpo!"); // Exibe um alerta
    });

    // Carregar o tema salvo no localStorage, se houver
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") { // Se o tema salvo for o modo escuro
        document.body.classList.add("dark-mode"); // Adiciona a classe "dark-mode" ao body
        document.getElementById("timer-container").classList.add("dark-mode"); // Adiciona a classe "dark-mode" ao contêiner
        document.getElementById("display").classList.add("dark-mode"); // Adiciona a classe "dark-mode" ao display
    }

    // Adiciona eventos de clique aos botões
    startButton?.addEventListener("click", startTimer); // Inicia o temporizador ao clicar no botão "Iniciar"
    pauseButton?.addEventListener("click", pauseTimer); // Pausa o temporizador ao clicar no botão "Pausar"
    resetButton?.addEventListener("click", resetTimer); // Reinicia o temporizador ao clicar no botão "Reiniciar"

    // Atualiza o display inicial e carrega o histórico
    updateDisplay();
    loadHistory();
});
