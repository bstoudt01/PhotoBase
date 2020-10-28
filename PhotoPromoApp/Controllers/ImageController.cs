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
        public IActionResult Get(string imageName)
        {
            if (imageName != null) { 
            imageName = "high_" + imageName;   
            var path = Path.Combine(_webhost.WebRootPath, "images/", imageName);

            var imageFileStream = System.IO.File.OpenRead(path);
            return File(imageFileStream, "image/jpeg");
            } return NoContent();
        }

        [HttpGet("unique/{photoId}/{width}/{height}/{userId}")]
        public IActionResult GetPublic(string photoId, string width, string height, string userId)
        {

            if (photoId != null)
            {
                var savedImagePath = Path.Combine(_webhost.WebRootPath, "images/");

                Photo publicPhoto = _photoRepository.GetSinglePhotobyId(Int32.Parse(photoId));
                //publicPhoto.PhotoLocation holds the entire path, not just the file name, even though the photo table only shows the image filename

                int index1 = publicPhoto.PhotoLocation.LastIndexOf('\\');
                if (index1 != -1)
                {
                    //Console.WriteLine(index1);
                    string imageName = publicPhoto.PhotoLocation.Substring(index1+1);
                    //var highResImage = publicPhoto.PhotoLocation.Insert(index1+1, "high_");
                    var highResImage = imageName.Insert(0, "high_");

                    var pathbyfullprop = Path.Combine(savedImagePath, highResImage);
                    var pathbyImageName = Path.Combine(_webhost.WebRootPath, "\\images/", imageName);

                    var imageFileStream = System.IO.File.OpenRead(pathbyfullprop);
                    var publicImage = File(imageFileStream, "image/jpeg");
                return File(imageFileStream, "image/jpeg");
                }
                //var imageName = "high_" + publicPhoto.PhotoLocation;
                //var path = Path.Combine(_webhost.WebRootPath, "images/", imageName);


                //imageParams = "high_" + imageParams;
                //var path = Path.Combine(_webhost.WebRootPath, "images/", imageParams);

                //var imageFileStream = System.IO.File.OpenRead(path);
            }
            return NoContent();
        }

    }

}