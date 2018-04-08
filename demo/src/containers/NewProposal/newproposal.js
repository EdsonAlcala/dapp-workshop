import React from 'react';
import { Form, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { connect, } from 'react-redux';

class NewProposal extends React.Component {
    constructor() {
        super();
        this.state = {
            description: "",
            title: ""
        }
    }

    submitProposal = () => {
        console.log("Proposal submited");
        this.props.addProposal(this.state.title, this.state.description, () => {
            this.props.history.push("/proposals");
        })
    }

    descriptionChange = (e, { value }) => {
        this.setState({
            description: value
        })
    }

    titleChange = (e, { value }) => {
        this.setState({
            title: value
        })
    }

    render() {
        return (
            <div>
                <Grid centered columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h2" textAlign="center">New Proposal</Header>
                            <Form>
                                <Form.Input onChange={this.titleChange} fluid label='Title' placeholder='Proposal title' />
                                <Form.TextArea onChange={this.descriptionChange} label='Description' placeholder='Describe your proposal, maximum 150 words.' />
                            </Form>     
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button size='large' onClick={this.submitProposal} positive>Submit Proposal</Button>                                          
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default connect(null, actions)(withRouter(NewProposal));