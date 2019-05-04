import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import PreviewProjects from './components/previewProjects';
import CreateProjects from './components/createProjects';
import ViewProjects from './components/viewProjects';
import DeleteProjects from './components/deleteProjects';
import EditProjects from './components/editProjects';

//import Form from '../src/components/Form.js';



function App() {
  return (
    <Router>
      <div className="App">
        <div className="Routes">
          <Switch>
            <Route exact path={"/"} component={Login} />
            <Route path={"/home"} component={PreviewProjects} />
            <Route path={"/create"} component={CreateProjects} />
            <Route path={"/delete"} component={DeleteProjects} />
            <Route path={"/edit"} component={EditProjects} />
            <Route path={"/view"} component={ViewProjects} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
