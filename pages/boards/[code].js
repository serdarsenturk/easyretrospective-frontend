import Board from '../../components/board';
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';

function BoardDetail({ board }) {
  return (
    <Board board={board}/>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({AuthUser, req, query}) => {
  const token = await AuthUser.getIdToken();
  const code  = query.code

  const res = await fetch(`${process.env.BACKEND_URL}/api/v1/boards/${code}`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
    }
  }, req)

  const board = await res.json()

  return {
    props: {
      board : board, 
    }  
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(BoardDetail)