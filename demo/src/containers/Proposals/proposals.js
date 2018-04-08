import React from 'react';
import { Grid, Card, Button, Image } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";
import * as actions from '../../actions';
import { connect, } from 'react-redux';

class Proposals extends React.Component {
    constructor() {
        super();     
    }
    componentWillMount() {
        this.props.getProposals();
    }
    makeProposal = () => {
        this.props.history.push("/newproposal");
    }
    viewResults = () => {
        this.props.history.push("/results");
    }

    render() {
        const { history } = this.props;
        return (
            <div className="proposals-page">
            <Grid centered>
                <Grid.Row>
                    <Card.Group itemsPerRow={4}>
                    {this.props.proposals && this.props.proposals.map((item, index) => {
                        return <Card fluid key={index+1} onClick={() => history.push(`proposaldetail/${item.proposalId}`) }>
                        <Image src='http://via.placeholder.com/450x150' />
                        <Card.Content>
                            <Card.Header>{`${item.header}`}</Card.Header>    
                            <Card.Meta>Description</Card.Meta>                       
                            <Card.Description>{item.description}</Card.Description>
                        </Card.Content>
                        </Card>
                    })}                    
                    </Card.Group>                    
                </Grid.Row>
                <Grid.Row>  
                    <Button size='large' onClick={this.makeProposal} positive>Make Proposal</Button>
                    <Button size='large' onClick={this.viewResults} primary>View Results</Button>
                </Grid.Row>
            </Grid>               
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        proposals: state.mainReducer.proposals
    }
}
export default connect(mapStateToProps, actions)(withRouter(Proposals));