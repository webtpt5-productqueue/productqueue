import React, { Component } from 'react';

//import Axios from 'axios';
import { Link } from 'react-router-dom';



class PreviewProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true,
        }
    }

    /*
    componentDidMount() {
        Axios
            .get(``)

            .then(response => {
                console.log(response)
                this.setState({
                    notes: response.data,
                    loading: false,
                })
            })
            .catch(err => console.log(err));
    }
    */
    render() {
        return (
            <div className="projectsContainer">
                <h2>Your Projects</h2>
                <div className="projects">
                    {this.state.projects.map((project) => (
                        <Link key={project._id} className="project" to={`/project/${project._id}`}>
                            <h3>{project.title}</h3>
                            <p>{project.textBody}</p>
                        </Link>
                    ))}
                </div>
            </div>
        )
    };

}

export default PreviewProjects;