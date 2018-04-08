import React from 'react';
import { Header, Button, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './home.css';
import { Connect, SimpleSigner } from 'uport-connect';
import * as actions from '../../actions';
import { uport } from '../../utils/connector';
import { connect, } from 'react-redux';
const MNID = require('mnid');

class Home extends React.Component {
    login = () => {
        console.log("Login button clicked");
        // Request credentials to login
        uport.requestCredentials({
            requested: ['name', 'phone', 'country'],
            notifications: true // We want this if we want to recieve credentials
        })
            .then((credentials) => {
                let addressPayload = MNID.decode(credentials.address);
                console.log(addressPayload.address);
                this.props.addMember(addressPayload.address, () => {
                    this.props.history.push("/proposals");
                });
            })
    }

    render() {
        return (
            <div className="login-page">
                <Grid centered columns={2}>
                    <Grid.Row>
                        <Button size='large' onClick={this.login} positive>Sign In</Button>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateProps(state) {
    return {

    }
}

export default connect(mapStateProps, actions)(withRouter(Home));
