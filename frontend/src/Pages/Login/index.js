import React, { useState } from "react";
import { Container, Form, SubContainerSign } from "./styles";
import Input from "../../Components/Input/index";
import Button from "../../Components/Button/index";
import userService from "../../Services/UserService";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true); //usuário clicou e está carregando
      const response = await userService.login(form);
      console.log('response Login', response);
      if (response) {
        alert('Usuário Logado com Sucesso');
        //navegar para a  Home
        navigate('/home');
      } else {
        alert('Credenciais inválidas');
      }
      setLoading(false);
    } catch (err) {
      alert('Algo deu errado' + err);
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
          type='button'
          text='Entrar'
          onClick={handleSubmit}
          disabled={loading} // Passando o estado 'loading' como propriedade do botão
        />
        <SubContainerSign>
          <p>Não possui conta?</p>
          <NavLink to="register">Cadastrar</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
  );
}

export default Login;
