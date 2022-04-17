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
    <>
    <Container>
      <Row>
        <BoardContainer boards={boards} member_id={member_id} />
      </Row>
    
      <Row>
      {team_id_list.map((num) => 
        <BoardContainer key={num} member_id={member_id} team_id={num} />
      )}
      </Row>

    </Container>
    </>
    )
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${cookies(ctx).member_id}/boards`)
  const boards = await res.json()

  return { props: {boards: boards, cookies: cookies(ctx)}}
}

export default Dashboard