import React from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/NavbarComponent';
import ExerciseList from './components/ExerciseListComponent';
import EditExercise from './components/EditExerciseComponent'
import CreateExercise from './components/CreateExerciseComponent';
import CreateUser from './components/CreateUserComponent';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Route path="/" exact component={ExerciseList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Redirect to="/" />
      </div>
    </Router>
  );
}

export default App;
