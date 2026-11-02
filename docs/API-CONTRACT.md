# API CONTRACT

## Hero Section
*GET /profile*
- Full Name
- HeadLine
- Hero Tag Line
- Profile Image

## About Section
*GET /profile*
- Bio
- Availability Status
- Years of Experience

## Projects
Projects will be dispalyed in three different ways. First a main featured projects section. Another will be wheer we can view all the projects and we can visist a deatield project page for every project out there. There will be a drafted projects section which will dispaly the upcomign projects or ideas.

*GET /projects/featured*
- For each project display
    - Title
    - Short Description
    - Category
    - Project Image
    - Github URL
    - Live URL
    - Tech Stack
    - Display Order
    - PUBLISHED

*GET /projects*
- For each expanded project
    - Title
    - Description
    - Key Hightlights
    - Tech Stack
    - Github URL
    - Live URL
    - Documentation URL
    - Start Date
    - End Date

*GET /projects*
- Project
    - Title
    - Short Description
    - TechStack
    - Category
    - DRAFTED


## Timeline

Entities will be aligned using the start year value and hovering each entity will display a small card with some more details.

*GET /educations*
- Education
    - degree
    - fieldOfStudy
    - institutionalName
    - startYear
    - endYear
    - institutionalLogoUrl
    - description
    - grade
    - relevantCourseWork

*GET /experiences*
- Experience
    - companyName
    - jobTitle
    - responsibilities
    - companyLogoUrl
    - location
    - description
    - startMonth
    - startYear
    - endMonth
    - endYear


## Skills
*GET /skills*
- Skill
    - name
    - category

