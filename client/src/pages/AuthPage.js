import React, { useState, useEffect } from 'react'
import './AuthPage.css'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {

  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHendler = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      message(data.message)
    } catch (e) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div className="input-field">
              <input
                placeholder="Введите email"
                id="email"
                type="text"
                name="email"
                className="yellow-input"
                onChange={changeHendler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Введите пароль"
                id="password"
                type="password"
                name="password"
                className="yellow-input"
                onChange={changeHendler}
              />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4 mr"
              disabled={loading}
              onClick={loginHandler}
            >Войти</button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}