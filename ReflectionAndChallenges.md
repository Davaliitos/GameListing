# Unity Games Listing challenges

Hi Unity. I enjoyed creating this project, it allowed me to demonstrate most of the abilities I have acquired as a Software Engineer.

As I read the challenge instructions I felt a little bit relieved. I felt that I have the necessary knowledge to create this application, I just needed to decide the best way to handle each task.


# REST API Server

I started working with the REST API server, this was the center of the project. NodeJS is the backend framework where I feel most comfortable, so I decided to use it, and it has all the features this project requires.

When it was time to decide which database to use, I decided to go with AWS DynamoDB. A NoSQL database was the best option for an application like this. I decided to use AWS because they offer all the infrastructure that we need and because it is the cloud provider that I know the most.

To hardest challenge for me was how to handle the environment variables (AWS Secrets). I'm still finding it difficult to find the best approach to handle them. There are many ways. I decided to create an AWS user that has the required permissions and added those credentials as an environment variable.

I decided to use TypeScript for the server project. TypeScript will prevent type errors across the project.

## Ideal Features

I wanted to create the premium listing feature. I added an `isPremium` field to the `GameItem` object, this value would have determined if a game is considered premium or free tier.

I didn't follow through with this feature because I didn't understand how a user from the Unity app would unlock these games. 

If I had more time with this project, I would have created a few more tables.
  - A `users` table - This table would have handled the users that have access to the premium titles
  - An `administrators` table - This table would have handled the users that have access to front end app. The creation of `GameItems` should be restricted

I would have also created an entire route that handles specific requests for these tables. Handle authentication with Auth0 and add the necessary restriction to the `GameItem` routes.

## Docker Image

I created a Dockerfile, with this file I was able to create the image and deploy it into an EC2 instance. You can access the online project here:

```bash
http://3.133.120.184:8000/
```

For this process, I had to create the docker image manually and I also pull it from Docker Hub manually from the EC2 Instance.

Ideally, I would have created a CI/CD process, using GitHub workflows, or Travis CI, or AWS Services(CodeBuild, CodeDeploy, CodePipeline). 

Every time someone pushes to the main branch or creates a merge request, a docker image would be created, and pushed to docker hub. This process could have handled my environment variables in a safe way. 

I also could have added a service like AWS ECS or AWS EKS that deployed the new Docker image into my EC2 instance every time a change is made.



# React App

For the React App, I decided to use an UI Web Framework called Arwes. https://arwes.dev/

This framework provided some components that helped me to create a better looking application. I decided to use it so the project looked better and I could work only on the important parts of this app.

I also used a helper library called Formik to handle the form validation. I have created these functions before but I didn't want to lose time on this.

## Ideal Features

If I had decided to create the `administrators` table, I would have added the project inside protected routes. I would have created a Login form, and depending on the requirement, I would have used a regular sign-in process or signing in with Google,FB, etc.

I also didn't add a PUT or PATCH method. I didn't add it because I didn't want to lose time creating the required frontend components. But, it would have been a very similar process as the creation. Adding the required endpoints to the REST API would be similar as well.


# Unity App

The Unity App was a little scary, I wasn't sure of what I was supposed to do. After finishing the REST API and the React APP, I took my time reading the code that I had.

One of the things that I noticed is that the default project did not show any images, although the image urls that were provided on the test json file worked. So, I researched a little about how to show images from a url. I wasn't sure if that was the best approach, but I wanted to do it similarly as the frontend.

After a little bit of research and testing, I was able to show the images of the games in the database, and they looked okay inside the carousel.

The only thing missing was the category title.

I noticed the method `UICarousel.Init("category should be here", listings);` and  that's when I decided to organize the game listing by category, and created one caroussel per category. I decided to create the carousels the same way you created the panels.


# Conclusion

I enjoyed the project and I hope that you will like the end result.













