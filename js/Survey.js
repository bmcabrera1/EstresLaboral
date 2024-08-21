function calculateStress(event) {
    if (event) {
        event.preventDefault();
    }
    
    const form = document.getElementById('surveyForm');
    const formData = new FormData(form);
    let totalScore = 0;

    for (let value of formData.values()) {
        totalScore += parseInt(value, 10);
    }

    let resultText = '';
    if (totalScore <= 0){
        resultText = 'Por favor selecciona una opcion';
    }
    if (totalScore >= 1) {
        resultText = 'Tu nivel de estrés es bajo.';
    } else if (totalScore <= 5) {
        resultText = 'Tu nivel de estrés es moderado.';
    } else {
        resultText = 'Tu nivel de estrés es alto.';
    }

    document.getElementById('result').innerText = resultText;

    // Muestra el grid
    document.getElementById('grid').classList.remove('hidden');
}
