import React from 'react'

function Button({text, func}) {
  return (
    <button className='px-8 mx-auto py-4 border-2 bg-slate-950 blueShadow duration-200 border-blue-400 rounded-md border-solid' onClick={func}><p>{text}</p></button>
  )
}

export default Button