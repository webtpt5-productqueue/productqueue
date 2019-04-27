import React, { Component } from 'react';
import '../LoginForm/projectLogin.css';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer.js';

class ProjectLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { email, password } = this.state;
        let { isLoginPending, isLoginSuccess, loginError } = this.props;
        //this is a test
        const test = "test";

        return <div className="login-form-wrapper" onSubmit={this.onSubmit}>
            <form className="form" name="loginform">
                <img className="image" alt="Product Queue logo" src={require('../../images/pq-logo.png')} />
                {/*<label>Email:</label>*/}
                <input className="form" type="email" placeholder="Email address" name="email" onChange={e => this.setState({ email: e.target.value })} />

                {/*<label>Password:</label>*/}
                <input className="form" type="password" placeholder="Password" name="password" onChange={e => this.setState({ password: e.target.value })} />

                <input className="form" type="submit" value="login" />
                <input className="form" type="submit" value="register" />

                {isLoginPending && <div>Please wait...</div>}
                {isLoginSuccess && <div>Let's get started!</div>}
                {loginError && <div>{loginError.message}</div>}
            </form>
        </div>
    };

    onSubmit = (e) => {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.login(email, password);
    }
}


const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectLogin);
