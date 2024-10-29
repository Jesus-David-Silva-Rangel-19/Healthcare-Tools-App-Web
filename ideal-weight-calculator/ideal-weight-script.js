// Espera a que el DOM esté completamente cargado antes de asignar eventos
document.addEventListener('DOMContentLoaded', function () {
    // Evento para calcular el peso ideal
    document.getElementById('calculateIdealWeightBtn').addEventListener('click', function () {
        const height = parseFloat(document.getElementById('height').value);
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;

        // Validación de datos
        if (isNaN(height) || isNaN(age) || height <= 0 || age <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor ingrese valores válidos para la estatura y la edad.',
            });
            return;
        }

        // Cálculo del peso ideal usando la fórmula de Devine
        let idealWeight;
        if (gender === 'male') {
            idealWeight = 50 + 0.91 * (height - 152.4); // Fórmula de Devine para hombres
        } else {
            idealWeight = 45.5 + 0.91 * (height - 152.4); // Fórmula de Devine para mujeres
        }

        // Convertir la altura de cm a metros para los cálculos de IMC
        const heightInMeters = height / 100;

        // Calcular el rango de peso saludable usando IMC
        const minHealthyWeight = 18.5 * (heightInMeters * heightInMeters);
        const maxHealthyWeight = 24.9 * (heightInMeters * heightInMeters);

        // Mostrar resultado con SweetAlert
        Swal.fire({
            icon: 'success',
            title: 'Peso Ideal',
            html: `
                Su peso ideal es aproximadamente <strong>${idealWeight.toFixed(2)} kg</strong>.<br>
                Peso saludable para la estatura: <strong>${minHealthyWeight.toFixed(2)} kg - ${maxHealthyWeight.toFixed(2)} kg</strong>.
            `,
        });

        // Mostrar resultado en la página
        document.getElementById('idealWeight').innerHTML = `
            Peso Ideal: ${idealWeight.toFixed(2)} kg<br>
            Peso saludable para la estatura: ${minHealthyWeight.toFixed(2)} kg - ${maxHealthyWeight.toFixed(2)} kg
        `;
    });

    // Evento para el botón de regresar
    document.getElementById('backButton').addEventListener('click', function () {
        window.location.href = "../index.html";
    });
});