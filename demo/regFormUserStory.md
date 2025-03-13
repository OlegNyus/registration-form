# User Story: Registration Form

## Description
As a new user, I want to complete a registration form with my personal and professional information so that I can create an account and join the community.

## Acceptance Criteria

### Personal Information Page
1. The page displays a form with the following required fields (marked with *):
   - First Name*
   - Last Name*
   - Email*
   - Phone Number*

2. First Name field:
   - Accepts alphanumeric characters
   - Accepts names between 3-20 characters
   - Shows error "First Name is required" when empty
   - Shows error "First Name must be at least 3 characters" when less than 3 characters
   - Shows error "First Name must be less than 20 characters" when exceeds 20 characters
   - Shows error "First Name can only contain letters and numbers" when contains special characters

3. Last Name field:
   - Accepts alphanumeric characters
   - Accepts names between 3-20 characters
   - Shows error "Last Name is required" when empty
   - Shows error "Last Name must be at least 3 characters" when less than 3 characters
   - Shows error "Last Name must be less than 20 characters" when exceeds 20 characters
   - Shows error "Last Name can only contain letters and numbers" when contains special characters

4. Email field:
   - Accepts valid email format (example@domain.com)
   - Accepts email with subdomain (example@subdomain.domain.com)
   - Accepts email with multiple dots (example@domain.com.au)
   - Accepts email with numbers (example123@domain.com)
   - Accepts email with hyphens (example-123@domain.com)
   - Accepts email with underscores (example_123@domain.com)
   - Accepts email with periods (example.123@domain.com)
   - Is case insensitive (Example@domain.com and example@domain.com are considered the same)
   - Must be unique
   - Shows error "Email is required" when empty
   - Shows error "Invalid email format" when email format is invalid
   - Shows error "Email must be unique" when email already exists

5. Phone Number field:
   - Accepts and formats phone numbers in XXX-XXX-XXXX pattern
   - Automatically formats numbers as user types
   - Has placeholder text "Enter your phone number in XXX-XXX-XXXX format"
   - Does not accept non-numeric characters
   - Shows error "Phone Number is required" when empty
   - Shows error "Phone Number format: XXX-XXX-XXXX" when format is invalid

6. Next Step button:
   - Is enabled
   - Triggers an error message when one or more fields are invalid
   - Shows "Next Step" text
   - Navigates to the Professional Information page when clicked with valid form data

7. Progress Bar:
   - Shows 0% when no fields are valid
   - Shows 12.5% when one field is valid
   - Shows 25% when two fields are valid
   - Shows 37.5% when three fields are valid
   - Shows 50% when four fields are valid

### Professional Information Page
1. The page displays a form with the following fields:
   - Company Name*
   - Job Title*
   - Interests (checkboxes)
   - Subscribe to newsletter checkbox
   - Terms and Conditions agreement checkbox*

2. Progress Bar:
   - Shows 62.5% when five fields are valid
   - Shows 75% when six fields are valid
   - Shows 87.5% when seven fields are valid
   - Shows 100% when all fields are valid

3. Company Name field:
   - Accepts alphanumeric characters
   - Accepts company names between 3-20 characters
   - Shows error "Company Name is required" when empty
   - Shows error "Company Name must be at least 3 characters" when less than 3 characters
   - Shows error "Company Name must be less than 20 characters" when exceeds 20 characters
   - Shows error "Company Name can only contain letters and numbers" when contains special characters

4. Job Title field:
   - Accepts alphanumeric characters
   - Accepts job titles between 3-20 characters
   - Shows error "Job Title is required" when empty
   - Shows error "Job Title must be at least 3 characters" when less than 3 characters
   - Shows error "Job Title must be less than 20 characters" when exceeds 20 characters
   - Shows error "Job Title can only contain letters and numbers" when contains special characters

5. Interests checkboxes:
   - All options are unchecked by default
   - Options include: AI, Data, Cloud, Security, DevOps, Other
   - Can be checked/unchecked when clicked

6. Newsletter subscription checkbox:
   - Is checked by default
   - Can be unchecked when clicked

7. Terms and Conditions agreement checkbox:
   - Is unchecked by default
   - Can be checked when clicked
   - Is required for form submission
   - Contains links to Terms and Conditions and Privacy Policy pages
   - Clicking on Terms and Conditions link navigates to Under Construction page
   - Clicking on Privacy Policy link navigates to Under Construction page

8. Back button:
   - Is enabled
   - Shows "Back" text
   - Navigates back to the Personal Information page when clicked

9. Register button:
   - Is enabled
   - Shows "Register" text when not loading
   - Triggers error messages when one or more required fields are invalid
   - Shows "Submitting..." text with spinner during form submission
   - Navigates to the Thank You page after successful submission

### Real-time Validation
- Validates all fields on change and blur
- Shows error messages immediately below respective fields

### Form Submission
- Success Flow:
  - Shows loading state for 1.5 seconds
  - Adds customer to Customers after successful submission
  - Triggers onSubmitSuccess callback with form data
  
- Error States:
  - Maintains form state if submission fails
  - Keeps error messages visible if validation fails

### Visual Requirements
- Error messages display with red color and alert circle icon
- Input fields show red border when invalid
- Input fields show default border when valid
- Progress bar transitions smoothly between states
- Form has a semi-transparent background with blur effect