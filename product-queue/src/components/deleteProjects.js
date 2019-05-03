import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
class DeleteProjects extends Component {
    DeleteNotes = (e) => {
        e.preventDefault();
        Axios
            .delete(``)
            .then(Response => {
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
        this.setState({
            title: '',
            textBody: '',
        });
    }

    render() {
        return (
            <div className="deleteProjectsContainer">
                <div className="confirm">
                    <div className="confermMessage">Are you sure want to delete this project?</div>
                    <div className="delete">
                        <Link to={`/`} onClick={this.DeleteNotes}>
                            <div className="ContainerDelete">Delete</div>
                        </Link>
                        <Link to={`/projects/${this.props.match.params.id}`}>
                            <div className="noContainer">No</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    };

}

export default DeleteProjects;