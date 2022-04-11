import React from 'react';
import { USER_GET, TOKEN_POST, VALIDATE_TOKEN_POST } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null); // true or false
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  // Resetamos tudo caso haja logout
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);

      window.localStorage.removeItem('token');

      navigate('/login');
    },
    [navigate]
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });

      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: Usuário Inválido!`);

      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  // Loga automaticamente se ja existir um token no localStorage
  React.useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);

          //Valida o token
          const { url, options } = VALIDATE_TOKEN_POST(token);
          const response = await fetch(url, options);

          // Se o token for invalido cria um erro
          if (!response.ok) throw new Error('Token inválido');

          // Se tudo der certo loga o usuario
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
      else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    <div>
      <UserContext.Provider
        value={{ userLogin, userLogout, data, error, loading, login }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
};
