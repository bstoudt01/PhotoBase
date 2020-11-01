using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using PhotoPromoApp.ImageHandlers;
using System;
using SixLabors.ImageSharp.Advanced;
using PhotoPromo.Models;
using PhotoPromo.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace PhotoPromoApp.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _webhost;
        private readonly IPhotoRepository _photoRepository;
        public ImageController(IWebHostEnvironment webhost, IPhotoRepository photoRepository)
        {
            _webhost = webhost;
            _photoRepository = photoRepository;
        }

        [HttpPost]
        public IActionResult Add(IFormFile file)
        {

            //where images are stored
            var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
            try
            {
                using Image image = Image.Load(file.OpenReadStream());
                {
                    //1.4 MP 3:2
                    //Low Resolution Image Encoder
                    int maxWidthLowRes = 1440;
                    int newHeight = 0;
                    if (image.Width > maxWidthLowRes)
                    {
                        //saves image with width of 1440, height is determined by imagesharp to keep aspect ratio (set height to 0)

                        using (Image lowResCopy = image.Clone(x => x.Resize(maxWidthLowRes, newHeight)))
                        {
                            string FileName = "low_" + file.FileName;
                            lowResCopy.Save(savedImagePath + FileName);
                        }

                    }
                    else
                    {
                        //saves image with actual width and height
                        string FileName = "low_" + file.FileName;
                        image.Save(savedImagePath + FileName);

                        //using (Image lowResCopy = image.Clone(x => x.Resize(image.Width, image.Height)))
                        //{
                        //    string FileName = "low_" + file.FileName;
                        //    lowResCopy.Save(savedImagePath + FileName);
                        //}
                    }
                }
                using Image imageCopy = Image.Load(file.OpenReadStream());
                {

                    //24 MP 3:2
                    //High Resolution Image Encoder
                    int newHeight = 0;
                    int maxWidthHighRes = 6016;
                    if (imageCopy.Width > maxWidthHighRes)
                    {
                        using (Image highResCopy = imageCopy.Clone(x => x.Resize(maxWidthHighRes, newHeight)))
                        {
                            string FileName = "high_" + file.FileName;
                            highResCopy.Save(savedImagePath + FileName);
                        }
                    }
                    else
                    {
                        string FileName = "high_" + file.FileName;
                        imageCopy.Save(savedImagePath + FileName);
                       
                    }
                }


            }
            catch
            {
                return Conflict();
            }

            return Ok();
        }



        //ADDED INTO PHOTO DELETE
        //[HttpDelete("{fileName}")]
        //public IActionResult Delete(string fileName)
        //{
        //    string _highResImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "high_"+fileName);
        //    string _lowResImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "low_"+fileName);
        //    string _customImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "custom_" + fileName);


        //    if ((System.IO.File.Exists(_highResImageToBeDeleted)))
        //    {
        //        System.IO.File.Delete(_highResImageToBeDeleted);
        //    }
        //    if ((System.IO.File.Exists(_lowResImageToBeDeleted)))
        //    {
        //        System.IO.File.Delete(_lowResImageToBeDeleted);
        //    }
        //    if ((System.IO.File.Exists(_customImageToBeDeleted)))
        //    {
        //        System.IO.File.Delete(_customImageToBeDeleted);
        //    }
        //    return Ok();
        //}

        [HttpGet("{imageName}")]
        public IActionResult GetName(string imageName)
        {

            if (imageName != null) { 
            var imageNewName = "low_" + imageName;   
            var highResImagePath = Path.Combine(_webhost.WebRootPath, "images/", imageNewName);
                if ((System.IO.File.Exists(highResImagePath)))
                {
                    var imageFileStream = System.IO.File.OpenRead(highResImagePath);
                    return File(imageFileStream, "image/jpeg");
                }
            } return NoContent();
        }


        [HttpGet("{imageId:int}")]
        public IActionResult GetId(string imageId)
        {
            if (imageId != null)
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");

                Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(imageId));
                int index1 = publicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    string imageName = publicPhoto.PhotoLocation.Substring(index1 + 1);
                    var highResImage = imageName.Insert(0, "high_");
                    var pathbyfullprop = Path.Combine(savedImagePath, highResImage);
                    var imageFileStream = System.IO.File.OpenRead(pathbyfullprop);
                    return File(imageFileStream, "image/jpeg");
                }
            }
            return NoContent();
        }
            
        //Creates image sized similar to user requests, to keep aspect ratio of the image the same
        //Returns image with requested width but not necesarily height
        [HttpGet("custom/{photoId}/{width}/{userId}")]
        public IActionResult GetCustomImage(string photoId, string width, string userId)
        {

            if (photoId != null)
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
                //Locate File by Name assoicated with Photo.Id
                Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(photoId));
                //publicPhoto.PhotoLocation holds the entire path, not just the file name, even though the photo table only shows the image filename
                if (publicPhoto.UserProfileId != Int32.Parse(userId)) {
                    return NoContent();
                } 
                //Locate File by locating the index of last directory call
                int index1 = publicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    //assign varialbe the file name pulled from  the file location 
                    string imageName = publicPhoto.PhotoLocation.Substring(index1 + 1);
                    // use the "high_" quality image uploaded
                    var highResImage = imageName.Insert(0, "high_");
                    var pathbyfullprop = Path.Combine(savedImagePath, highResImage);
                    var imageFileStream = System.IO.File.OpenRead(pathbyfullprop);

                    //Create Image instance from openRead fileStream path
                    using Image image = Image.Load(imageFileStream);
                    {
                        int customWidth = Convert.ToInt32(width);
                        if (image.Width >= customWidth)
                        {

                            //declare the image to be a custom size
                            string FileName = "custom_" + imageName;
                            //handle keeping aspect ratio by declaring a newHeight that matches the custom width
                            var divisor = image.Width / customWidth;
                            var newHeight = Convert.ToInt32(Math.Round((decimal)(image.Height / divisor)));

                            //Resize the file in hand and save the new version, if this file already has a "custom_" tag it will be overwritten with this new mutation. 
                            //it would nice to call previously created images instead of making a new one but even better if i did that using a middleware like imagesharp.web
                            image.Mutate(x => x.Resize(customWidth, newHeight));

                            //Save the mutated file to the assigned path using the assigned file name
                            image.Save(savedImagePath + FileName);

                            //Load image and return to user
                            var Newpathbyfullprop = Path.Combine(savedImagePath, FileName);
                            var NewimageFileStream = System.IO.File.OpenRead(Newpathbyfullprop);
                            return File(NewimageFileStream, "image/jpeg");
                        }
                    }
                }
            }
            return NoContent();
        }



        //Get Random Image this is marked as "IsPublic" by photographer in custom size
        //Creates image sized similar to user requests, to keep aspect ratio of the image the same
        [HttpGet("random/{width}")]
        public IActionResult GetRandomCustomImageByPublic( string width)
        { 
            Photo randomPublicPhoto = _photoRepository.GetRandomSinglePhoto();


            if (randomPublicPhoto != null)
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
                //Locate File by Name assoicated with Photo.Id
                //Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(photoId));
                //publicPhoto.PhotoLocation holds the entire path, not just the file name, even though the photo table only shows the image filename

                //Locate File by locating the index of last directory call
                int index1 = randomPublicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    //assign varialbe the file name pulled from  the file location 
                    string imageName = randomPublicPhoto.PhotoLocation.Substring(index1 + 1);
                    // use the "high_" quality encoded image
                    var highResImage = imageName.Insert(0, "high_");
                    var pathbyfullprop = Path.Combine(savedImagePath, highResImage);
                    var imageFileStream = System.IO.File.OpenRead(pathbyfullprop);

                    //Create Image instance from openRead fileStream path
                    using Image image = Image.Load(imageFileStream);
                    {
                        int customWidth = Convert.ToInt32(width);
                        if (image.Width >= customWidth)
                        {

                            //declare the image to be a custom size
                            string FileName = "custom_" + imageName;
                            //handle keeping aspect ratio by declaring a newHeight that matches the custom width
                            var divisor = image.Width / customWidth;
                            var newHeight = Convert.ToInt32(Math.Round((decimal)(image.Height / divisor)));

                            //Resize the file in hand and save the new version, if this file already has a "custom_" tag it will be overwritten with this new mutation. 
                            //it would nice to call previously created images instead of making a new one but even better if i did that using a middleware like imagesharp.web
                            image.Mutate(x => x.Resize(customWidth, newHeight));

                            //Save the mutated file to the assigned path using the assigned file name
                            image.Save(savedImagePath + FileName);

                            //Load image and return to user
                            var Newpathbyfullprop = Path.Combine(savedImagePath, FileName);
                            var NewimageFileStream = System.IO.File.OpenRead(Newpathbyfullprop);
                            return File(NewimageFileStream, "image/jpeg");
                        }
                    }
                }
            }
            return NoContent();
        }



        //using (Image highResCopy = image.Clone(x => x.Resize(maxWidthHighRes, newHeight)))
        //{
        //    string FileName = "high_" + file.FileName;
        //    highResCopy.Save(savedImagePath + FileName);
        //}

        //working by photoId, other paramatesr are note used yet
        //[HttpGet("unique/{photoId}/{width}/{height}/{userId}")]
        //public IActionResult GetPublic(string photoId, string width, string height, string userId)
        //{

        //    if (photoId != null)
        //    {
        //        var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");

        //        Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(photoId));
        //        //publicPhoto.PhotoLocation holds the entire path, not just the file name, even though the photo table only shows the image filename




        //        int index1 = publicPhoto.PhotoLocation.LastIndexOf('\\');
        //        if (index1 != -1)
        //        {
        //            string imageName = publicPhoto.PhotoLocation.Substring(index1+1);
        //            var highResImage = imageName.Insert(0, "high_");
        //            var pathbyfullprop = Path.Combine(savedImagePath, highResImage);
        //            var imageFileStream = System.IO.File.OpenRead(pathbyfullprop);

        //            using Image image = Image.Load(imageFileStream);
        //            {
        //                using (Image lowResCopy = image.Clone(x => x.Resize(image.Width / 2, image.Height / 2)
        //                            //more sizing options
        //                        )
        //                    )//close out lowResCopy method

        //                {
        //                    // copy.Save(outStream);
        //                    string FileName = "reallylow_" + imageName;
        //                    int originalWidth = lowResCopy.Width;
        //                    int originalHeight = lowResCopy.Height;
        //                    double metaVR = lowResCopy.Metadata.VerticalResolution;

        //                    Console.WriteLine(FileName, "filename");
        //                    Console.WriteLine(imageName, "imageName");
        //                    double metaHR = lowResCopy.Metadata.HorizontalResolution;
        //                    //int maxWidth = 500;
        //                    //if (originalWidth > maxWidth)
        //                    //{
        //                    //    int newHeight = maxWidth * originalHeight;
        //                    //    newHeight /= originalWidth;

        //                    //    copy.Mutate(i => i.Resize(maxWidth, newHeight));
        //                    //}

        //                    lowResCopy.Save(savedImagePath + FileName);
        //                    var Newpathbyfullprop = Path.Combine(savedImagePath, FileName);
        //                    var NewimageFileStream = System.IO.File.OpenRead(Newpathbyfullprop);
        //                    return File(NewimageFileStream, "image/jpeg");
        //                }

        //            }
        //        }
        //    }
        //    return NoContent();
        //}

    }

}