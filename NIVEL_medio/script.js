document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const startButton = document.getElementById("start");
    const pauseButton = document.getElementById("pause");
    const resetButton = document.getElementById("reset");
    const historyList = document.getElementById("history");
    const timeInput = document.getElementById("timeInput");
    const saveHistoryButton = document.getElementById("saveHistory");
    const toggleThemeButton = document.getElementById("toggleTheme");

    let timer;
    let timeLeft = 60;
    let running = false;
    let startTime = null;
    let history = JSON.parse(localStorage.getItem("timerHistory")) || [];

    // Atualiza o display com o tempo formatado
    function updateDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Adiciona entradas no histórico
    function addHistoryEntry(action) {
        const now = new Date();
        const start = startTime ? startTime : now;
        const duration = Math.floor((now - start) / 1000);
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const entry = `${start.toLocaleString()} - ${action} - Duração: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        history.push(entry);
        localStorage.setItem("timerHistory", JSON.stringify(history));
        loadHistory();
    }

    // Carrega o histórico
    function loadHistory() {
        if (historyList) {
            historyList.innerHTML = "";
            history.forEach(entry => {
                const listItem = document.createElement("li");
                listItem.textContent = entry;
                historyList.appendChild(listItem);
            });
        }
    }

    // Inicia o temporizador
    function startTimer() {
        if (!running) {
            running = true;
            startTime = new Date();
            addHistoryEntry("Iniciado");
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    running = false;
                    addHistoryEntry("Tempo esgotado");
                    alert("Tempo esgotado!");
                    // Notificação sonora
                    const audio = new Audio('https://www.soundjay.com/button/beep-07.wav');
                    audio.play();
                }
            }, 1000);
        }
    }

    // Pausa o temporizador
    function pauseTimer() {
        if (running) {
            clearInterval(timer);
            running = false;
            addHistoryEntry("Pausado");
        }
    }

    // Reinicia o temporizador
    function resetTimer() {
        clearInterval(timer);
        running = false;
        timeLeft = parseInt(timeInput.value) || 60;
        updateDisplay();
        addHistoryEntry("Reiniciado");
    }

    // Alterna entre o modo claro e escuro
    toggleThemeButton?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        document.getElementById("timer-container").classList.toggle("dark-mode");
        document.getElementById("display").classList.toggle("dark-mode");
        const currentTheme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", currentTheme);
    });

    // Salva o histórico e limpa os dados
    saveHistoryButton?.addEventListener("click", () => {
        localStorage.setItem("timerHistory", JSON.stringify([]));
        history = [];
        loadHistory();
        alert("Histórico salvo e limpo!");
    });

    // Carregar o tema salvo
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("timer-container").classList.add("dark-mode");
        document.getElementById("display").classList.add("dark-mode");
    }

    // Adicionando eventos aos botões
    startButton?.addEventListener("click", startTimer);
    pauseButton?.addEventListener("click", pauseTimer);
    resetButton?.addEventListener("click", resetTimer);

    updateDisplay();
    loadHistory();
});
