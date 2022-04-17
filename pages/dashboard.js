import cookies from 'next-cookies';
import BoardContainer from '../components/board_container';
import { Row, Container } from "react-bootstrap";
import { useEffect, useState } from 'react';

function Dashboard({boards, teams, cookies}) {
  const member_id = cookies.member_id
  const [teamBoard, setTeamBoard] = useState([]);

  useEffect(() => {
    setTeamBoard([]);
    }, []);

    return (
    <Container>
      <Row>
        <BoardContainer boards={boards} member_id={member_id} team="" container_name="Private Boards"/>
      </Row>
    
      <Row>
      {teams.map((team) => 
        <BoardContainer boards={teamBoard} key={team.id} member_id={member_id} team={team} container_name={team.name}/>
      )}
      </Row>

    </Container>
    )
}

export async function getServerSideProps(ctx) {
  const response_boards = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/boards`)
  const boards = await response_boards.json()

  const response_teams = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/teams`)
  const teams = await response_teams.json()

  return { props: {boards: boards, teams: teams, cookies: cookies(ctx)}}
}

export default Dashboard