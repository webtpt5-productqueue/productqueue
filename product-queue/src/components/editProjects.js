import React, { Component } from 'react';
//import Axios from 'axios';


class EditProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectToEdit: {},
            updatedTitle: null,
            updatedText: null,
            loading: true
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        //this.fetchProject(id);
    }
    /*
    fetchProject = id => {
        Axios
            .get(``)
            .then(response => {
                this.setState(
                    {
                        ProjectToEdit: response.data,
                        loading: false
                    });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err)
            });
    }
    
    submitEditedProject = (e) => {
        e.preventDefault();
        Axios
            .put(``, {
                title: this.state.updatedTitle,
                textBody: this.state.updatedText,
            })
            .then((_response) => {
                this.props.history.push(`/project/${this.props.match.params.id}`);
            })
            .catch(err => console.log(err));
    }
    */
    updateTitleInputChangehandler = (e) => {
        this.setState({
            updatedTitle: e.target.value
        });
    }

    updateTeaxtBodyInputChangehandler = (e) => {
        this.setState({
            updatedText: e.target.value,
            noteToEdit: { textBody: e.target.value }
        });
    }

    render() {
        return (
            <div className="notesContainer">
                <h2>Edit Project:</h2>
                <form className="form" onSubmit={this.submitEditedProject}>
                    <textarea className="title"
                        type='text'
                        name='title'
                        onChange={this.updateTitleInputChangehandler}
                        value={this.state.projectToEdit.title} />

                    <textarea className="textBody"
                        type='text'
                        name='textBody'
                        onChange={this.updateTeaxtBodyInputChangehandler}
                        value={this.state.projectToEdit.textBody} />
                    <button className="button" type='submit'>Update</button>
                </form>
            </div>
        )
    };

}

export default EditProjects;