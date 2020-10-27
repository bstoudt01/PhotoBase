using PhotoPromo.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace PhotoPromoApp.ImageHandlers
{
    public static class Encoders
    {
        public static void HiResEncoder(IFormFile file, string savedImagePath)
        {
            using Image image = Image.Load(file.OpenReadStream());
            {
               

                int originalWidth = image.Width;
                int originalHeight = image.Height;


                int maxWidth = 500;
                if (originalWidth > maxWidth)
                {
                    int newHeight = maxWidth * originalHeight;
                    newHeight /= originalWidth;
                }
                 image.Save(savedImagePath + file.FileName);
            }
        }
    }
}
