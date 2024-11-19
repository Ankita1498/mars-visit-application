import { useState } from 'react';

const MultiStageForm = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    contactInfo: "",
    phone: "",
    departureDate: "",
    returnDate: "",
    accommodation: "",
    specialRequests: "",
    healthDeclaration: "",
    emergencyContact: "",
    medicalConditions: "",
  });

  const handleNext = () => {
    if (validateCurrentStage()) {
      // Validate that the return date is later than the departure date
      if (currentStage === 2 && new Date(formData.returnDate) <= new Date(formData.departureDate)) {
        alert("Return date must be later than the departure date.");
        return;
      }

      // Validate that the birth date is less than today
      if (currentStage === 1 && new Date(formData.dateOfBirth) >= new Date()) {
        alert("Birth date must be earlier than today.");
        return;
      }

     // Validate phone number format
    if (formData.phone && !validatePhone(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setCurrentStage((prev) => prev + 1);
  } else {
    alert("Please fill out all required fields.");
  }

  // Validate email
  if (!validateEmail(formData.contactInfo)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate emergency contact
  if (formData.emergencyContact && !validateEmergencyContact(formData.emergencyContact)) {
    alert("Please enter a valid emergency contact number.");
    return;
  }
};

  const handleBack = () => setCurrentStage((prev) => prev - 1);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // Simple check for a 10-digit phone number
    return phonePattern.test(phone);
  };

  const validateEmergencyContact = (emergencyContact) => {
    const emergencyContactPattern =
      /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{1,4}\)?[-.\s]?)?(\d{3})[-.\s]?(\d{4})$/;
    return emergencyContactPattern.test(emergencyContact);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "dateOfBirth",
      "nationality",
      "contactInfo",
      "departureDate",
      "returnDate",
      "accommodation",
      "healthDeclaration",
      "emergencyContact",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert("Please fill out all required fields.");
        return;
      }
    }

    if (!validateEmail(formData.contactInfo)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.emergencyContact && !validateEmergencyContact(formData.emergencyContact)) {
      alert("Please enter a valid emergency contact number.");
      return;
    }

    alert("Application submitted successfully!");

    setCurrentStage(1);
    setFormData({
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      contactInfo: "",
      phone: "",
      departureDate: "",
      returnDate: "",
      accommodation: "",
      specialRequests: "",
      healthDeclaration: "",
      emergencyContact: "",
      medicalConditions: "",
    });
  };

  const validateCurrentStage = () => {
    if (currentStage === 1) {
      return formData.fullName && formData.dateOfBirth && formData.nationality && formData.contactInfo;
    }
    if (currentStage === 2) {
      return formData.departureDate && formData.returnDate && formData.accommodation;
    }
    if (currentStage === 3) {
      return formData.healthDeclaration && formData.emergencyContact;
    }
    return true;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {currentStage === 1 && (
          <div>
            <h2>Stage 1: Personal Information</h2>
            <label>
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
            <label>
              Date of Birth <span className="required">*</span>
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              required
            />
            <label>
              Nationality <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.nationality}
              onChange={(e) =>
                setFormData({ ...formData, nationality: e.target.value })
              }
              required
            />
            <label>
              Contact Information (Email) <span className="required">*</span>
            </label>
            <input
              type="email"
              value={formData.contactInfo}
              onChange={(e) =>
                setFormData({ ...formData, contactInfo: e.target.value })
              }
              required
            />
            <label>
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter 10-digit phone number"
              required
            />
          </div>
        )}
        {currentStage === 2 && (
          <div>
            <h2>Stage 2: Travel Preferences</h2>
            <label>
              Departure Date <span className="required">*</span>
            </label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) =>
                setFormData({ ...formData, departureDate: e.target.value })
              }
              required
            />
            <label>
              Return Date <span className="required">*</span>
            </label>
            <input
              type="date"
              value={formData.returnDate}
              onChange={(e) =>
                setFormData({ ...formData, returnDate: e.target.value })
              }
              required
            />
            <label>
              Accommodation Preference <span className="required">*</span>
            </label>
            <select
              value={formData.accommodation}
              onChange={(e) =>
                setFormData({ ...formData, accommodation: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              <option value="Space Hotel">Space Hotel</option>
              <option value="Martian Base">Martian Base</option>
            </select>
            <label>Special Requests</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) =>
                setFormData({ ...formData, specialRequests: e.target.value })
              }
            />
          </div>
        )}
        {currentStage === 3 && (
          <div>
            <h2>Stage 3: Health and Safety</h2>
            <label>
              Health Declaration <span className="required">*</span>
            </label>
            <select
              value={formData.healthDeclaration}
              onChange={(e) =>
                setFormData({ ...formData, healthDeclaration: e.target.value })
              }
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label>
              Emergency Contact Information <span className="required">*</span>
            </label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={(e) =>
                setFormData({ ...formData, emergencyContact: e.target.value })
              }
              required
              placeholder="Enter emergency contact number"
            />
            <label>Any Medical Conditions</label>
            <textarea
              value={formData.medicalConditions}
              onChange={(e) =>
                setFormData({ ...formData, medicalConditions: e.target.value })
              }
            />
          </div>
        )}
        <div className="button-group">
          {currentStage > 1 && <button type="button" onClick={handleBack}>Back</button>}
          {currentStage < 3 && <button type="button" onClick={handleNext}>Next</button>}
          {currentStage === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default MultiStageForm;
