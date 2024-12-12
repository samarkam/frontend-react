import React from 'react'
import MediaCard from './MediaCard'

const Affichearticles = ({articles}) => {
  return (
     <div className="card-container">
    
      {
     articles.map((art,index)=>
        <MediaCard 
        key={art.articleId}
        articleId={art.articleId}
        name={art.name}
        price={art.price}
        reference={art.reference}
        cateroryName={art.category.name}/>
        )
      }
   </div>
  )
}

export default Affichearticles
