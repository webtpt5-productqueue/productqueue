import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../redux/reducer';

class RegisterForm extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        company: ''
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state).then(() => {
            this.props.history.push({
                pathname: '/',
                state: {
                    email: this.state.email,
                    password: this.state.password
                }
            });
        });
    }

    render() {
        return (
            <div className="register-form">
                <form onSubmit={this.onSubmit}>
                    <h3>Register New User</h3>
                    <p>
                        Create an account or <Link to="/">Log In</Link>
                    </p>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.handleChanges}
                        value={this.state.firstName}
                    />

                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.handleChanges}
                        value={this.state.lastName}
                    />

                    <label htmlFor="company">Company Name</label>
                    <input 
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        onChange={this.handleChanges}
                        value={this.state.company}
                    />

                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChanges}
                        value={this.state.email}
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChanges}
                        value={this.state.password}
                    />

                    <button>
                        Register
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { register }
)(RegisterForm);
