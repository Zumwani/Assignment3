import React, { ReactNode } from 'react'

type Params = {
    id: string,
    header: string,
    children: ReactNode
}

const Tab: React.FC<Params> = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default Tab