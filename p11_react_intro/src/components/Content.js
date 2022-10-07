import React, { Fragment } from 'react'
import Part from './Part'

const Content = (props) => {
  return (
    <Fragment>
      {
        props.parts.map((part,index) => (
          <Part key={index} part={part} />
        ))
      }
    </Fragment>
  )
}

export default Content