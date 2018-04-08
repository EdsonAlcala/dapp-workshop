import React from 'react';
import { Grid, Card, Button, Header } from 'semantic-ui-react'
import * as actions from '../../actions';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ProposalDetail extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        if (this.props.match.params.proposalId) {
          this.props.getProposal(this.props.match.params.proposalId);
        }
    }

    vote = () => {
        this.props.vote(this.props.proposal.proposalId, () => {
            this.props.history.push("/proposals");
        })
    }

    render() {
        return (
            <div>
                {this.props.proposal &&
                <Grid centered columns={3}>
                    <Grid.Row>
                        <Grid.Column stretched textAlign="center" width={6}>
                            <Header as="h2" textAlign="center">{this.props.proposal.header}</Header>
                            <p>{this.props.proposal.description}</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button size='large' onClick={this.vote} positive>Vote</Button>                       
                    </Grid.Row>
                </Grid>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      proposal: state.mainReducer.proposal
    }
}

export default connect(mapStateToProps, actions)(withRouter(ProposalDetail));