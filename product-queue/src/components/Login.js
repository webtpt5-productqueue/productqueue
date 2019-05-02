import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PreviewProjects from '../components/previewProjects';

import { login } from '../actions';

class Login extends React.Component {
    state = {
        credentials: {
            email: '',
            password: ''
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        this.props
            .login(this.state.credentials)
            .then(() => this.props.history.push('/protected'));
        console.log(this.props);
    };

    render() {
        return (
            <Router>
                <div className="projectlogin">
                    <img className="image" alt="Product Queue logo" src={require('../images/pq-logo.png')} />
                    <form className="form" onSubmit={this.login}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.credentials.email}
                            onChange={this.handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={this.state.credentials.password}
                            onChange={this.handleChange}
                        />
                        <div className="error" />
                        {this.props.error && <p className="error">{this.props.error}</p>}

                        <button className="btn" type="submit">Login</button>
                        <button className="btn" type="submit">Register</button>

                    </form>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = ({ error, loggingIn }) => ({
    error,
    loggingIn
});

export default connect(
    mapStateToProps,
    { login }
)(Login);