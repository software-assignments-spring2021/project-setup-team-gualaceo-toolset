# Guide to Contributing

### Instructions for Building and Testing

#### Building

- Clone the repository 
- Enter the front-end directory (`cd front-end`)
- run `npm start`
- Initialize a new shell
- Enter the back-end directory (`cd back-end`)
- run `npm start`
- You should now be able to access our site at http://localhost:3000 (Note: It is recommended you use responsive design mode in your browser, as the site is designed for mobile devices)
- You can also send requests to the back-end at http://localhost:5000

#### Testing

If you'd like to run our built in chai integration tests, do the following while the back-end is running
- Acquire a bearer token from Spotify
    - Visit this page https://developer.spotify.com/console/get-search-item/
    - Scroll down to where it says OAuth token
    - Click the corresponding button on the right (Get token)
    - Click "request token" on the popup that shows up
    - Copy the text which now exists in the textbox under Oauth token (Make sure to select all before copying)
- Enter the back-end directory in a new shell
- run `npm run test --bearer=<your bearer token>`

### Project Setup

- Regarding our technologies, we will be using VS Code along with the extension Live Share to collaborate on this project.

- This information will be provided in the [README.md](./README.md)

### Project's Values and Team Norms

- Consistent communication - Members should feel free to disclose any issues, concerns, or recommendations they have regarding the project.

- Effort and Commitment - Members should show up regularly to meetings and contribute consistently.

- Honesty - Members should be honest in communicating, especially in the Scrum meetings, whether it is about what they have done, what they will be doing, or what issues and blockers they are facing.

### Definition of "**Done**"

- This definition of the product's "done" will change, but our final definition of "done" will be our [Minimum Viable Product](./ProductVisionStatement.md).

- The definition of a main-branch-worthy "done" would be a fully implementable meaningful functionality that doesn't raise any bugs in the code and is runnable without any issues (or fixing bugs that do rise from the new function in the same pull request).

### Git Workflow

- We will follow the [feature branch version control workflow](https://knowledge.kitchen/Feature_branch_version_control_workflow), as specified for the course. A summary of some key points and our group rules is as follows, but I recommend reading the wiki post.
- Do NOT push directly to the master branch.
- Whenever making changes, create a new branch to work on. When you feel you've made enough changes, push your new branch to the github, and create a pull request. Assign someone on the team to review.
- If you are assigned to review a pull request, do so as soon as you can, and if everything is ok, merge it. Otherwise, explain what is wrong.
- Make sure to push your work frequenttly and make pull requests. Also, make sure to pull from the master branch before pushing.

### Some Rules

- _Anyone_ may make changes to the code, but we ask that you inform the team and specify what the newly added code does when submitting a pull request.

- When writing code, developers should leave clear comments about what their code is doing.

- Use 2 space size indents/tabs

### Conflict Resolution

- Please communicate any conflicts with the Scrum Master, Product Owner, or the team as a whole.

- Project-related conflicts could be addressed to the Product Owner.

- Conflicts relating to disagreements between members could be addressed by the Scrum Master.

- If the Product Owner or Scrum Master was involved in the conflict, those involved in the conflict could choose someone else to mediate it.

- If the designated person was unable to resolve the conflict or if a team member misses consecutive Scrum meetings, the issues will be raised to the management.

### Group Meeting Times

- Please note that this will be the Zoom ID for our meetings: 202 317 5679.

- We will meet for the Daily Scrum on Tuesdays, Thursdays, and Saturdays at 11AM EST.
