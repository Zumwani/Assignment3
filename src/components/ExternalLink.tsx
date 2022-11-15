import React from 'react'

type Param = {
    link: string,
    className: string
}

const ExternalLink: React.FC<Param> = ({link, className}: Param) => {
  return (
    <a href={link} className={className} target="_blank" rel="noreferrer"></a>
  )
}

export default ExternalLink