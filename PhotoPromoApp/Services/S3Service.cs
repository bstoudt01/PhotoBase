using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;
using PhotoPromoApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using static PhotoPromoApp.Services.S3Service;

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
    }
}
