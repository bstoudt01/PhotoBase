using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using PhotoPromo.Models;
using PhotoPromo.Repositories;
using System.Linq;
using PhotoPromoApp.Services;
using System.Threading.Tasks;

namespace PhotoPromoApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _webhost;
        private readonly IPhotoRepository _photoRepository;

        private readonly IS3Service _service;


        public ImageController(IWebHostEnvironment webhost, IPhotoRepository photoRepository, IS3Service service)
        {
            _webhost = webhost;
            _photoRepository = photoRepository;

            _service = service;

        }


        //Add Image
        //pass through two encoders and save results
        //send results to S3 Bucket
        //still need to delete local "saved results" after upload to bucket is complete
        [HttpPost]
        public async Task<IActionResult> Add(IFormFile file)
        {

            //where images are stored
            var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
            int newHeight = 0;
            string lowResPath = Path.Combine(savedImagePath, "low_"+file.FileName);
            string highResPath = Path.Combine(savedImagePath, "high_"+file.FileName);
            try
            {
                using Image image = Image.Load(file.OpenReadStream());
                {
                    //First Encode @ 1.4 MP 3:2
                    //Low Resolution Image Encoder
                    int maxWidthLowRes = 1440;
                    if (image.Width > maxWidthLowRes)
                    {
                        //saves image with width of 1440, height is determined by imagesharp to keep aspect ratio (set height to 0)
                        using (Image lowResCopy = image.Clone(x => x.Resize(maxWidthLowRes, newHeight)))
                        {
                            string FileName = "low_" + file.FileName;
                            lowResCopy.Save(savedImagePath + FileName);
                           // lowResPath = Path.Combine(savedImagePath, FileName);

                        }
                    }
                    else
                    {
                        //saves image with actual width and height
                        string FileName = "low_" + file.FileName;
                        image.Save(savedImagePath + FileName);
                         //lowResPath = Path.Combine(savedImagePath, FileName);
                    }


                    //Second Encode @ 24 MP 3:2
                    //High Resolution Image Encoder
                    int maxWidthHighRes = 6016;
                    if (image.Width > maxWidthHighRes)
                    {
                        using (Image highResCopy = image.Clone(x => x.Resize(maxWidthHighRes, newHeight)))
                        {
                            string FileName = "high_" + file.FileName;
                            highResCopy.Save(savedImagePath + FileName);
                           // highResPath = Path.Combine(savedImagePath, FileName);
                        }
                    }
                    else
                    {
                        string FileName = "high_" + file.FileName;
                        image.Save(savedImagePath + FileName);
                      //  highResPath = Path.Combine(savedImagePath, FileName);
                    }
                }

            }
            catch
            {
                return File("stockimages/" + "404_not_found.webp", "image/jpeg");
            }
            await _service.UploadFileAsync(lowResPath);
            await _service.UploadFileAsync(highResPath);
            return Ok();
        }

        //Get Image By Name
        [HttpGet("{imageName}")]
        public IActionResult GetName(string imageName)
        {

            if (imageName != null)
            {
                var lowResImage = "low_" + imageName;
                var lowResImagePath = Path.Combine(_webhost.WebRootPath, "images/", lowResImage);
                if ((System.IO.File.Exists(lowResImagePath)))
                {
                    return File("images/" + lowResImage, "image/jpeg");                    
                }
            }
            return File("stockimages/" + "404_not_found.webp", "image/jpeg");
        }


        [HttpGet("{imageId:int}")]
        public IActionResult GetId(string imageId)
        {
            if (imageId != null)
            {

                Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(imageId));
                int index1 = publicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    string imageName = publicPhoto.PhotoLocation.Substring(index1 + 1);
                    var highResImage = imageName.Insert(0, "high_");
                    var highResImagePath = Path.Combine(_webhost.WebRootPath, "images/", highResImage);
                    if ((System.IO.File.Exists(highResImagePath)))
                    {
                        return File("images/" + highResImage, "image/jpeg");
                    }

                }
            }
            return File("stockimages/" + "404_not_found.webp", "image/jpeg");
        }

        //Creates image sized similar to user requests, to keep aspect ratio of the image the same
        //Returns image with requested width, height is kept in poroportion using aspect ratios
        [HttpGet("custom/{photoId}/{width}/{userId}")]
        public IActionResult GetCustomImage(string photoId, string width, string userId)
        {

            if (photoId != null && photoId.All(char.IsDigit) && userId.All(char.IsDigit) && width.All(char.IsDigit))
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
                //Locate File by Name assoicated with Photo.Id
                Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(photoId));

                //publicPhoto.PhotoLocation holds the entire path, not just the file name, even though the photo table only shows the image filename
                if (publicPhoto == null || publicPhoto.UserProfileId != Int32.Parse(userId))
                {
                    return File("stockimages/" + "404_not_found.webp", "image/jpeg");
                }

                //Locate File by locating the index of last folder/directory opened
                int index1 = publicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    //assign varialbe the file name pulled from  the file location 
                    string imageName = publicPhoto.PhotoLocation.Substring(index1 + 1);
                    // use the "high_" quality image uploaded
                    var highResImage = imageName.Insert(0, "high_");
                    var pathbyfullprop = Path.Combine(savedImagePath, highResImage);

                    using (var imageFileStream = System.IO.File.OpenRead(pathbyfullprop))
                    {

                        //Create Image instance from openRead fileStream path
                        using Image image = Image.Load(imageFileStream);
                        {
                            int customWidth = Convert.ToInt32(width);
                            if (image.Width >= customWidth)
                            {

                                //declare the image to be a custom size
                                string FileName = "custom_" + imageName;
                                //handle keeping aspect ratio by declaring a newHeight that matches the custom width
                                
                                int newHeight = 0;
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
                            else
                            {

                                //Load highest resolution image available and return to user
                                var Newpathbyfullprop = Path.Combine(savedImagePath, highResImage);
                                var NewimageFileStream = System.IO.File.OpenRead(Newpathbyfullprop);
                                return File(NewimageFileStream, "image/jpeg");
                            }
                        }
                    }
                }
            }
           
            return File("stockimages/"+"404_not_found.webp", "image/jpeg");

        }



        //Get Random Image that is marked as "IsPublic" by photographer in custom size
        //Creates image sized  to user requested height, to keep aspect ratio of the image the same
        [HttpGet("random/{width}")]
        public IActionResult GetRandomCustomImageByPublic(string width)
        {
            //get random image
            Photo randomPublicPhoto = _photoRepository.GetRandomSinglePhoto();


            if (randomPublicPhoto != null && width.All(char.IsDigit))
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
               
                //Locate File by locating the index of last directory call
                int index1 = randomPublicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    //assign varialbe the file name pulled from  the file location 
                    string imageName = randomPublicPhoto.PhotoLocation.Substring(index1 + 1);
                    
                    // use the "high_" quality encoded image
                    var highResImage = imageName.Insert(0, "high_");

                    //grab full path name to open file with FileStream
                    var pathbyfullprop = Path.Combine(savedImagePath, highResImage);

                    using (var imageFileStream = System.IO.File.OpenRead(pathbyfullprop))
                    {
                        //Create Image instance from openRead fileStream path
                        using (Image image = Image.Load(imageFileStream))
                        {
                            int customWidth = Convert.ToInt32(width);
                           
                            if (image.Width >= customWidth)
                            {

                                //declare the image to be a custom size
                                string FileName = "custom_" + imageName;
                              
                                //handle keeping aspect ratio by declaring a newHeight of 0
                                int newHeight = 0;
                                
                                //Resize the file in hand and save the new version, if this file already has a "custom_" tag it will be overwritten with this new mutation. 
                                //it would nice to call previously created images instead of making a new one but even better if i did that using a middleware like imagesharp.web
                                image.Mutate(x => x.Resize(customWidth, newHeight));

                                //Save the mutated file to the assigned path using the assigned file name
                                image.Save(savedImagePath + FileName);

                                var Newpathbyfullprop = Path.Combine(savedImagePath, FileName);

                                var NewimageFileStream = System.IO.File.OpenRead(Newpathbyfullprop);

                                return File(NewimageFileStream, "image/jpeg");

                            }
                            else
                            {

                                //Load highest resolution image available and return to user
                                var Newpathbyfullprop = Path.Combine(savedImagePath, highResImage);
                                var NewimageFileStream = System.IO.File.OpenRead(Newpathbyfullprop);

                                return File(NewimageFileStream, "image/jpeg");

                            }

                        }
                    }
                }
            }
            
                return File("stockimages/"+"404_not_found.webp", "image/jpeg");
            
        }


        [HttpGet]
        [Route("GetFile/{keyName}")]
        public async Task<IActionResult> GetFileFromS3Async([FromRoute] string keyName)
        {
            await _service.ReadObjectDataAsync(keyName);

            return Ok();

        }


    }
}