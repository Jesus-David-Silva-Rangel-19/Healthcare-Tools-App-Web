document.addEventListener('DOMContentLoaded', function () {
    // Evento para el botón de calcular IMC
    document.getElementById('calculateBtn').addEventListener('click', function () {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese valores válidos para el peso y la altura.',
            });
            return;
        }

        const bmi = weight / (height * height);
        document.getElementById('result').textContent = `IMC: ${bmi.toFixed(2)}`;

        let classification = '';
        if (bmi < 18.5) {
            classification = 'Bajo peso';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            classification = 'Peso normal';
        } else if (bmi >= 25 && bmi < 29.9) {
            classification = 'Sobrepeso';
        } else {
            classification = 'Obesidad';
        }
        document.getElementById('classification').textContent = `Clasificación: ${classification}`;
    });

    // Evento para el botón de limpiar
    document.getElementById('clearBtn').addEventListener('click', function () {
        // Limpiar los valores de los inputs y resultados
        document.getElementById('weight').value = '';
        document.getElementById('height').value = '';
        document.getElementById('result').textContent = '';
        document.getElementById('classification').textContent = '';

        // Mostrar mensaje de confirmación
        Swal.fire({
            icon: 'success',
            title: 'Limpiado',
            text: 'Los campos se han limpiado correctamente.',
        });
    });
});