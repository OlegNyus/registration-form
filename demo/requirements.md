Generate a User Story based on the requirements below. Create one MD file. Make sure the User Story is accurate and covers all requirements strictly. Do not use Given-When-Then format.

# Registration Form Test Requirements

## Personal Information Page

### Input Fields Validation - all fields are required and marked with *

#### First Name Field
- **Positive Cases:**
  - Should accept alphanumeric characters
  - Should accept first names between 3-20 characters
  
- **Negative Cases:**
  - Should show error "First Name is required" when empty
  - Should show error "First Name must be at least 3 characters" when less than 3 characters
  - Should show error "First Name must be less than 20 characters" when exceeds 20 characters
  - Should show error "First Name can only contain letters and numbers" when contains special characters

#### Last Name Field
- **Positive Cases:**
  - Should accept alphanumeric characters
  - Should accept last names between 3-20 characters
  
- **Negative Cases:**
  - Should show error "Last Name is required" when empty
  - Should show error "Last Name must be at least 3 characters" when less than 3 characters
  - Should show error "Last Name must be less than 20 characters" when exceeds 20 characters
  - Should show error "Last Name can only contain letters and numbers" when contains special characters


#### Email Field
- **Positive Cases:**
  - Should accept valid email format (example@domain.com)
  - Should accept email with subdomain (example@subdomain.domain.com)
  - Should accept email with multiple dots (example@domain.com.au)
  - Should accept email with numbers (example123@domain.com)
  - Should accept email with hyphens (example-123@domain.com)
  - Should accept email with underscores (example_123@domain.com)
  - Should accept email with periods (example.123@domain.com)
  - Should be case insensitive (Example@domain.com and example@domain.com should be considered the same)
  - Should be unique
  
- **Negative Cases:**
  - Should show error "Email is required" when empty
  - Should show error "Invalid email format" when email format is invalid
  - Should show error "Email must be unique" when email already exists

#### Phone Number Field
- **Positive Cases:**
  - Should accept and format phone numbers in XXX-XXX-XXXX pattern
  - Should automatically format numbers as user types
  - Should have placeholder text "Enter your phone number in XXX-XXX-XXXX format"
  - Should not accept non-numeric characters
  
- **Negative Cases:**
  - Should show error "Phone Number is required" when empty
  - Should show error "Phone Number format: XXX-XXX-XXXX" when format is invalid

#### Next Step button
- Should be enabled
- Should trigger an error message when one or more fields are invalid
- Should show "Next Step" text
- Should navigate to the Professional Information page

#### Progress Bar

- Should show 0% when no fields are valid
- Should show 12.5% when one field is valid
- Should show 25% when two fields are valid
- Should show 37.5% when three fields are valid
- Should show 50% when four fields are valid


## Professional Information Page

### Input Fields Validation - all fields are required and marked with *

#### Progress Bar
- Should show 62.5% when five fields are valid
- Should show 75% when six fields are valid
- Should show 87.5% when seven fields are valid
- Should show 100% when all fields are valid

#### Company Name Field
- Positive Cases:
  - Should accept alphanumeric characters
  - Should accept company names between 3-20 characters

- Negative Cases:
  - Should show error "Company Name is required" when empty
  - Should show error "Company Name must be at least 3 characters" when less than 3 characters
  - Should show error "Company Name must be less than 20 characters" when exceeds 20 characters
  - Should show error "Company Name can only contain letters and numbers" when contains special characters

#### Job Title Field
- Positive Cases:
  - Should accept alphanumeric characters
  - Should accept job titles between 3-20 characters

- Negative Cases:
  - Should show error "Job Title is required" when empty
  - Should show error "Job Title must be at least 3 characters" when less than 3 characters
  - Should show error "Job Title must be less than 20 characters" when exceeds 20 characters
  - Should show error "Job Title can only contain letters and numbers" when contains special characters

#### Interests checkboxes - unchecked by default
- Should be unchecked by default
- Should be checked when clicked

List of interests:
- AI
- Data
- Cloud
- Security
- DevOps
- Other

#### Subscribe to our newsletter for updates and offers checkbox - checked by default
- Should be checked by default
- Should be unchecked when clicked

#### I agree to the Terms and Conditions and Privacy Policy * (required)
- Should be unchecked by default
- Should be checked when clicked

##### Terms and Conditions - link to the Terms and Conditions page
- Should navigate to the Under Construction page

##### Privacy Policy - link to the Privacy Policy page
- Should navigate to the Under Construction page

#### Buttons

#### Back button
- Should be enabled
- Should show "Back" text
- Should navigate back to the Personal Information page

#### Register Button
  - Should be enabled
  - Should show "Register" text when not loading
  - Should trigger an error message when one or more fields are invalid
  - Should show "Submitting..." text with spinner during form submission
  - Should navigate to the Thank You page after successful submission


### Real-time Validation
- Should validate First Name on change and blur
- Should validate Last Name on change and blur
- Should validate Email on change and blur
- Should validate Phone Number on change and blur
- Should show error messages immediately below respective fields

### Form Submission
- **Success Flow:**
  - Should show loading state for 1.5 seconds
  - Should add customer to Customers after successful submission
  - Should trigger onSubmitSuccess callback with form data
  
- **Error States:**
  - Should maintain form state if submission fails
  - Should keep error messages visible if validation fails

## Visual Requirements
- Error messages should display with red color and alert circle icon
- Input fields should show red border when invalid
- Input fields should show default border when valid
- Progress bar should transition smoothly between states
- Form should have a semi-transparent background with blur effect