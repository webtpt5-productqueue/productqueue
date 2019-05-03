import React, { Component } from 'react';

import Axios from 'axios';

class CreateProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            textBody: '',
        }
    }
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /*
    addNew = (e) => {
        console.log(this.props);
        e.preventDefault();
        Axios
            .post('', this.state)

            .then((response) => {
                console.log(response);
            })
            .catch(err => console.log('Error', err));
        this.setState({
            title: '',
            textBody: '',
        })    
    }
    */
    render() {
        return (
            <div className="projectsContainer">
                <h1>Create New Note:</h1>
                <form className="form" onSubmit={this.addNew}>
                    <textarea className="title"
                        type='text'
                        name='title'
                        placeholder='Project Title'
                        onChange={this.inputChangehandler}
                        value={this.state.title} />

                    <textarea className="textBody"
                        type='text'
                        name='textBody'
                        placeholder='Project Content'
                        onChange={this.inputChangehandler}
                        value={this.state.textBody} />
                    <button className="button" type='submit'>Save</button>
                </form>
            </div>
        )
    };

}

export default CreateProjects;