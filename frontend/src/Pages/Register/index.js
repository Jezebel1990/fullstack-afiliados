import React, { useState } from "react";
import { Container, Form, SubContainerSign } from "./styles";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { validateEmail, validatePassword, validateName,validateConfirmPassword } from "../../Utils/validators";
import userService from "../../Services/UserService";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const { data } = await userService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (data) {
        alert("Usuário cadastrado com sucesso");
        navigate("*"); // Redireciona para a página de login após o cadastro
      } else {
        alert("Usuário já cadastrado, faça o login!");
      }

      setLoading(false);
    } catch (err) {
      console.error('Erro ao fazer registro do usuário', err);
      setLoading(false);
      if (err.response && err.response.status === 409) {
        alert('Usuário já cadastrado, faça o login!');
      } else {
        alert('Erro ao fazer registro do usuário. Por favor, tente novamente mais tarde.');
      }
        
    }
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validateInput = () => {
    const isValid =
    validateEmail(form.email) &&
    validatePassword(form.password) &&
    validateConfirmPassword(form.password, form.confirmPassword) &&
    validateName(form.name);

    return isValid;
 };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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
          name='confirmPassword'
          placeholder='Confirme a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Button
          type='submit'
          text='Efetuar Cadastro!'
          disabled={loading || !validateInput()}
        />
        <SubContainerSign>
          <p>Já possui conta?</p>
          <NavLink to="/auth">Login</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
  );
};

export default Register;
