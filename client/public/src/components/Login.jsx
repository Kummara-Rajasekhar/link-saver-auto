import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser, fetchBookmarks }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const route = isLogin ? 'login' : 'signup';
    const res = await axios.post(`/api/auth/${route}`, { email, password });
    localStorage.setItem('token', `Bearer ${res.data.token}`);
    setUser(true);
    fetchBookmarks();
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
      <input className="w-full border mb-2 px-2 py-1 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full border mb-2 px-2 py-1 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 rounded">{isLogin ? 'Login' : 'Signup'}</button>
      <p className="mt-2 text-sm text-center">
        {isLogin ? 'New user?' : 'Already have an account?'}{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Signup' : 'Login'}
        </span>
      </p>
    </div>
  );
};

export default Login;
