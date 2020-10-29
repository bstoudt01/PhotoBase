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
                    using (Image lowResCopy = image.Clone(x => x.Resize(image.Width / 5, image.Height / 5)))
                    {
                        // copy.Save(outStream);
                        string FileName = "low_"+file.FileName;
                        int originalWidth = lowResCopy.Width;
                        int originalHeight = lowResCopy.Height;
                        double metaVR = lowResCopy.Metadata.VerticalResolution;
                        
                        Console.WriteLine(FileName, "filename");
                        Console.WriteLine(file.FileName, "file.filename");
                        double metaHR = lowResCopy.Metadata.HorizontalResolution;
                        //int maxWidth = 500;
                        //if (originalWidth > maxWidth)
                        //{
                        //    int newHeight = maxWidth * originalHeight;
                        //    newHeight /= originalWidth;

                        //    copy.Mutate(i => i.Resize(maxWidth, newHeight));
                        //}
                        
                        lowResCopy.Save(savedImagePath + FileName);
                    }
                    using (Image highResCopy = image.Clone(x => x.Resize(image.Width / 2, image.Height / 2)))
                    {
                        // copy.Save(outStream);
                        string FileName = "high_" + file.FileName;
                        int originalWidth = highResCopy.Width;
                        int originalHeight = highResCopy.Height;


                        //int maxWidth = 500;
                        //if (originalWidth > maxWidth)
                        //{
                        //    int newHeight = maxWidth * originalHeight;
                        //    newHeight /= originalWidth;

                        //    copy.Mutate(i => i.Resize(maxWidth, newHeight));
                        //}
                        //copy.Save(savedImagePath + fileName);
                        highResCopy.Save(savedImagePath + FileName);
                    }


                }
            }
            catch
            {
                return Conflict();
            }

            return Ok();
        }



        [HttpDelete("{fileName}")]
        public IActionResult deletefile(string fileName)
        {
            string _highResImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "high_"+fileName);
            string _lowResImageToBeDeleted = Path.Combine(_webhost.WebRootPath, "images/", "low_"+fileName);

            if ((System.IO.File.Exists(_highResImageToBeDeleted)))
            {
                System.IO.File.Delete(_highResImageToBeDeleted);
            }
            if ((System.IO.File.Exists(_lowResImageToBeDeleted)))
            {
                System.IO.File.Delete(_lowResImageToBeDeleted);
            }
            return Ok();
        }

        [HttpGet("{imageName}")]
        public IActionResult GetName(string imageName)
        {
            if (imageName != null) { 
            var imageNewName = "high_" + imageName;   
            var path = Path.Combine(_webhost.WebRootPath, "images/", imageNewName);

            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");
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


        [HttpGet("unique/{photoId}/{width}/{height}/{userId}")]
        public IActionResult GetPublic(string photoId, string width, string height, string userId)
        {

            if (photoId != null)
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");
                //Locate File by Name assoicated with Photo.Id
                Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(photoId));
                //publicPhoto.PhotoLocation holds the entire path, not just the file name, even though the photo table only shows the image filename

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
                        //declare the image to be a custom size
                        string FileName = "custom_" + imageName;
                        int customWidth = Convert.ToInt32(width);
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
            return NoContent();
        }




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