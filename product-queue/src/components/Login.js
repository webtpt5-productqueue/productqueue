import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

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
            <div className="projectlogin">
                <form className="form" onSubmit={this.login}>
                    <label for="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={this.state.credentials.email}
                        onChange={this.handleChange}
                    />
                    <label for="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <div className="error" />
                    {this.props.error && <p className="error">{this.props.error}</p>}

                    <button>
                        {this.props.loggingIn ? (
                            <Loader type="ThreeDots" color="#1f2a38" height="12" width="26" />
                        ) : (
                                'Login'
                            )}
                    </button>
                </form>
            </div>
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