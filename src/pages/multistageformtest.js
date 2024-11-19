import { validateEmail, validatePhone, validateEmergencyContact } from './multi-stage-form';

describe('Form validation logic', () => {
  // Test validateEmail function
  test('should validate correct email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);  // valid email
    expect(validateEmail('invalid-email')).toBe(false);  // invalid email
    expect(validateEmail('test@.com')).toBe(false);       // invalid email
    expect(validateEmail('test@com')).toBe(false);        // invalid email
  });

  // Test validatePhone function
  test('should validate phone number format', () => {
    expect(validatePhone('1234567890')).toBe(true);  // valid phone number
    expect(validatePhone('12345')).toBe(false);      // invalid phone number (too short)
    expect(validatePhone('123456789012')).toBe(false); // invalid phone number (too long)
    expect(validatePhone('phone123')).toBe(false);    // invalid phone number (non-numeric)
  });

  // Test validateEmergencyContact function
  test('should validate emergency contact number format', () => {
    expect(validateEmergencyContact('123-456-7890')).toBe(true);  // valid emergency contact
    expect(validateEmergencyContact('+1-123-456-7890')).toBe(true); // valid international format
    expect(validateEmergencyContact('12345')).toBe(false);        // invalid format (too short)
    expect(validateEmergencyContact('phone-number')).toBe(false); // invalid format (letters)
    expect(validateEmergencyContact('123456789012')).toBe(false); // invalid format (too long)
  });
});
