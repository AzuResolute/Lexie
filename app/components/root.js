import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <nav>
        <Link to = "/"><h1 className = "navButton">To Home</h1></Link>
        {/* <Link to = "/campuses"><h1 className = "navButton">To All Campuses</h1></Link>
        <Link to = "/students"><h1 className = "navButton">To All Students</h1></Link> */}
      </nav>
      <main>
        <h1>Lexie - The Scrabble Scoring Application</h1>
        <Switch>
          {/* <Route exact path = "/" component = {HomePage} />
          <Route exact path = "/campuses" component = {Campuses} />
          <Route exact path = "/students" component = {Students} />
          <Route path = "/campuses/:campusId" component = {SingleCampus} />
          <Route path = "/students/:studentId" component = {SingleStudent} />
          <Route path = "*" component = {PageNotFound} /> */}
        </Switch>
      </main>
    </div>
  )
}

export default Root
