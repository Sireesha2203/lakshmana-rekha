import React, { useRef, useState } from 'react';
import { login, signup, useAuth } from '../../firebase';
import Profile from './Profile';

function SignInSignUp() {
  const [loading, setLoading] = useState(false);
  const [sign, setSign] = useState(false);
  const currentUser = useAuth();
  const emailOrUsernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneRef = useRef();

  async function handleSignUp() {
    setLoading(true);
    try {
      // Validate password and confirm password match
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        throw new Error('Passwords do not match');
      }

      // Call the signup function with additional user information
      await signup({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        username: usernameRef.current.value,
        phone: phoneRef.current.value,
      });
    } catch (e) {
      alert('Error! ' + e.message);
    }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      // Identify if the entered value is an email or username
      const isEmail = emailOrUsernameRef.current.value.includes('@');

      // Call the login function with either email or username
      if (isEmail) {
        await login(emailOrUsernameRef.current.value, passwordRef.current.value);
      } else {
        // Assume it's a username
        await login(null, passwordRef.current.value, emailOrUsernameRef.current.value);
      }
    } catch (e) {
      alert('Error! ' + e);
    }
    setLoading(false);
  }

  return (
    <div>
      {!currentUser && (
        <div>
          {sign && (
            <div>
              <input ref={emailOrUsernameRef} type="text" placeholder="Email or Username" />
              <input ref={passwordRef} type="password" placeholder="Password" />
              <button disabled={loading} onClick={handleLogin}>
                Log In
              </button>
              <p>
                Create a new user?
                <button onClick={() => setSign(false)}>SignUp</button>
              </p>
            </div>
          )}
          {!sign && (
            <div>
              <input ref={firstNameRef} type="text" placeholder="First Name" />
              <input ref={lastNameRef} type="text" placeholder="Last Name" />
              <input ref={usernameRef} type="text" placeholder="Username" />
              <input ref={emailRef} type="email" placeholder="Email" />
              <input ref={passwordRef} type="password" placeholder="Password" />
              <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
              <input ref={phoneRef} type="tel" placeholder="Phone Number" />
              <button disabled={loading} onClick={handleSignUp}>
                Sign Up
              </button>
              <p>
                Already a user?
                <button onClick={() => setSign(true)}>LogIn</button>
              </p>
            </div>
          )}
        </div>
      )}
      {currentUser && <Profile setLoading={setLoading} loading={loading} />}
    </div>
  );
}

export default SignInSignUp;