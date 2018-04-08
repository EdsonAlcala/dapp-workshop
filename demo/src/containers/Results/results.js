import React from 'react';
import { Grid, Card, Button, Header } from 'semantic-ui-react'

class Results extends React.Component {
    constructor() {
        super();
    }
    vote = () => {
        console.log("Vote clicked");
    }

    render() {
        return (
            <div>
                <Grid centered columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header className="blue" as="h1" textAlign="center">The proposal winner is</Header>
                            <Header as="h2" textAlign="center">Title</Header>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Button size='large' onClick={this.vote} positive>Execute</Button>                       
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default Results;