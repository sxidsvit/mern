import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const CreatePage = () => {
  const history = useHistory()
  const [link, setLink] = useState('')
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const { request } = useHttp()
  const { token } = useContext(AuthContext)

  const pressHandler = async event => {

    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${token}` })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {

      }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-2 mtop-4">
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}
