import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import PreviewProjects from './components/previewProjects';
import CreateProjects from './components/previewProjects';
import ViewProjects from './components/previewProjects';
import DeleteProjects from './components/previewProjects';
import EditProjects from './components/previewProjects';

//import Form from '../src/components/Form.js';



function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={PreviewProjects} />
        <Route path="/create" exact component={CreateProjects} />
        <Route path="/delete" exact component={DeleteProjects} />
        <Route path="/edit" exact component={EditProjects} />
        <Route path="/view" exact component={ViewProjects} />
      </div>
    </Router>
  );
}

export default App;
