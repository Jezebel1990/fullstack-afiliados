import React from "react";
import { Container, Form } from "./styles";
import Input from "../../Components/Input";
import Button from "../../Components/Button";


const Login = () => {


   const handleChange = (event) => {
    console.log('Digitando...', event.target.name, event.target.value)
   }



    return (
    <Container>
     <Form>
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
        />
        <h1>Já estuda aqui?</h1>
        <div>
          <p>Não possui conta?</p>
          <a>Cadastrar</a>
        </div>
        </Form>
        </Container>
    )
}
export default Login;