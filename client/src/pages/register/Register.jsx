import React from 'react';
import { useState } from 'react';
import NotifyError from '../../components/Notify/Notify';
import validations from '../../helpers/Validations';
import styles from './register.module.css'

const Register = () => {
  
  const [errors, setErrors] = useState({});
  const [newRecord, setNewRecord] = useState({
    username: '',
    name: '',
    last_name:'',
    email: '',
    phone: '',
    password: '',
    passwordConfirm:'',
  });
  


  const handleChange = e => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
    setErrors(validations.register({ ...newRecord,[e.target.name]: e.target.value}))
}

  return (
    <div className={styles.containerRegister} >
      <form className={styles.register}>
        <div className={styles.title}> Registro</div>
        <div className={styles.containerInputs}>
          <div className={styles.InputsUno}>
            {errors.username && <NotifyError error={errors.username}/>}
            <input
              className={styles.Inputs}
              type="text"
              name='username'
              placeholder={"Nombre se usuario"}
              value={newRecord.username}
              onChange={handleChange}
            />
          </div>
          <div className={styles.InputsDos}>
            <input
              className={styles.Inputs}
              type="text"
              name='name'
              placeholder="Primer Nombre"
              value={newRecord.name}
              onChange={handleChange}
            />
            <input
              className={styles.Inputs}
              type="text"
              name='last_name'
              placeholder="Primer Apellido"
              value={newRecord.last_name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.InputsDos}>
            <input
              className={styles.Inputs}
              type="email"
              name='email'
              placeholder="Correo electronico"
              value={newRecord.email}
              onChange={handleChange}
            />
            <input
              className={styles.Inputs}
              type="number"
              name='phone'
              placeholder="Telefono"
              value={newRecord.phone}
              onChange={handleChange}
            />           
          </div>
          <div className={styles.InputsDos}>
            <input
              className={styles.Inputs}
              type="password"
              name='password'
              placeholder="Elija una contraseña"
              value={newRecord.password}
              onChange={handleChange}
            />
            <input
              className={styles.Inputs}
              type="password"
              name='passwordConfirm'
              placeholder="Confirme la contraseña"
              value={newRecord.passwordConfirm}
              onChange={handleChange}
            />           
          </div>
          <div className={styles.InputsUno}>
            <input
              className={styles.Inputs}
              type="submit"
              name='passwordConfirm'
              placeholder="Confirme la contraseña"
              value="REGISTRARSE"
              onChange={handleChange}
            />           
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
