import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

export const DetailPage = () => {

  const { request, loading } = useHttp()
  const linkId = useParams().id
  const { token } = useContext(AuthContext)
  const [link, setLink] = useState()

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (e) { console.log('DetailPage: ', e.message) }
  },
    [request, linkId, token],
  )

  useEffect(() => { getLink() }, [getLink])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  )
}
