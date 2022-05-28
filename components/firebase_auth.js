import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  credentialHelper: 'none',
  callbacks: {    
    signInSuccessWithAuthResult: function(authResult) {
      var user = authResult.user;
      var isNewUser = authResult.additionalUserInfo.isNewUser;

      if (isNewUser) {
        user.getIdToken().then(function(accessToken) {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/create`, {
            method: 'POST',
            headers: {
              Authorization: `${accessToken}`,
            },
          })
        });
      }
      return false;
    },
    signInFailure: function(error) {
      return handleUIError(error);
    },
  }
}

function FirebaseAuth() {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])
  return (
    <div>
      {renderAuth ? (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : null}
    </div>
  )
}

export default FirebaseAuth