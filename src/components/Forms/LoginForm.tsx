import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/lib/slices/authApiSlice';
import { LoginData } from '@/Datatypes/interfaces/interface';
import { AppDispatch } from '@/lib/store';
interface LoginProps {
  loginTitle: string;
}
const LoginForm: React.FC<LoginProps> = () => {
  const dispatch = useDispatch(); // Explicitly type dispatch

  const [user, setuser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const loginData: LoginData = {
        email: user,
        password: password,
      };

      // Dispatch the login action with correct action type
      (dispatch as AppDispatch)(loginUser(loginData));

    } catch (error) {
      console.error('Login failed In LoginPage:', error);
    }
  };


  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={user}
            onChange={(e) => setuser(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>

    </div>
  );
};

export default LoginForm;
