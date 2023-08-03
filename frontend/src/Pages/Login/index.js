import React, {useState} from "react";
import { Container, Form, SubContainerSign } from "./styles";
import Input from "../../Components/Input/index";
import Button from "../../Components/Button/index";
import { validateEmail, validatePassword } from "../../Utils/validators";
import UserService from "../../Services/UserService";
import { NavLink, useNavigate } from "react-router-dom";

const userServive = new UserService()

const Login = () => {
 const [loading, setLoading] = useState()
 const [form, setForm] = useState([])
 const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
    try {
        setLoading(true) //usuário clicou e está carregando
        const response = await userServive.login(form)
        console.log('response Login', response)
        if (response === true) {
            alert('Usuário Logado com Sucesso')
            //navegar para a  Home
            navigate('/home')
        }
        setLoading(false)
    }
    catch (err) {
     alert('Algo deu errado' + err)
    }
}

   const handleChange = (event) => {
    console.log('Digitando...', event.target.name, event.target.value)
    setForm({...form, [event.target.name]: event.target.value})
    console.log('Form', form)
   }

   const validateInput = () => {
    return validateEmail(form.email) && validatePassword(form.password)
   }



    return (
    <Container>
     <Form>
     <h1>Já tem conta?</h1>
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
        <Button
        type='submit'
        text='Entrar'
        onClick={handleSubmit}
        disabled={loading === true || !validateInput()}
        />

        <SubContainerSign>
          <p>Não possui conta?</p>
          <NavLink to="register">Cadastrar</NavLink>
        </SubContainerSign>
        </Form>
        </Container>
    )
}
export default Login;