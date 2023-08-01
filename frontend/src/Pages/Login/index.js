import React, {useState} from "react";
import { Container, Form } from "./styles";
import Input from "../../Components/Input";
import Button from "../../Components/Button";


const Login = () => {
 const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        event.preventDefault();
    try {
        setLoading(true) //usuário clicou e está carregando
        alert('Login')
        setLoading(false)
    }
    catch (err) {
     alert('Algo deu errado' + err)
    }
}

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
        onClick={handleSubmit}
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