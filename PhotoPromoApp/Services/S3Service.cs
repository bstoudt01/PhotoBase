//using Amazon;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Amazon.S3.Util;
using Microsoft.AspNetCore.Http;
using PhotoPromoApp.Models;
using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace PhotoPromoApp.Services
{
    //create interface to user pin ??? injection
    public class S3Service: IS3Service
    {

        private readonly IAmazonS3 _client;

        public S3Service(IAmazonS3 client)
        {
            _client = client;
        }

        public async Task<S3Response> CreateBucketAsync(string bucketName)
        {
            try
            {
                if (await AmazonS3Util.DoesS3BucketExistV2Async(_client, bucketName) == false)
                {
                    var putBucketRequest = new PutBucketRequest
                    {
                        BucketName = bucketName,
                        UseClientRegion = true
                    };

                    var resposne = await _client.PutBucketAsync(putBucketRequest);

                    return new S3Response
                    {
                        Message = resposne.ResponseMetadata.RequestId,
                        Status = resposne.HttpStatusCode
                    };

                }
            }
            catch(AmazonS3Exception ex)
            {
                //must use more than write line b/c the controller wont show what went wrong    
                //created model to show the actual error message from bad S3 Response
                return new S3Response
                {
                    Status = ex.StatusCode,
                    Message = ex.Message
                };
            }
            catch (Exception ex)
            {
                return new S3Response
                {
                    Status = HttpStatusCode.InternalServerError,
                    Message = ex.Message
                };
            }
            return new S3Response
            {
                Status = HttpStatusCode.InternalServerError,
                Message = "Something Went Wrong!"
            };
        }


        private const string bucketName = "photobasebuckettest";
        private const string keyName = "firstUploadedImage";
        private const string filePath2 = "C:\\Users\\Island Life\\Desktop\\project images\\deanMartin.jpg";
        // Specify your bucket region (an example region is shown).
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast1;

//        private static IAmazonS3 s3Client;

        public async Task UploadFileAsync(string filePath)
        {
            try
            {
  //              var s3Client = new AmazonS3Client(bucketRegion);

                var fileTransferUtility = new TransferUtility(_client);

               // // Option 1. Upload a file. The file name is used as the object key name.
                await fileTransferUtility.UploadAsync(filePath, bucketName);
                Console.WriteLine("Upload 1 completed");

               // //// Option 2. Specify object key name explicitly.
               //await fileTransferUtility.UploadAsync(filePath2, bucketName, keyName);
               // Console.WriteLine("Upload 2 completed");

                // Option 3. Upload data from a type of System.IO.Stream.
                //using (var fileToUpload =
                  // new FileStream(filePath, FileMode.Open, FileAccess.Read))
                //{
                //    await fileTransferUtility.UploadAsync(fileToUpload,
                //                               bucketName, keyName);
                //}
                //Console.WriteLine("Upload 3 completed");

                //// Option 4. Specify advanced settings.
                //var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                //{
                //    BucketName = bucketName,
                //    FilePath = filePath,
                //    StorageClass = S3StorageClass.StandardInfrequentAccess,
                //    PartSize = 6291456, // 6 MB.
                //    Key = keyName,
                //    CannedACL = S3CannedACL.PublicRead
                //};
                //fileTransferUtilityRequest.Metadata.Add("param1", "Value1");
                //fileTransferUtilityRequest.Metadata.Add("param2", "Value2");

                //await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);
                //Console.WriteLine("Upload 4 completed");
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
            }

        }

        //
        public async Task ReadObjectDataAsync(string keyName)
        {
            //change to bucketName
            const string bucketName = "photobasebuckettest";

            try
            {
                //Object request using fileName==keyName and bucketName as object paramaters
                //Object created using Amazon.SDK.S3 Package 
                var request = new GetObjectRequest
                {
                    BucketName = bucketName,
                    Key = keyName
                };

                //hold image response
                    //does this need to be a string??
                string responseBody;
                
                //utitlized using blocks since these variables are accessing filestreams
                //pass the request object into the Get method for S3
                using (var response = await _client.GetObjectAsync(request))
                //open responsestream
                using (var responseStream = response.ResponseStream)
                //read content we get back from S3 file
                using (var reader = new StreamReader(responseStream))
                {
                    //obecjtTitleIfItExists.. if title doesnt exist it will return  back a null
                    var title = response.Metadata["x-amz-meta-title"];
                    var contentType = response.Headers["Content-Type"];

                    Console.WriteLine($"Obect title {title} ");
                    Console.WriteLine($"content type {contentType} ");

                    //read the response and then handle it outside of the using block
                    responseBody = reader.ReadToEnd();

                }

                //save to file OR read it out and pass it to user, etc.. 
                var pathAndFileName = $"C:\\S3Temp\\{keyName}";

                var createText = responseBody;

                File.WriteAllText(pathAndFileName, createText);
            }
            catch (AmazonS3Exception e)
            {
                Console.WriteLine("Error encountered ***. Message:'{0}' when reading object", e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine("Unknown encountered on server. Message:'{0}' when reading object", e.Message);

            }
        }
    }
}
