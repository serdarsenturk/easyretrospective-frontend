import BoardContainer from '../components/board_container';
import { Row, Container } from "react-bootstrap";
import {
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth';
import CreateTeam from '../components/create_team';

const Dashboard = ({boards, teams, member_id}) => {
  return (
    <Container>
      <Row className="team-input-form">
        <CreateTeam/>
      </Row>

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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({AuthUser, req}) => {
  const token = await AuthUser.getIdToken();
  const firebase_user_id = AuthUser.id;

  const response_boards = await fetch(`${process.env.BACKEND_URL}/api/v1/members/${firebase_user_id}/boards`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
    },
  }, req)

  const boards = await response_boards.json()

  const response_teams = await fetch(`${process.env.BACKEND_URL}/api/v1/members/${firebase_user_id}/teams`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
    },
  }, req)

  const teams = await response_teams.json()

  return { props: {boards: boards, teams: teams, member_id: firebase_user_id}}
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard)