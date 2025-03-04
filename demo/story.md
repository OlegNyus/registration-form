Here is the user story based on the requirements. Create comprehencive test plan. Cover ALL requiremnents including positive and negative cases.
Output is a table. Also, count the number of test cases.

# Registration Form User Stories

## Username Field Validation

As a user filling out the registration form
I want to enter a valid username
So that I can create my account with a unique identifier

**Acceptance Criteria:**
1. When I enter a username with alphanumeric characters between 3-20 characters
   Then the field should accept the input
   And show a default border indicating validity

2. When I leave the username field empty
   Then I should see the error "User Name is required"
   And the field should have a red border

3. When I enter less than 3 characters
   Then I should see the error "User Name must be at least 3 characters"
   And the field should have a red border

4. When I enter more than 20 characters
   Then I should see the error "User Name must be less than 20 characters"
   And the field should have a red border

5. When I enter special characters
   Then I should see the error "User Name can only contain letters and numbers"
   And the field should have a red border

6. When I enter a username that already exists
   Then I should see the error "User Name must be unique"
   And the field should have a red border

## Email Field Validation

As a user filling out the registration form
I want to enter my email address
So that I can be contacted and verify my account

**Acceptance Criteria:**
1. When I enter a valid email in the format example@domain.com
   Then the field should accept the input
   And show a default border indicating validity

2. When I leave the email field empty
   Then I should see the error "Email is required"
   And the field should have a red border

3. When I enter an invalid email format
   Then I should see the error "Invalid email format"
   And the field should have a red border

## Phone Field Validation

As a user filling out the registration form
I want to enter my phone number
So that I can be contacted if necessary

**Acceptance Criteria:**
1. When I enter numbers in the phone field
   Then they should automatically format to XXX-XXX-XXXX pattern
   And show a default border indicating validity

2. When I leave the phone field empty
   Then I should see the error "Phone is required"
   And the field should have a red border

3. When I enter an invalid phone format
   Then I should see the error "Phone format: XXX-XXX-XXXX"
   And the field should have a red border

## Progress Bar Behavior

As a user filling out the registration form
I want to see my progress
So that I know how much of the form I've completed correctly

**Acceptance Criteria:**
1. When no fields are valid
   Then the progress bar should show 0%

2. When one field is valid
   Then the progress bar should show 33%

3. When two fields are valid
   Then the progress bar should show 66%

4. When all fields are valid
   Then the progress bar should show 100%

5. When progress changes
   Then the progress bar should transition smoothly

## Submit Button Behavior

As a user filling out the registration form
I want clear feedback on form submission status
So that I know when I can submit and what's happening

**Acceptance Criteria:**
1. When all fields are valid
   Then the submit button should be enabled
   And display the text "Submit"

2. When any field is invalid
   Then the submit button should be disabled

3. When the form is being submitted
   Then the submit button should be disabled
   And display the text "Submitting..." with a spinner
   And remain in this state for 1.5 seconds

## Real-time Validation

As a user filling out the registration form
I want immediate feedback on my input
So that I can correct errors as I type

**Acceptance Criteria:**
1. When I type in any field
   Then it should validate in real-time
   And show any errors immediately below the field

2. When I leave a field (blur)
   Then it should validate
   And show any errors immediately below the field

## Form Submission

As a user filling out the registration form
I want to submit my information
So that I can complete the registration process

**Acceptance Criteria:**
1. When I submit with valid data
   Then I should see a loading state for 1.5 seconds
   And be added to the customer context
   And trigger the onSubmitSuccess callback with my data

2. When submission fails
   Then the form should maintain its current state
   And keep showing any error messages
   And allow me to try submitting again

## Visual Design

As a user filling out the registration form
I want a clear and responsive interface
So that I can easily understand the form's state and any errors

**Acceptance Criteria:**
1. When there are errors
   Then they should appear in red
   And display with an alert circle icon

2. When fields are invalid
   Then they should have a red border

3. When fields are valid
   Then they should have the default border

4. When viewing the form
   Then it should have a semi-transparent background
   And display with a blur effect