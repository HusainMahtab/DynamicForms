import Header from './components/Header/Header'
import EventRegistrationForm from './components/RegistrationFrom/Event_Reg_From'
import JobApplicationForm from './components/JobApplicationForm/Job_Application_Form'
import SurveyForm from './components/Survay-Form/SurvayForm'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {
  
  return (
     <Router>
      
      <Header/>
        <Routes>
        
           <Route path='/' element={<EventRegistrationForm/>}/>
           <Route path='/job_application_form' element={<JobApplicationForm/>}/>
           <Route path='/survey_form' element={<SurveyForm/>}/>
        </Routes>
     </Router>
 )    
}

export default App
