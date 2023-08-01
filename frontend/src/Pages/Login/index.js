import React from "react";
import { Container, Form } from "./styles";
import Input from "../../Components/Input";


const Login = () => {
    return (
    <Container>
     <Form>
        <Input/>
        <Input/>
        <h1>Entrar</h1>
        <div>
          <p>Não possui conta?</p>
          <a>Cadastrar</a>
        </div>
        </Form>
        </Container>
    )
}
export default Login;