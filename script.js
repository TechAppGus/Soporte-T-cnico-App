// Script para manejar el formulario y el menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Manejar el menú hamburguesa
    hamburgerBtn.addEventListener('click', () => {
        navMenu.querySelector('ul').style.display = navMenu.querySelector('ul').style.display === 'flex' ? 'none' : 'flex';
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar recarga de página

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Convertir a objeto

        // Validación básica
        if (!data.name || !data.email || !data.message) {
            formMessage.textContent = 'Error: Por favor, completa los campos requeridos.';
            formMessage.style.color = 'red';
            return;
        }

        if (!validateEmail(data.email)) {
            formMessage.textContent = 'Error: Email inválido.';
            formMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.textContent = 'Éxito: Tu mensaje se envió correctamente.';
                formMessage.style.color = 'green';
                form.reset(); // Limpiar el formulario
            } else {
                formMessage.textContent = 'Error: No se pudo enviar el mensaje.';
                formMessage.style.color = 'red';
            }
        } catch (error) {
            formMessage.textContent = 'Error: Problema con la conexión.';
            formMessage.style.color = 'red';
        }
    });

    // Función de validación de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});