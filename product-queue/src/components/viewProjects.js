import React, { Component } from 'react';
//import Axios from 'axios';
import { Link } from 'react-router-dom';


class ViewProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: Response.data,
            loading: true
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        //this.fetchProject(id);
    }
    /*
    fetchNote = id => {
        Axios
            .get(``)
            .then(response => {
                this.setState({
                    project: response.data,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            });
    }
    */
    render() {
        return (
            <div className="projectContainer">
                <div className="linkContainer">
                    <Link className="button" to={`/project/edit/${this.props.match.params.id}`}>Edit</Link>
                    <Link className="button" to={`/project/delete/${this.props.match.params.id}`}>Delete</Link>
                </div>
                <div className="projects">
                    <h3>{this.state.project.title}</h3>
                    <p>{this.state.project.textBody}</p>
                </div>
            </div>
        )
    };

}

export default ViewProjects;