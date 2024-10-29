document.getElementById('calculateSleepBtn').addEventListener('click', function() {
    const sleepTimeInput = document.getElementById('sleepTime').value;
    if (!sleepTimeInput) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese la hora de dormir.'
        });
        return;
    }

    const [hours, minutes] = sleepTimeInput.split(':').map(Number);
    const sleepTime = new Date();
    sleepTime.setHours(hours);
    sleepTime.setMinutes(minutes);

    // Horas de despertar recomendadas
    const recommendedWakeTimes = [];
    const notRecommendedWakeTimes = [];

    for (let cycles = 5; cycles <= 6; cycles++) {
        const wakeTime = new Date(sleepTime.getTime() + cycles * 90 * 60000); // 90 minutos por ciclo
        recommendedWakeTimes.push(wakeTime);
    }

    // Horas de despertar no recomendadas
    const nonRecommendedCycles = [7, 8]; // Ejemplo de ciclos no recomendados
    for (let cycles of nonRecommendedCycles) {
        const wakeTime = new Date(sleepTime.getTime() + cycles * 90 * 60000); // 90 minutos por ciclo
        notRecommendedWakeTimes.push(wakeTime);
    }

    const resultPanel = document.getElementById('resultPanel');
    resultPanel.style.display = 'block';
    const wakeUpTimesDiv = document.getElementById('wakeUpTimes');
    wakeUpTimesDiv.innerHTML = ''; // Limpiar resultados anteriores

    // Mostrar horarios recomendados
    for (let wakeTime of recommendedWakeTimes) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'card-result', 'recommended');
        card.innerHTML = `
            <div class="result-label">Recomendado</div>
            <p>${wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        `;
        wakeUpTimesDiv.appendChild(card);
    }

    // Mostrar horarios no recomendados
    for (let wakeTime of notRecommendedWakeTimes) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'card-result', 'not-recommended');
        card.innerHTML = `
            <div class="result-label">No Recomendado</div>
            <p>${wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        `;
        wakeUpTimesDiv.appendChild(card);
    }

    // Consejo adicional
    document.getElementById('sleepAdvice').innerText = 'Se recomienda dormir entre 7 y 9 horas para un descanso óptimo.';
});

// Botón de limpiar
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('sleepTime').value = '';
    document.getElementById('wakeUpTimes').innerHTML = '';
    document.getElementById('resultPanel').style.display = 'none';
});