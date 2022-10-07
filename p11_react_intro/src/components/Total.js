import React from 'react'

const Total = ({parts}) => {
  return (
    <h1>{parts[0].exercises + parts[1].exercises + parts[2].exercises} </h1>
  )
}

export default Total