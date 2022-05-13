import cookies from 'next-cookies';
import BoardContainer from '../components/board_container';
import { Row, Container } from "react-bootstrap";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

function Dashboard({boards, teams, member_id}) {
    return (
    <Container>
      <Row>
        <BoardContainer boards={boards} member_id={member_id} container_name="Private Boards"/>
      </Row>
    
      <Row>
      {teams.map((team) => 
        <BoardContainer boards={[]} key={team.id} member_id={member_id} team={team} container_name={team.name}/>
      )}
      </Row>

    </Container>
    )
}

export async function getServerSideProps(ctx) {
  const response_boards = await fetch(`${process.env.BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/boards`, {
    method: 'GET',
    headers: { cookie: ctx.req.headers.cookie },
  })
  const boards = await response_boards.json()

  const response_teams = await fetch(`${process.env.BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/teams`, {
    method: 'GET',
    headers: { 
      Cookie: ctx.req.headers.cookie,
    },
  })
  const teams = await response_teams.json()

  return { props: {boards: boards, teams: teams, cookies: cookies(ctx)}}
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard)