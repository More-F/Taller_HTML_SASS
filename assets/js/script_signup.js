document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const resetFormBtn = document.getElementById('resetForm');
    
    // Campos del formulario
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const birthdate = document.getElementById('birthdate');
    const cellphone = document.getElementById('cellphone');
    const phone = document.getElementById('phone');
    const terms = document.getElementById('terms');
    
    // Expresiones regulares
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    const cellphoneRegex = /^(3[0-9]{9})$/; // Números colombianos: 3 seguido de 9 dígitos
    const phoneRegex = /^[0-9]{10,}$/; // Mínimo 10 dígitos
    
    // Validar nombre completo
    function validateFullname() {
        const value = fullname.value.trim();
        const errorElement = document.getElementById('fullname-error');
        
        if (!value) {
            showError(fullname, errorElement, 'El nombre completo es obligatorio');
            return false;
        }
        
        if (value.length < 3) {
            showError(fullname, errorElement, 'El nombre debe tener al menos 3 caracteres');
            return false;
        }
        
        showSuccess(fullname, errorElement);
        return true;
    }
    
    // Validar email
    function validateEmail() {
        const value = email.value.trim();
        const errorElement = document.getElementById('email-error');
        
        if (!value) {
            showError(email, errorElement, 'El correo electrónico es obligatorio');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            showError(email, errorElement, 'Por favor ingresa un correo electrónico válido');
            return false;
        }
        
        showSuccess(email, errorElement);
        return true;
    }
    
    // Validar contraseña
    function validatePassword() {
        const value = password.value;
        const errorElement = document.getElementById('password-error');
        
        if (!value) {
            showError(password, errorElement, 'La contraseña es obligatoria');
            updatePasswordRequirements(false, false, false, false);
            return false;
        }
        
        if (value.length < 8) {
            showError(password, errorElement, 'La contraseña debe tener al menos 8 caracteres');
            updatePasswordRequirements(false, false, false, false);
            return false;
        }
        
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        const hasSpecialChar = /[@$!%*?&]/.test(value);
        
        updatePasswordRequirements(value.length >= 8, hasUpperCase, hasNumber, hasSpecialChar);
        
        if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
            showError(password, errorElement, 'La contraseña no cumple con todos los requisitos');
            return false;
        }
        
        showSuccess(password, errorElement);
        return true;
    }
    
    // Actualizar requisitos de contraseña en la UI
    function updatePasswordRequirements(validLength, validUpperCase, validNumber, validSpecial) {
        document.getElementById('req-length').className = validLength ? 'valid' : '';
        document.getElementById('req-uppercase').className = validUpperCase ? 'valid' : '';
        document.getElementById('req-number').className = validNumber ? 'valid' : '';
        document.getElementById('req-special').className = validSpecial ? 'valid' : '';
    }
    
    // Validar confirmación de contraseña
    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const errorElement = document.getElementById('confirmPassword-error');
        
        if (!value) {
            showError(confirmPassword, errorElement, 'Por favor confirma tu contraseña');
            return false;
        }
        
        if (value !== password.value) {
            showError(confirmPassword, errorElement, 'Las contraseñas no coinciden');
            return false;
        }
        
        showSuccess(confirmPassword, errorElement);
        return true;
    }
    
    // Validar fecha de nacimiento
    function validateBirthdate() {
        const value = birthdate.value;
        const errorElement = document.getElementById('birthdate-error');
        
        if (!value) {
            showError(birthdate, errorElement, 'La fecha de nacimiento es obligatoria');
            return false;
        }
        
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            showError(birthdate, errorElement, 'Debes tener al menos 18 años para registrarte');
            return false;
        }
        
        showSuccess(birthdate, errorElement);
        return true;
    }
    
    // Validar celular
    function validateCellphone() {
        const value = cellphone.value.trim();
        const errorElement = document.getElementById('cellphone-error');
        
        if (!value) {
            showError(cellphone, errorElement, 'El número de celular es obligatorio');
            return false;
        }
        
        // Eliminar cualquier carácter que no sea número
        const numericValue = value.replace(/\D/g, '');
        
        if (!cellphoneRegex.test(numericValue)) {
            showError(cellphone, errorElement, 'Por favor ingresa un número de celular colombiano válido (ej: 3123456789)');
            return false;
        }
        
        showSuccess(cellphone, errorElement);
        return true;
    }
    
    // Validar teléfono fijo
    function validatePhone() {
        const value = phone.value.trim();
        const errorElement = document.getElementById('phone-error');
        
        // Es opcional, si está vacío es válido
        if (!value) {
            showSuccess(phone, errorElement);
            return true;
        }
        
        // Eliminar cualquier carácter que no sea número
        const numericValue = value.replace(/\D/g, '');
        
        if (numericValue.length < 10) {
            showError(phone, errorElement, 'El número de teléfono debe tener al menos 10 dígitos');
            return false;
        }
        
        showSuccess(phone, errorElement);
        return true;
    }
    
    // Validar términos y condiciones
    function validateTerms() {
        const errorElement = document.getElementById('terms-error');
        
        if (!terms.checked) {
            showError(terms, errorElement, 'Debes aceptar los términos y condiciones');
            return false;
        }
        
        showSuccess(terms, errorElement);
        return true;
    }
    
    // Mostrar error
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
    }
    
    // Mostrar éxito
    function showSuccess(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    }
    
    // Validar todo el formulario
    function validateForm() {
        const isFullnameValid = validateFullname();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isBirthdateValid = validateBirthdate();
        const isCellphoneValid = validateCellphone();
        const isPhoneValid = validatePhone();
        const isTermsValid = validateTerms();
        
        return isFullnameValid && isEmailValid && isPasswordValid && 
               isConfirmPasswordValid && isBirthdateValid && isCellphoneValid && 
               isPhoneValid && isTermsValid;
    }
    
    // Habilitar/deshabilitar botón de envío
    function toggleSubmitButton() {
        submitBtn.disabled = !validateForm();
    }
    
    // Event Listeners para validación en tiempo real
    fullname.addEventListener('input', () => {
        validateFullname();
        toggleSubmitButton();
    });
    
    email.addEventListener('input', () => {
        validateEmail();
        toggleSubmitButton();
    });
    
    password.addEventListener('input', () => {
        validatePassword();
        // También validar confirmación si ya tiene valor
        if (confirmPassword.value) {
            validateConfirmPassword();
        }
        toggleSubmitButton();
    });
    
    confirmPassword.addEventListener('input', () => {
        validateConfirmPassword();
        toggleSubmitButton();
    });
    
    birthdate.addEventListener('change', () => {
        validateBirthdate();
        toggleSubmitButton();
    });
    
    cellphone.addEventListener('input', () => {
        validateCellphone();
        toggleSubmitButton();
    });
    
    phone.addEventListener('input', () => {
        validatePhone();
        toggleSubmitButton();
    });
    
    terms.addEventListener('change', () => {
        validateTerms();
        toggleSubmitButton();
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Ocultar formulario y mostrar mensaje de confirmación
            form.classList.add('hidden');
            confirmationMessage.classList.remove('hidden');
        }
    });
    
    // Reiniciar formulario
    resetFormBtn.addEventListener('click', function() {
        form.reset();
        form.classList.remove('hidden');
        confirmationMessage.classList.add('hidden');
        
        // Limpiar todas las clases de validación
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => {
            message.textContent = '';
        });
        
        // Reiniciar requisitos de contraseña
        updatePasswordRequirements(false, false, false, false);
        
        // Deshabilitar botón
        submitBtn.disabled = true;
    });
});