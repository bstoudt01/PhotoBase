# PhotoBase - A Place Where Photos Go To Live!
 <p>  | <p>
------------ | -------------
<h3> Created By Brett Stoudt  <br/> <h4>Front End Developemnt Capstone - Cohort 41, Nashville Software School</h4> </h3>

## About PhotoBase
Expanding your reach can be hard work, right? PhotoBase expands the reach of professional
photographers by reducing the time it takes to advertise and share their works. 

### Heres Why
-  Easy to access free use advertising potential, we help your company grow
-  Easy to share images in custom sizes with no additonal effort, we do it for you
 

### Built With
- [GitHub](http://github.com)</br>
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2019)</br>
- [.Net Core](https://dotnet.microsoft.com/)</br>
- [ImageSharp](https://sixlabors.com/products/imagesharp/)</br>
- [Create-React-App](https://create-react-app.dev/)</br>
- [React Bootstrap](https://react-bootstrap.netlify.app/)</br>

## Getting Started

### Setup
1. Clone and enter the project directory
2. Start Visual Studio 
3. from visual studio solution view ```run server```
4. from project directory "cd photopromoApp/client"
5. ```npm start```


### User Experience
1. Click Register New User 
- Enter Email, Username, FirstName, LastName, Password, Confirm Password, and the optional fields of Company Name, facebookUserId.
    - Authentication is secured, using Firebase

2. Current User Login Experience: use email and password used during registration from the login page

3. Create a new gallery
from gallery list view
- Name is <b>Required</b>

4. Add Photo
from Add Photo users can add the image thet would like to upload and input info about the photo.
- Upload photo Image file, view file via the image preview <b>Required<b>
- Name of photo <b>Required</b>
- Attribute who the photo was taken by or other information
- Choose a Gallery from your gallery options <b>Required<b>
- Determine if the photo will be free use or private, it is private by default.
- Add Photo

5. View Gallery List
from the gallery view you can see how many photos are in each gallery
- users can edit gallery names, and delete galleries that contain no photos.
- users can create new galleries

6. View Photos in Galleries
when viewing a gallery that contains photos
- users can hover over images to see properties such as name, attribute and if it is marked for free use.
- users can edit and delete photos
- useres can access a details view that contains a link to their image for sharing, the properties of the image and a larger view of the image
- the link provided allows whoever accesses the link the ability to determine the photo dementions by providing the width they would like, 
and aspect ratio will keep the height at the correct value.
- these links can be shared with trusted sources.

7. View Random Photo on homepage
from the homepage anyone can view photos marked free use via a random photo generator and re-render button.
- anyone accessing PhotoBase has access to the random photo generator
- this generates images from photos marked as "free use / public"
- the generator also provides custom size options for the photo demensions.

8. Login / Logout / Registration
- available on the navigation bar when accessing routes on the site that are not a perscribed photo link




## Contact
Brett Stoudt - BStoudt01@Gmail.com</br>
Project Link: [PhotoBase](https://github.com/bstoudt01/PhotoBase)

## Sources
- [ImageSharp](https://docs.sixlabors.com/)
- [How to: ImageSharp](https://andrewlock.net/using-imagesharp-to-resize-images-in-asp-net-core-part-4-saving-to-disk/)

## Acknowledgements
Big Thanks to my instructor Andy and TA's Rose, Moe, and Spencer 
...I feel that learning increases in group projects with the added benifit of bouncing around ideas and talk through logic. 
Cohort 41 has been an amazing group of people that I am luck to call Classmates, Cheers to Cohort 41!
