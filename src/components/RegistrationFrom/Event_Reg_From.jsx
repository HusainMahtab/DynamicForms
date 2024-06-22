import React, { useState, useEffect } from 'react';
import "../RegistrationFrom/registration.css";

const EventRegistrationForm = () => {
    const initialFormData = {
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email must be a valid email address';
        }
        if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
            newErrors.age = 'Age must be a number greater than 0';
        }
        if (formData.attendingWithGuest && !formData.guestName) {
            newErrors.guestName = 'Guest Name is required if attending with a guest';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            let alertMessage = `Form submitted successfully!\n`;
            alertMessage += `Name: ${formData.name}\n`;
            alertMessage += `Email: ${formData.email}\n`;
            alertMessage += `Age: ${formData.age}\n`;
            
            if (!formData.attendingWithGuest) {
                alertMessage += `Attending with guest\n`;
                alertMessage += `Guest Name: ${formData.guestName}\n`;
            }
            
            alert(alertMessage.trim()); // Trim removes any leading or trailing whitespace
            
            setFormData(initialFormData); // Reset form data after successful submission
            setErrors({}); // Clear any existing errors
        }
    };
    
    

    return (
        <>
        <h2 style={{textAlign:"center", marginBottom:"10px"}}>Registration From</h2>
        <form onSubmit={handleSubmit}>
            {!formData.attendingWithGuest && (
                <>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='UserName'/>
                        {errors.name && <span>{errors.name}</span>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email'/>
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <label>Age:</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder='Age' />
                        {errors.age && <span>{errors.age}</span>}
                    </div>
                </>
            )}
            <div>
                <label>Are you attending with a guest?</label>
                <input type="checkbox" name="attendingWithGuest" checked={formData.attendingWithGuest} onChange={handleChange} />
            </div>
            {formData.attendingWithGuest && (
                <div>
                    <label>Guest Name:</label>
                    <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} placeholder='GuestName'/>
                    {errors.guestName && <span>{errors.guestName}</span>}
                </div>
            )}
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default EventRegistrationForm;
