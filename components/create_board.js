import React from 'react'
import { Button } from "react-bootstrap";
import { withRouter } from 'next/router'

class CreateBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {member_id: this.props.member_id, team_id: this.props.team_id}
        this.router = props.router
    }

    handleClick = (member_id, team_id) => {
        if (team_id){
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({team_id: this.state.team_id})
              })
              .then((response) => response.json())
              .then(new_board => this.router.push(`/boards/${new_board.code}`))
        }
        else {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/${member_id}/boards` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({team_id: null})
              })
              .then((response) => response.json())
              .then(new_board => this.router.push(`/boards/${new_board.code}`))
        }
    }

    render(){
        return (    
            <>
                <Button variant="secondary" className="my-2" onClick={() => this.handleClick(this.state.member_id, this.state.team_id)}>CREATE BOARD</Button>
            </>
        );
    }
}

export default withRouter(CreateBoard)