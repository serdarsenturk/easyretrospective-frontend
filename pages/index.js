import React from 'react'
import Link from 'next/link'
import { Button } from "react-bootstrap";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

const Home = () => {
  const AuthUser = useAuthUser()
  const email = AuthUser.email;
  const signOut = AuthUser.signOut

  return (
    <>
    <div>
    {email ? (
      <>
        <p>Signed in as {email}</p>
        <Button
        type="button"
        onClick={() => {
          signOut()
        }}
        >Sign out </Button>
      </>
    ) : (
      <>
        <p>You are not signed in.</p>
        <Link href="/auth">
          <a>
            <Button type="button">
              Sign in
            </Button>
          </a>
        </Link>
      </>
    )}
  </div>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Home)