import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import FirebaseAuth from '../components/firebase_auth'
import { Container } from "react-bootstrap";

function Auth() {
  return(
    <Container>
        <FirebaseAuth />
    </Container>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)