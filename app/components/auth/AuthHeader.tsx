import Image from 'next/image'
import React from 'react'

interface AuthHeaderProps {
  variant : Variant
}

const AuthHeader = ({variant} : AuthHeaderProps) => {
  return (
    <div className='sm:mx-auto sm:w-full sm:max-w-md'>
    <Image
      src='/images/logo.png'
      alt='Logo'
      height={40}
      width={40}
      className='mx-auto w-auto'
    />
    <h2 className='mt-6	text-center text-3xl font-bold tracking-tight			text-white'>
      {variant === 'LOGIN'
        ? 'Sign in into your account'
        : 'Sign up for messenger'}
    </h2>
  </div>
  )
}

export default AuthHeader
