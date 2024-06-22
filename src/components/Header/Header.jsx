import React from 'react'
import {Link} from "react-router-dom"
import "./header.css"
function Header() {
  return (
    <div className="App">
      <header className="navbar">
        <Link to="/">RegistrationFrom</Link>
        <Link to="/job_application_form">JobApplicationForm</Link>
        <Link to='/survey_form'>SurveyForm</Link>
         
      </header>
      {/* Other content goes here */}
    </div>
  )
}

export default Header