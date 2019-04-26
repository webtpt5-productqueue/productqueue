import React from 'react';

class Form extends React.Component {
    constructor() {
        super();
        state = {
            firstName: '',
            lastName: '',
            project: '',
            description: '',
        }
    }

    handleChanges = e => {
        let value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    render() {
        return (
            <div className="project-form">
                <form className="form" onSubmit={}>
                    <label for="first-name">First Name</label>
                    <input 
                        type="text"
                        name="first-name"
                        placeholder="First Name"
                        onChange={this.handleChanges}
                        value={this.state.firstName}
                    />
                    <label for="last-name">Last Name</label>
                    <input 
                        type="text"
                        name="last-name"
                        placeholder="Last Name"
                        onChange={this.handleChanges}
                        value={this.state.lastName}
                    />

                    <label for="project">Project Name</label>
                    <input 
                        type="text"
                        name="project"
                        placeholder="Project"
                        onChange={this.handleChanges}
                        value={this.state.project}
                    />

                    <label for="project-description">Project Description</label>
                    <input 
                        type="text"
                        name="project-description"
                        placeholder="Description"
                        onChange={this.handleChanges}
                        value={this.state.description}
                    />

                    <button>
                        Add Project
                    </button>
                </form>
            </div>
        );
    }
}

export default Form;