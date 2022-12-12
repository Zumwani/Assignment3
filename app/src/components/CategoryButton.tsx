import React from 'react'

type Params = {
    categoryName: string,
    image: string
}

const CategoryButton: React.FC<Params> = ({ categoryName, image }) => {
  return (
    <div className='button-category'>
        <img src={image} alt=""/>
        <p>{categoryName}</p>
    </div>
  )
}

export default CategoryButton