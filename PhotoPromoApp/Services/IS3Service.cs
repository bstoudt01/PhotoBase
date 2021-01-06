using Microsoft.AspNetCore.Http;
using PhotoPromoApp.Models;
using System.IO;
using System.Threading.Tasks;

namespace PhotoPromoApp.Services
{
   
        public interface IS3Service
        {
        Task<S3Response> CreateBucketAsync(string bucketName);

        Task UploadFileAsync(string filePath);

        //Task ReadObjectDataAsync(string keyName);
        Task<Stream> ReadObjectDataAsync(string keyName);

    };
}
