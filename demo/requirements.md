Generate a User Story based on the requirements below. Create one MD file. Make sure the User Story is accurate and covers all requirements strictly. Do not use Given-When-Then format.

# Registration Form Test Requirements

## Input Fields Validation

### Username Field
- **Positive Cases:**
  - Should accept alphanumeric characters
  - Should accept usernames between 3-20 characters
  - Should accept unique usernames
  
- **Negative Cases:**
  - Should show error "User Name is required" when empty
  - Should show error "User Name must be at least 3 characters" when less than 3 characters
  - Should show error "User Name must be less than 20 characters" when exceeds 20 characters
  - Should show error "User Name can only contain letters and numbers" when contains special characters
  - Should show error "User Name must be unique" when username already exists

### Email Field
- **Positive Cases:**
  - Should accept valid email format (example@domain.com)
  
- **Negative Cases:**
  - Should show error "Email is required" when empty
  - Should show error "Invalid email format" when email format is invalid

### Phone Field
- **Positive Cases:**
  - Should accept and format phone numbers in XXX-XXX-XXXX pattern
  - Should automatically format numbers as user types
  
- **Negative Cases:**
  - Should show error "Phone is required" when empty
  - Should show error "Phone format: XXX-XXX-XXXX" when format is invalid

## Form Behavior

### Progress Bar
- Should show 0% when no fields are valid
- Should show 33.3333% when one field is valid
- Should show 66.6666% when two fields are valid
- Should show 100% when all fields are valid

### Submit Button
- **Enabled State:**
  - Should be enabled (not clickable) only when all fields are valid - important part
  - Should show "Submit" text when not loading
  
- **Disabled State:**
  - Should be disabled when any field is invalid
  - Should be disabled during form submission
  - Should show "Submitting..." text with spinner during form submission

### Real-time Validation
- Should validate username on change and blur
- Should validate email on change and blur
- Should validate phone on change and blur
- Should show error messages immediately below respective fields

### Form Submission
- **Success Flow:**
  - Should show loading state for 1.5 seconds
  - Should add customer to context after successful submission
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