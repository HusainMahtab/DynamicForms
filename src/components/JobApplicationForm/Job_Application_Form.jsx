
import "./jobForm.css"

import React, { useState } from 'react';

const JobApplicationForm = () => {
    const intialFormData={
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioURL: '',
        managementExperience: '',
        additionalSkills: [],
        interviewTime: ''
    }

    const [formData, setFormData] = useState(intialFormData)
       
    

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                additionalSkills: checked ? [...prevData.additionalSkills, value] : prevData.additionalSkills.filter(skill => skill !== value)
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validator = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email must be a valid email address';
        }
        if (!formData.phoneNumber || isNaN(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone Number is required and must be a valid number';
        }
        if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
            newErrors.relevantExperience = 'At least one year experience are compulsory';
        }
        if (formData.position === 'Designer' && (!formData.portfolioURL || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.portfolioURL))) {
            newErrors.portfolioURL = 'Portfolio URL is required and must be a valid URL';
        }
        if (formData.position === 'Manager' && !formData.managementExperience) {
            newErrors.managementExperience = 'Management Experience is required';
        }
        if (formData.additionalSkills.length === 0) {
            newErrors.additionalSkills = 'At least one additional skill must be selected';
        }
        if (!formData.interviewTime) {
            newErrors.interviewTime = 'Preferred Interview Time is required';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            alert(`Form submitted successfully!\n${JSON.stringify(formData, null, 2)}`);
            setFormData(intialFormData)
        }
    };

    return (
        <>
        <h2 style={{textAlign:"center", marginBottom:"10px"}}>Job Application Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                {errors.fullName && <span style={{color:"red"}}>{errors.fullName}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span style={{color:"red"}}>{errors.email}</span>}
            </div>
            <div>
                <label>Phone Number:</label>
                <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <span style={{color:"red"}}>{errors.phoneNumber}</span>}
            </div>
            <div>
                <label>Applying for Position:</label>
                <select name="position" value={formData.position} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                </select>
            </div>
            {(formData.position === 'Developer' || formData.position === 'Designer') && (
                <div>
                    <label>Relevant Experience (years):</label>
                    <input type="number" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} />
                    {errors.relevantExperience && <span style={{color:"red"}}>{errors.relevantExperience}</span>}
                </div>
            )}
            {formData.position === 'Designer' && (
                <div>
                    <label>Portfolio URL:</label>
                    <input type="text" name="portfolioURL" value={formData.portfolioURL} onChange={handleChange} />
                    {errors.portfolioURL && <span style={{color:"red"}}>{errors.portfolioURL}</span>}
                </div>
            )}
            {formData.position === 'Manager' && (
                <div>
                    <label>Management Experience:</label>
                    <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange} />
                    {errors.managementExperience && <span style={{color:"red"}}>{errors.managementExperience}</span>}
                </div>
            )}
            <div>
                <label>Additional Skills:</label>
                <label><input type="checkbox" name="additionalSkills" value="JavaScript" checked={formData.additionalSkills.includes('JavaScript')} onChange={handleChange} /> JavaScript</label>
                <label><input type="checkbox" name="additionalSkills" value="CSS" checked={formData.additionalSkills.includes('CSS')} onChange={handleChange} /> CSS</label>
                <label><input type="checkbox" name="additionalSkills" value="Python" checked={formData.additionalSkills.includes('Python')} onChange={handleChange} /> Python</label>
                {errors.additionalSkills && <span style={{color:"red"}}>{errors.additionalSkills}</span>}
            </div>
            <div>
                <label>Preferred Interview Time:</label>
                <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} />
                {errors.interviewTime && <span style={{color:"red"}}>{errors.interviewTime}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default JobApplicationForm;
