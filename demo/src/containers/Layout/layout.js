import React from 'react';
import './layout.css';
import { Container, Grid, Header } from 'semantic-ui-react';

function withLayout(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <Container>
                    <Header as="h1" textAlign='center'>Voting System</Header>
                    <WrappedComponent {...this.props} />                    
                </Container>
            )

        }
    }
}

export default withLayout;