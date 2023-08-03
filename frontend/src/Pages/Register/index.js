import React, {useState} from "react";
import { Container, Form, SubContainerSign } from "./styles";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { validateEmail, validatePassword, validateName, validateConfirmPassword } from "../../Utils/validators";
import UserService from "../../Services/UserService";
import { NavLink, useNavigate } from "react-router-dom";

const userServive = new UserService()

const Register = () => {
 const [loading, setLoading] = useState()
 const [form, setForm] = useState([])
 const navigate = useNavigate()

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        setLoading(true) //usuário clicou e está carregando
        const { data } = await userServive.register({
            name: form.name,
            email: form.email,
            password: form.password,
        })
        if (data) {
          const responseLogin = await userServive.login({
            email: form.email,
            password: form.password
          })
          if (responseLogin === true) {
            alert('Usuário cadastrado com Sucesso')
            navigate('/home')
          }
        }
        setLoading(false)
    }
    catch (err) {
        alert('Algo deu errado' + err)
    }
}

const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const validateInput = () => {
    return validateEmail(form.email) 
    && validatePassword(form.password)
    && validateConfirmPassword(form.password, form.validatePassword)
    && validateName(form.name)
  }

  return (
    <Container>
      <Form>
        <h1>Faça o seu Cadastro</h1>
        <Input
          name='name'
          placeholder='Digite o seu nome'
          onChange={handleChange}
          type='text'
        />
        <Input
          name='email'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <Input
          name='password'
          placeholder='Digite a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Input
          name='validatePassword'
          placeholder='Confirme a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Button
          type='submit'
          text='Efetuar Cadastro!'
          onClick={handleSubmit}
          disabled={loading === true || !validateInput()}
        />
        <SubContainerSign>
          <p>Já possui conta?</p>
          <NavLink to="*">Login</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
    
  )
}











export default Register;