import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <p>header</p>
    <main>{children}</main>
    </>
  )
}

export default AuthLayout