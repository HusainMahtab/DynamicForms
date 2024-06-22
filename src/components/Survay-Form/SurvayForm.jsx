

import React, { useState, useEffect } from 'react';
import "./survay.css"
const SurveyForm = () => {
    const initialFormData={
        fullName: '',
        email: '',
        surveyTopic: '',
        favoriteProgrammingLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: ''
    }
    const [formData, setFormData] = useState(initialFormData)

    const [errors, setErrors] = useState({});
    const [additionalQuestions, setAdditionalQuestions] = useState([]);

    useEffect(() => {
        if (formData.surveyTopic) {
            fetch(`https://api.example.com/questions?topic=${formData.surveyTopic}`)
                .then(response => response.json())
                .then(data => setAdditionalQuestions(data.questions))
                .catch(error => console.error('Error fetching additional questions:', error));
        }
    }, [formData.surveyTopic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email must be a valid email address';
        }
        if (!formData.surveyTopic) {
            newErrors.surveyTopic = 'Survey Topic is required';
        }
        if (formData.surveyTopic === 'Technology') {
            if (!formData.favoriteProgrammingLanguage) newErrors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
            if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience) || formData.yearsOfExperience <= 0) {
                newErrors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
            }
        }
        if (formData.surveyTopic === 'Health') {
            if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
            if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
        }
        if (formData.surveyTopic === 'Education') {
            if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
            if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
        }
        if (!formData.feedback || formData.feedback.length < 50) {
            newErrors.feedback = 'Feedback must be at least 50 characters';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            alert(`Form submitted successfully!\n${JSON.stringify(formData, null, 2)}`);
            setFormData(initialFormData)
            setErrors("")
            // Here, you would typically send formData to your server
        }
    };

    return (
        <>
        <h2 style={{textAlign:"center",marginBottom:"10px"}}>Survey Form</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                {errors.fullName && <span>{errors.fullName}</span>}
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label>Survey Topic:</label>
                <select name="surveyTopic" value={formData.surveyTopic} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                {errors.surveyTopic && <span>{errors.surveyTopic}</span>}
            </div>

            {formData.surveyTopic === 'Technology' && (
                <>
                    <div>
                        <label>Select Favorite Language:</label>
                        <select name="favoriteProgrammingLanguage" value={formData.favoriteProgrammingLanguage} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                        </select>
                        {errors.favoriteProgrammingLanguage && <span>{errors.favoriteProgrammingLanguage}</span>}
                    </div>
                    <div>
                        <label>Years of Experience:</label>
                        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
                        {errors.yearsOfExperience && <span>{errors.yearsOfExperience}</span>}
                    </div>
                </>
            )}

            {formData.surveyTopic === 'Health' && (
                <>
                    <div>
                        <label>Exercise Frequency:</label>
                        <select name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Rarely">Rarely</option>
                        </select>
                        {errors.exerciseFrequency && <span>{errors.exerciseFrequency}</span>}
                    </div>
                    <div>
                        <label>Diet Preference:</label>
                        <select name="dietPreference" value={formData.dietPreference} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select>
                        {errors.dietPreference && <span>{errors.dietPreference}</span>}
                    </div>
                </>
            )}

            {formData.surveyTopic === 'Education' && (
                <>
                    <div>
                        <label>Highest Qualification:</label>
                        <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="High School">High School</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                        </select>
                        {errors.highestQualification && <span>{errors.highestQualification}</span>}
                    </div>
                    <div>
                        <label>Field of Study:</label>
                        <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                        {errors.fieldOfStudy && <span>{errors.fieldOfStudy}</span>}
                    </div>
                </>
            )}

            <div>
                <label>Feedback:</label>
                <textarea name="feedback" value={formData.feedback} onChange={handleChange} />
                {errors.feedback && <span>{errors.feedback}</span>}
            </div>

            {additionalQuestions.map((question, index) => (
                <div key={index}>
                    <label>{question.text}</label>
                    <input type="text" name={`additionalQuestion${index}`} onChange={handleChange} />
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default SurveyForm;
