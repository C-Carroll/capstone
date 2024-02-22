// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const demo = (e) => {
    // e.preventDefault();
    // setCredential('Demo-lition')
    // setPassword('password')
    // setErrors({});
    return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password' }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="loginCont">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="cred">
        <label id='usrnm'>
          Username or Email
          </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        </div>
        <div className="logButt">
        <button className="butts" type="submit">Log In</button>
        <button className="butts" onClick={(() => demo())}>Demo User</button>
        </div>
      </form>

    </div>
  );
}

export default LoginFormModal;
