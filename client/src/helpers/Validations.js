const validations = {

  register: (newRecord) => {
    let errors = {};

    if (!newRecord.username) {errors.username = '• Username is required.'; }

    if (!newRecord.name) { errors.name = '• Name is required.'; }
    else if (/(?=.*[0-9])/.test(newRecord.name)) errors.name = '• Ingresa un nombre valido';

    if (!newRecord.last_name) { errors.last_name = '• Last Name is required.'; }
    else if (/(?=.*[0-9])/.test(newRecord.last_name)) errors.last_name = '• Ingresa un apellido valido';

    if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(newRecord.password))) {
      errors.password = '• Las contraseñas deben contener al menos 8 caracteres, un número y una letra.';
    }

    if (!newRecord.password) {errors.password = '•La contraseña es requerida.';}
    
    if (!newRecord.passwordConfirm) { errors.passwordConfirm = "• Confirma la contraseña."; }

    if (newRecord.password !== newRecord.passwordConfirm) {errors.passwordConfirm = "• La contraseñaas no coinciden.";}

    if (!/\S+@\S+\.\S+/.test(newRecord.email)) {errors.email = '• Correo no valido.';}

    if (!newRecord.email) {errors.email = '• El correo es requerido.';}

    return errors;
  },

  
};

export default validations;
