﻿//using Amazon;
using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Amazon.S3.Util;
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


//        private const string bucketName = "arn:aws:s3:::photobasebuckettest";
        private const string keyName = "firstUploadedImage";
        private const string filePath = "C:\\Users\\Island Life\\Desktop\\project images\\deanMartin.jpg";
        // Specify your bucket region (an example region is shown).
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast1;

//        private static IAmazonS3 s3Client;

        public async Task UploadFileAsync(string bucketName)
        {
            try
            {
  //              var s3Client = new AmazonS3Client(bucketRegion);

                var fileTransferUtility = new TransferUtility(_client);

                // Option 1. Upload a file. The file name is used as the object key name.
                await fileTransferUtility.UploadAsync(filePath, bucketName);
                Console.WriteLine("Upload 1 completed");

                // Option 2. Specify object key name explicitly.
                await fileTransferUtility.UploadAsync(filePath, bucketName, keyName);
                Console.WriteLine("Upload 2 completed");

                // Option 3. Upload data from a type of System.IO.Stream.
                using (var fileToUpload =
                    new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    await fileTransferUtility.UploadAsync(fileToUpload,
                                               bucketName, keyName);
                }
                Console.WriteLine("Upload 3 completed");

                // Option 4. Specify advanced settings.
                var fileTransferUtilityRequest = new TransferUtilityUploadRequest
                {
                    BucketName = bucketName,
                    FilePath = filePath,
                    StorageClass = S3StorageClass.StandardInfrequentAccess,
                    PartSize = 6291456, // 6 MB.
                    Key = keyName,
                    CannedACL = S3CannedACL.PublicRead
                };
                fileTransferUtilityRequest.Metadata.Add("param1", "Value1");
                fileTransferUtilityRequest.Metadata.Add("param2", "Value2");

                await fileTransferUtility.UploadAsync(fileTransferUtilityRequest);
                Console.WriteLine("Upload 4 completed");
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

    }
}
