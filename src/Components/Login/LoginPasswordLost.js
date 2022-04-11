import React from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import { PASSWORD_LOST } from '../../Api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    // Se o email digitado for valido
    if (login.validate()) {

    //Enviamos como parametro o email e a url que vamos receber o token
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar')
      });
      const { json } = await request(url, options);
      console.log(json)
    }
  }


  // Se tivermos o data que é o useFetch e vai dizer se o email foi enviado ou nao renderizamos um paragrafo com essa mensagem se não renderizamos o formulario.
  return (
    <section>
      <Head title="Perdeu a senha" />

      <h1 className="title">Perdeu a senha?</h1>

      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
