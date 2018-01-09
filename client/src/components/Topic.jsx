import React from 'react'

export const Topic = ({topic, handleClick}) => (

  <div onClick={handleClick()}>
    <div>{topic.title}</div>
    <div>{topic.upvotes}
    <div>{topic.numberOfComments}</div>
    <button type="button" name="upvote">Upvote</button>
  </div>
  )

