import React from 'react'
import { Button } from "react-bootstrap";
import { withRouter } from 'next/router'

export default class CreateBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {member_id: this.props.member_id, team_id: this.props.team_id}
    }

    handleClick = (member_id) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards` , {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
        })
    }

    render(){
        return (    
            <>
                <Button variant="secondary" onClick={() => this.handleClick(this.state.member_id)}>CREATE BOARD</Button>
            </>
        );
    }
}

export default withRouter(CreateBoard)