using PhotoPromo.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoPromoApp.ImageHandlers
{
    public class HiResEncoder
    {

        public void Encode(Photo newImage) {
            using (Image image = Image.Load(newImage.PhotoLocation))
            {
                image.Mutate(x => x
                     .Resize(image.Width / 2, image.Height / 2)
                     .Grayscale());

                image.Save("output/fb.png"); // Automatic encoder selected based on extension.
            }
        }
    }
}
