# Raptor Health Tracker
![image](assets/responsive-img.png)

The Raptor Health Tracker is a web app designed to aid Falconers, Trainers and Rehabilitation specialists 
who work with birds of prey.
Raptors, Crows and Vultures require strict tracking of their food intake, 
their weight and exercise routines.
With the ability to upload photos and track numerous other data, 
The Raptor Health Tracker is here to help to keep the data coherent. 

## Live Site
https://raptor-health-tracker-670ca7ff3a4d.herokuapp.com/

## Repository
https://github.com/Drekkg/Raptor_Health_Tracker.git

## Author
Derek Garnett

# Table of contents
- [Raptor Health Tracker](#raptor-health-tracker)
  - [Live Site](#live-site)
  - [Repository](#repository)
  - [Author](#author)
- [Table of Contents](#table-of-contents)
- [UX](#ux)
  - [Target Audience](#target-audience)
  - [Design Choices](#design-choices)
  - [Wireframes](#wireframes)
- [Information Architecture](#information-architecture)
  - [Entity Relationship Diagram](#entity-relationship-diagram)
  - [Database Choice](#database-choice)
- [Data Models](#data-models)
  - [The Models](###Breakdown-of-the-Models)
  - [Comments](#comments)
  - [Profile](#profile)
- [Agile Process](#agile-process)
  - [Project Goals](#project-goals)
  - [Initial User Stories](#initial-user-stories)
  - [Scope](#scope)
- [Features](#features)
  - [Implemented Features](#implemented-features)
  - [Future Features](#future-features)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Defensive programming testing](#defensive-programming-testing)
  - [Compatibility and Responsive Testing](#compatibility-and-responsive-testing)
  - [Accessibility Testing](#accessibility-testing)
  - [Validation Testing](#validation-testing)
- [Defects](#defects)
  - [Defects of Note](#defects-of-note)
  - [Outstanding Defects](#outstanding-defects)
- [Technologies Used](#technologies-used)
  - [Languages](#languages)
  - [Frameworks, Libraries & Programs Used](#frameworks-libraries--programs-used)
- [Deployment](#deployment)
  - [Fork and Clone the Repository](#fork-and-clone-the-repository)
  - [Development Deployment](#development-deployment)
  - [Production Deployment](#production-deployment)
- [Credits](#credits)
  - [Media](#media)
  - [Acknowledgments](#acknowledgments)

# UX
## Target Audience
People who work with birds are well aware of how sensitive they are. Small problems can escalate really quickly.
Having the data on hand, on-line and easy to read helps make informed decisions.
Birds in breeding programs and rehabilitation centers need constant observation and tracking of various metrics:
- The bird's weight - it is crucial to notice any fluctuation in weight, especially a decrease. Measurements are taken daily, sometimes twice or more.
- Food intake - relative to weight the bird needs sufficient nourishment.
- Excercise - for their psychological well being, birds needs sufficient free flight and other stimulating activities.
The Raptor Health Tracker is here to digitalise the tracking process. Paper forms can be lost or become unreadable - birds of prey have sharp beaks and talons and enjoy shredding(and pooping on) unattended folders.
Also the ability for interested parties - vets, specialists etc, to remotely track the birds online.

## Design Choices
### Colors
![image](assets/colours.png)

The colour palette is from coolors.co
Lots of blue in different shades to evoke empty skies. Who doesn't want to be a bird - at least sometimes.
Natural greens to fit the conservation theme.


### Typography
I chose a basic font for readability.
- Roboto
- Lato 
From google
### Frameworks, plugins, tools used
- Bootstrap
- Django
- req.txt:
 -- asgiref==3.8.1
 -- cloudinary==1.36.0
 -- crispy-bootstrap5==0.7
 -- dj-database-url==0.5.0
 -- dj3-cloudinary-storage==0.0.6
 -- Django==4.2.14
 -- django-allauth==0.57.2
 -- django-crispy-forms==2.3
 -- gunicorn==20.1.0
 -- oauthlib==3.2.2
 -- psycopg2==2.9.9
 -- PyJWT==2.9.0
 -- python3-openid==3.2.0
 -- requests-oauthlib==2.0.0
 -- sqlparse==0.5.1
 -- urllib3==1.26.19
 -- whitenoise==5.3.0


## Wireframes
Landing - Login page:

![image](assets/log-in.png)



Bird List Page:

![image](assets/bird-list.png)

 Bird detail page:

![image](assets/bird-detail.png)

Back to bird list button - 
Edit Bird Button - 
Delete Bird Button

![image](assets/buttons-page.png)

Add bird daily data form

![image](assets/daily-fom.png)

Daily data accordion displaying essential data

![image](assets/daily-data-accordion.png)



# Information Architecture
## Entity Relationship Diagram
![image](assets/erd.png)

## Database Choice
- postgres relational database 
- heroku servers
- Cloudinary
# Data Models
- Users can add daily data
- Users can also register and start adding data. In production users would have to be vetoed by an admin to prohibit malicous or incompetent 
users adding data, but in lieu of this project I gave users the ability to create data.
- Logged in Admin can add birds, delete birds, delete bird daily data and edit bird data. 

## Bird Daily Data
The bird daily data view/page is the main feature of the app. Users can quickly scan and check the selected bird's weight. Clicking on the accordion will reveal all daily bird data. The user can also effortlessly add daily data.
### CRUD
- **Create:** Registered users can add daily data
- **Read:** Logged in users can read all entered data.
- **Update:** Only Administrators/super-users can edit data. 
- **Delete:** Only Administrators/super-users can delete data. 

## Breakdown of the Models
The various imports on which the models rely
![image](assets/model_imports.png)

### The Bird model
![image](assets/bird_model.png)
Custom models:
### All custom models use form validation- either max_length of string; unique entry(where appropriate); null entry not allowed.
### The cloudinary entry uses validation to check if the data being uploaded is a valid image. This occurs in the appropiate view.

### The Daily Data model
![image](assets/daily1-data_model.png)
### All custom models use form validation- either max_length of string; max integer input; unique entry(where appropriate); null entry not allowed.
### The cloudinary entry uses validation to check if the data being uploaded is a valid image. This occurs in the appropiate view.


# Agile Process
## Project Goals
- Users can add and read bird daily data
- Admin can edit and delete bird data
- Admin can from the Admin dashboard edit and delete users; edit and delete birds; edit and delete daily data.
 
## Initial User Stories
[GitHub Project] (https://github.com/users/Drekkg/projects/6/views/1)

I used the MOSCOW principal to help me decide what features to include and which features to add in a futere iteration.\
I first got a minimal viable product and then added extra features.\
A few features on the todo list will be added in futere iterations.

![image](assets/github_project_screenshot.png)

![image](assets/git_hub_ac_props.png)
### specifications changed during development
Example: Changed the ability to add birds to the table from normal User to Admin


## Scope
When I started my project I was very ambitious to develop a complete portal for gamers to search online for friends, teams and improve their skills. I imagined custom applications, profiles, filtering tools, game sections, guilds, and many more...
But in the middle of developing, I realized that this may take much more time than I had to make it good.
I've created a functional website working similarly to a blog website where people can connect and make an advert. All previous ideas are still in GitHub user stories for this project.

# Features
## Implemented Features
- unauthenticated users can view only the landing page
- defensive programming has been used to protect tampering pages without authentication
- users can register an account
- usernames and email addresses must be unique
- a superuser account has been created (admin)
- all users can create posts (Team Ads), edit and delete them (if they are authors, authentication is implemented)
- all users can create a comment to existing post (Team Ad), edit and delete (if they are authors, authentication is implemented)
- admin can edit or delete any post, comment or remove user from admin panel
- site has a sticky navigation bar, main section and a footer
- each page is customised (signup, login, logout)
- 404 and 500 error pages are customised
- profile page for every user to see data passed on registration
- when creating a post (Team Ad), users can choose from list of games and skill levels
- users can add their own image to a post (Team Ad)
- success messages
- Favicon

The site has a common navbar (sticky to the top when scrolling), and footer.

![image](https://github.com/PPindel/esports-teammates/assets/114284732/e160e81d-07f4-4581-98c0-0ba1cbb484b4)
![image](https://github.com/PPindel/esports-teammates/assets/114284732/d604e5db-cefe-424b-a328-56ed0d9f2965)

Up to six posts per page, two rows of three posts for desktops, and one column for mobile phones.

![image](https://github.com/PPindel/esports-teammates/assets/114284732/a1bc8c5e-24a9-4d48-aa38-dc9c1bf73e1b)
![image](https://github.com/PPindel/esports-teammates/assets/114284732/60bdad1b-6473-4965-a7fb-cbae164b295d)

Landing page for not authenticated users:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/3a38c9fb-76dd-4564-b91c-3ee9995a1ca3)

Buttons are changing colors when hovering over:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/9ad37536-54e1-4608-8fc4-c655162a72dd)
![image](https://github.com/PPindel/esports-teammates/assets/114284732/eba8cb26-a89f-4147-b69f-fce54cc0c267)

All default Django pages (signup, login, etc.) are customised:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/906e3e34-96da-4922-80e3-dca435e099d8)

Custom 403, 404 and 500 error pages:

![obraz](https://github.com/PPindel/esports-teammates/assets/114284732/88bfae82-48ce-4bfe-88b6-0b5f5f9a8069)
![image](https://github.com/PPindel/esports-teammates/assets/114284732/9621e955-8577-4f84-81ef-e5cc63612f3d)
![image](https://github.com/PPindel/esports-teammates/assets/114284732/031702af-1700-413f-8b42-0c3475748df3)

JS script for alerts:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/a05ee5b3-523b-44d1-8896-f55e322a273c)

Simple profile page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/e874c26c-b37b-4668-a805-44f3b9f524d3)

Admin page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/1c2b2645-fa2d-4f64-ac6e-7346f6612fc6)

Favicon:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/e2800df0-5201-4904-9053-6aba3e9c947a)

User who is trying to tamper (for example open edit page of the ad they don't own) the site will see this page (defensive programming implemented):

![image](https://github.com/PPindel/esports-teammates/assets/114284732/b686843f-a256-4622-9f2c-280e5c4f1722)

Unique email required:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/1d9f8d84-2a12-446e-9cf2-e6d33aaff260)

Unique username required:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/aab7dbb3-a717-413c-9f58-49976479d04f)

Superuser authentication:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/05b9e16f-0ed3-46f4-9b87-b208ae691104)

The video below shows registration process and functionality of the site:

[Screenshare - 2023-05-31 4 34 11 PM.webm](https://github.com/PPindel/esports-teammates/assets/114284732/af6aec01-671a-4e9f-9bbb-4bf7b09bb114)

Link to my user stories:
https://github.com/users/PPindel/projects/4

## Future Features
- team apply button and form. Currently, users can apply to join a team by comments, in the future I am planning to create an application form for this
- search filter on top of the page to display particular game or skill level
- Team Ad owners will be able to accept od reject a joing team application
- more games and templates (as different games have different options, positions, etc.)
- upgrade profile page so users can ad a description, skill level, favourite games, and comment counter

# Testing
## Manual Testing
![image](https://github.com/PPindel/esports-teammates/assets/114284732/b473d591-f60a-4a17-8f13-6cb30acf9aa7)

https://docs.google.com/spreadsheets/d/1cDYbaHAq-m419ljRykuiJm_YKTj6cpFw6ZTD3LT2aIM/edit?usp=sharing

## Defensive programming testing

In the video below, I would like to present some defensive programming implemented in my project:

[Screenshare - 2023-06-02 1 19 36 PM.webm](https://github.com/PPindel/esports-teammates/assets/114284732/bb3aff5e-ad97-4125-8efb-83d34de00b19)

## Compatibility and Responsive Testing

Iphone 12, Safari:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/550f216d-7465-4a46-b4d0-2e790c8afad5)

Iphone 14 Pro, Safari:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/ac0cbf3b-6991-4a16-a556-bd87f224c420)

Ipad 11 Pro, Safari:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/4d0dda90-425c-4c68-bab7-a78427e0b13e)

Samsung Galaxy S21, Chrome:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/dcb15eec-2947-4a9e-91e3-753061c593e5)

Google Pixel 7, Chrome:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/556184ff-dc29-4289-8589-93ae6d4c3e8e)

Desktop, Windows 11, Chrome:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/c9813b9a-dbc8-4e12-93ba-1c1c6b1ae2e6)

Source: https://live.browserstack.com

As the most popular browsers in Europe are Chrome and Safari, I deceided to focus on these 2 browsers.

![image](https://github.com/PPindel/esports-teammates/assets/114284732/61dd5783-ab40-46a8-96c0-383f69f5834c)

Source: https://gs.statcounter.com/browser-market-share/all/europe

## Accessibility Testing
Accessibility features has been implemented to Esports Teammates.
Aria labels and descriptions are added.
The site is optimized for desktop and mobile devices, please see below the Lighthouse audits:

Desktop landing page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/366cb896-4382-4024-aaeb-de4767f2ec81)

Mobile landing page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/646c8e7a-d185-4e3b-bd19-cb723e907022)

Desktop main page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/eeea49e8-4754-4704-88b2-a3c44d9efcc7)

Mobile main page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/6018dbd3-bef0-43d8-b85e-57579b81ad85)

Desktop team detail page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/386ba0e5-f2e8-4299-afe0-ab733616374a)

Mobile team detail page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/a92919f8-09b9-4b8a-9291-7db857b14587)

### Keyboard Navigation
Esports Teammates is optimized for keyboard navigation!

## Validation Testing
### CSS Validation
The [Jigsaw validator](https://jigsaw.w3.org/css-validator/) was used to validate CSS.
No errors were found.

![image](https://github.com/PPindel/esports-teammates/assets/114284732/4700efa2-1821-44f0-9ec3-219209e85671)

### HTML Validation
The **[W3 HTML Validator](https://validator.w3.org/)** was used to validate HTML by coping the page source as a direct input.
No errors were found.

Landing page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/068dfa08-fcc7-4fde-8d80-fae7abe3c19a)

Signup page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/a1010812-5d6e-4aa2-a84a-e54ae28c5b1a)

Login page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/859d4764-485e-4e6e-8c25-c94707aec4a8)

Home page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/f824bb0c-b579-4091-8d89-f427f67375e3)

Team Detail page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/49ac477d-a53b-47d3-894b-8bfd35420d4d)

Add Team Ad page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/d0e4cdc0-59d1-4bd6-b07e-55d6c2770f07)

Sign out page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/97f7e5ed-a91e-4e3f-b297-d3474c89168b)

Edit Team Ad page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/7429242d-a9d3-4a3c-bbd1-eb9f4e0b10f9)

Delete Team Ad page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/ae031252-c0e9-482f-a1cf-e6c1589c9db6)

Edit comment page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/2e6e214c-650a-4802-9f6a-d9258a51e89a)

404 error page:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/47305e86-41f4-4bf5-abcf-ed75ecd0e32a)

### JavaScript Validation
The **[Jshint validator](https://jshint.com)** was used to validate the JS function.
No errors were found.

![image](https://github.com/PPindel/esports-teammates/assets/114284732/5b02c45b-428f-4f8a-b204-4e224443ba9f)

### Python Validation
**[CI's pep8 tool](https://pep8ci.herokuapp.com/)** was used to validate each .py file created.
No errors were found.

In Blog folder:
admin.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/0f96eabe-e1c3-4683-9010-00145026a624)

apps.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/e549cfd6-bfe7-4c42-a390-1523579e7db7)

forms.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/cb067742-55c6-4099-ae00-685f7a43b4f8)

models.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/e94fc459-d7d2-4475-870f-08768aac46d1)

urls.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/f31620f9-39e4-437e-9ae9-dee39ddcba3b)

views.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/f09d16da-35ff-4d20-a84b-8d0b76776c64)

In teamfinder folder:
asgi.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/e322521c-b17e-4a2b-9769-2e8f2b58a4e9)

settings.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/0cffe5e8-7e2f-454e-8f6b-01276bd7e2a6)

urls.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/bbf374c9-7d6a-4c44-80e0-3f0b85b80f44)

util.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/75e90b6a-2178-495e-b369-322e7928bfa3)

wsgi.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/4687d15d-375d-47b6-a7fe-f7be66f89c2e)

In main folder:
manage.py:

![image](https://github.com/PPindel/esports-teammates/assets/114284732/cd2f8062-c6c1-4495-92a5-6a04f47d6be9)

# Defects
- my first defect was revealing the secret code to the github. Currently, the secred code is changed and protected, and the project is safe (occured on 14th of March, fixed on 14th of March)
- author tag was not displaying correctly (occured on 29th of March, fixed on 29th of March)
- no redirection after submitting the ad (occured on 29th of March, fixed on 29th of March)
- no authentications for Team Ad authors (anyone could edit the ad) (occured on 17th of April, fixed on 17th of April)
- logo for small devices was too wide, so the site wasn't looking good (occured on 31st of May, fixed on 31st of May)

## Defects of Note
![image](https://github.com/PPindel/esports-teammates/assets/114284732/431bbfed-3330-455e-b5b7-08fbcae1a6bf)

When I encountered this bug, I was seriously afraid.
After typing only special chars in title of the TeamAd, the whole site crashed, and all I could see was 500 error.
Changes in gitpod didn't work, I had to remove the fatal post via admin panel and then restrict title to alphanumeric only to prevent this happen again.
That's why you can see some special chars in old posts, but currently it is blocked.
Occured on 31st of May, fixed on 2nd of June.

## Outstanding Defects
- Logo and navbar sometimes behaves weird in the Safari browser (not always, that's why I deceided to fix this bug in the future)

# Technologies Used
## Languages
- html
- css
- java script
- python
- django

## Frameworks, Libraries & Programs Used
- Balsamiq
- Coolors.co
- fontawesome
- pexels.com
- gitpod
- github
- google fonts
- https://techsini.com/multi-mockup/index.php - responsiveness
- table of contents creator
- markdown table generator
- Heroku
- Cloudinary
- ElephantSQL
- Bootstrap

# Deployment 
## Fork and Clone the Repository
To keep the main reposotory for this project clean, please fork the repostiory into your own account. GitHub has [forking directions](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) but here's what you might do:
1. login to your own gitHub account
2. navigate to [my repository](https://github.com/PPindel/esports-teammates)
3. In the top right corner of the page, click fork 

![image](https://user-images.githubusercontent.com/23039742/213840378-e785eaa0-712b-468c-bcda-64fde56eae44.png)

4. set yourself as the owner
5. change the name of the repo if you want
6. add a description if you want
7. choose what to copy, typicall the main branch only
8. click the snazy green button

![image](https://user-images.githubusercontent.com/23039742/213840549-5bef12ae-198e-412b-84b6-0cc718b6fa1d.png)

9. To get files to your local environment, you need to clone it: click the code button
10. Copy the url as needed (here's gitHub instructions)[https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository}

## Development Deployment
- Install required python packages: `pip3 install -r requirements.txt`
- Create env.py
- In env.py:
>  - os.environ["SECRET_KEY"] = "<YOUR_VALUE>"
>  - os.environ["CLOUDINARY_URL"] = "<YOUR_VALUE>"
>  - os.environ["DATABASE_URL"] = "<YOUR_VALUE>"
- Apply Database Migrations so the database starts up `python3 manage.py migrate`
- Create a super user so you can add and inspect things via django admin  `python3 manage.py createsuperuser`
- Start the server `python3 manage.py runserver`

## Production Deployment
- create new Heroku app

![image](https://github.com/PPindel/esports-teammates/assets/114284732/3f4174b5-8e47-445b-a66a-207e2fe84fc6)

- set app name and select your region

![image](https://github.com/PPindel/esports-teammates/assets/114284732/19841c4c-3ad8-47a1-ab01-310e5d9aaedb)

- login to ElephantSQL, access the dashboard and create a new instance (input a name, select a region), then return to dashboard, copy the database URL

![image](https://github.com/PPindel/esports-teammates/assets/114284732/3a9ac5d3-14bb-4ef3-87b7-62bcc398fbce)

- login to Cloudinary, access the dashbord and copy your API key

![image](https://github.com/PPindel/esports-teammates/assets/114284732/c1069f1a-9bdb-41e4-bb35-ad0bc7c6e14f)

- add environmental values (some of variables are identical as in your env.py file)
>  - SECRET_KEY
>  - CLOUDINARY_URL
>  - DATABASE_URL
>  - COLLECT_STATIC
>  - Port

![image](https://github.com/PPindel/esports-teammates/assets/114284732/a5fa519b-827e-4377-9729-7717880564d5)

- add build packages

![image](https://github.com/PPindel/esports-teammates/assets/114284732/101d23b5-f300-42a1-abe1-83737b695627)

- connect to github

![image](https://github.com/PPindel/esports-teammates/assets/114284732/9c005f23-ef9b-4e6d-aefa-f559254d291e)

- deploy! (remember to watch monitor logs for any deployment issues)

![image](https://github.com/PPindel/esports-teammates/assets/114284732/07141992-6ee6-48b5-8332-4b9d7a81c63b)

# Credits

- https://www.geeksforgeeks.org/ - code solutions
- https://stackoverflow.com/ - code solutions
- https://www.w3schools.com/ - code solutions
- https://learndjango.com - code solutions
- https://github.com/CaraMcAvinchey/stem-and-leaf-blog - some code inspirations
- https://www.youtube.com/@Codemycom - Create A Simple Django Blog by John Elder
- https://github.com/Code-Institute-Org/gitpod-full-template - Code Institute Template
- https://live.browserstack.com - live testing devices

## Media

- https://pexels.com
- (users can add their own pictures to Team Ads, so I cannot point the source of all images...)

## Acknowledgments

Big thanks to Malia Havlicek - Code Institute mentor for her ideas and support in this project! Also, I would like to thank all my friends for live testing the program!

https://pep8ci.herokuapp.com/ - code validation tool