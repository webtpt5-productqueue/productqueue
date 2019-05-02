import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import PreviewProjects from './components/previewProjects';
//import Form from '../src/components/Form.js';



function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/home" exact component={PreviewProjects} />
        <Route path="/login" exact component={Login} />
        <Route path="/create" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
