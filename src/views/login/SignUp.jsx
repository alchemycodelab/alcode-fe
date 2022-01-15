import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { existingUserSignIn, newUserSignUp } from '../../utils/AuthFetch';

export default function SignUp({ hasUser = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();

  let navigate = useNavigate();

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    if (hasUser) {
      const userData = await existingUserSignIn(email, password);
      if (userData.email) {
        setUser({ name: userData.name, email: userData.email });
        navigate('/search');
      } else {
        setError('Wrong email/password');
      }
    } else {
      try {
        const userSignUp = await newUserSignUp(name, email, password);
        console.log(userSignUp.status);
        if (userSignUp) {
          setUser({ name, email });
          navigate('/search');
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <form className='form-main' onSubmit={handleSubmitSignUp}>
      <fieldset>
        <legend>{hasUser ? 'SignIn' : 'SignUp'}</legend>
        <a href={process.env.REACT_APP_OAUTH}>
          Sign in with your Google account
        </a>
        <label htmlFor='email-input'>
          <input
            id='email-input'
            required
            value={email}
            type='text'
            placeholder='email'
            className='input'
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </label>
        <label htmlFor='password-input'>
          <input
            id='password-input'
            required
            value={password}
            type='text'
            placeholder='password'
            className='input'
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </label>

        {!hasUser && (
          <label htmlFor='name-input'>
            <input
              id='name-input'
              required
              value={name}
              type='text'
              placeholder='name'
              className='input'
              onChange={({ target }) => {
                setName(target.value);
              }}
            />
          </label>
        )}
        <button type='submit' className='btn-main'>
          {hasUser ? 'SignIn' : 'SignUp'}
        </button>
        <p>{error}</p>
      </fieldset>
    </form>
  );
}
