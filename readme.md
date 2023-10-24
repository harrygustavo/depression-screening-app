# Depression Screening for Veterans

## Overview
Users will create a profile using their email. Upon registration, they are required to provide FIRST NAME, LAST NAME, GENDER, E-MAIL, DOB, and ZIP CODE. Once registered, they can complete the PHQ-9.

### PHQ-9
The PHQ-9 is a diagnostic tool used for assessing and measuring depression severity. It consists of nine items, each scored from 0 (not at all) to 3 (nearly every day), reflecting symptoms experienced over the past two weeks. Scores range from 0 to 27, with higher scores indicating more severe depression. Moderate scores (>=10) are considered POSITIVE, while scores below 10 are NEGATIVE.

## User Flow

### Page 1: Welcome
- Welcome to the Depression Screening App for Veterans.
- Do you have an account? [Login] (Redirects to Page 3)
- Did you know that Major Depressive Disorder (MDD) rates among veterans can be as high as 20%?
- Button: [Take a Depression Screening] (Redirects to Sign Up).

### Page 2: Registration
- Let's get you registered! Only registered users can access the app.
- Fields: Name, Last Name, Gender, Date of Birth, Email, Zip Code.
- Button: Submit (Redirects to Page 3).

### Page 3: Home
- Hello ${name}, view your screenings by date here.
- Button: Complete a New Screening (Redirects to Page 4).

### Page 4: PHQ-9 Questionnaire
Over the last 2 weeks, how often have you been bothered by any of the following problems?

//A rule needs to be in place so that the user can only chose one
//User must complete the 9 questions to be able to submit

1. Little interest or pleasure in doing things.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

2. Feeling down, depressed, or hopeless.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

3. Trouble falling or staying asleep, or sleeping too much.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

4. Feeling tired or having little energy.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

5. Poor appetite or overeating.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

6. Feeling bad about yourself — or that you are a failure or have let yourself or your family down.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

7. Trouble concentrating on things, such as reading the newspaper or watching television.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

8. Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day

9. Thoughts that you would be better off dead, or thoughts of hurting yourself in some way.
   - 0: Not at all
   - 1: Several days
   - 2: More than half the days
   - 3: Nearly every day


### Page 5: Results
if total score is < 10 and question 9 score = 0, it will render:

At this time your depression screening result is negative. No further action is needed. However, if any of the symptoms discussed in the screening appear for more than two weeks, feel free to retake the screening as needed for further recommendations. 

if the total score is >= 10:

At this time your screening is Positive:
Consult with a physician or mental health clinician. Here are some of the closest VA Clinics to you. 

If suicidality question number 9 score is > 0:
Consider contacting 988 or talking to someone live at the Crisis chat link to the veteran crisis line

## End of Flow
- Button: Return Home (Redirects to Page 3).

NOTES:

### My Database Name

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',  
        'NAME': 'phq9database', 
        'USER': 'admin', 
        'PASSWORD': 'password',
        'HOST': 'localhost', 
        'PORT': '5432',  
    }
}# depression-screening-app
