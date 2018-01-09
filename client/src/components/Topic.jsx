import React from 'react'

const Topic = ({topic, handleClick}) => (

  <div onClick=>
    <div>{topic.title}</div>
    <div>{topic.upvotes}
    <div>{topic.numberOfComments}</div>
    <button type="button" name="upvote">Upvote</button>
  </div>
  )


export default Topic;