import { FC, useEffect, useState } from 'react'

export const NoSSR: FC = ({ children }) => {
  const [render, setRender] = useState(false)

  useEffect(() => setRender(true), [])

  return render ? <>{children}</> : <span />
}
