using Microsoft.Extensions.Configuration;
using PhotoPromo.Models;
using PhotoPromo.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhotoPromo.Repositories
{
    public class PhotoRepository : BaseRepository, IPhotoRepository
    {
        public PhotoRepository(IConfiguration config) : base(config) { }

        //Get All Photos By User
        public List<Photo> GetAllPhotosByUserProfileId(int userProfileId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               SELECT p.Id, p.[Name] AS PhotoName, p.PhotoLocation, p.Attribute, p.ResolutionLevel, p.CreatedDateTime, p.IsPublic, p.GalleryId, p.UserProfileId,
                                      g.Name AS GalleryName,
                                      up.FirstName, up.LastName, up.DisplayName, up.Email, up.LogoLocation
                               FROM Photo p
                                    LEFT JOIN Gallery g ON p.GalleryId = g.Id
                                    LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                               WHERE p.UserProfileId = @id  ";
                    cmd.Parameters.AddWithValue("@id", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var photos = new List<Photo>();

                    while (reader.Read())
                    {
                        photos.Add(new Photo()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("PhotoName")),
                            PhotoLocation = reader.GetString(reader.GetOrdinal("PhotoLocation")),
                            Attribute = reader.GetString(reader.GetOrdinal("Attribute")),
                            ResolutionLevel = reader.GetInt32(reader.GetOrdinal("ResolutionLevel")),
                            CreatedDateTime = reader.GetDateTime(reader.GetOrdinal("CreatedDateTime")),
                            IsPublic = reader.GetInt32(reader.GetOrdinal("IsPublic")),
                            GalleryId = reader.GetInt32(reader.GetOrdinal("GalleryId")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

                            Gallery = new Gallery
                            {
                                Name = reader.GetString(reader.GetOrdinal("GalleryName")),
                            },
                            UserProfile = new UserProfile
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                LogoLocation = DbUtils.GetString(reader, "LogoLocation"),
                            }

                        });
                    }

                    reader.Close();

                    return photos;
                }
            }

        }



        //Get Photos by GalleryId
        //make sure to confirm user is gallery owner
        public List<Photo> GetPhotosByGalleryId(int galleryId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.[Name] AS PhotoName, p.PhotoLocation, p.Attribute, p.ResolutionLevel, p.CreatedDateTime, p.IsPublic, p.GalleryId, p.UserProfileId,
                              g.Name AS GalleryName,
                              up.FirstName, up.LastName, up.DisplayName, up.Email, up.LogoLocation
                        FROM Photo p
                            LEFT JOIN Gallery g ON p.GalleryId = g.Id
                            LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                        WHERE p.GalleryId = @Id";

                    cmd.Parameters.AddWithValue("@Id", galleryId);
                    var reader = cmd.ExecuteReader();

                    var photos = new List<Photo>();

                    while (reader.Read())
                    {
                        photos.Add(new Photo()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("PhotoName")),
                            PhotoLocation = reader.GetString(reader.GetOrdinal("PhotoLocation")),
                            Attribute = reader.GetString(reader.GetOrdinal("Attribute")),
                            ResolutionLevel = reader.GetInt32(reader.GetOrdinal("ResolutionLevel")),
                            CreatedDateTime = reader.GetDateTime(reader.GetOrdinal("CreatedDateTime")),
                            IsPublic = reader.GetInt32(reader.GetOrdinal("IsPublic")),
                            GalleryId = reader.GetInt32(reader.GetOrdinal("GalleryId")),
                            Gallery = new Gallery
                            {
                                Name = reader.GetString(reader.GetOrdinal("GalleryName")),
                            },
                            UserProfile = new UserProfile
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                LogoLocation = DbUtils.GetString(reader, "LogoLocation"),
                            }

                        });
                    }

                    reader.Close();

                    return photos;
                }
            }


        }


        //Get Single Photo for User
        //make sure to confirm user if photo owner
        public Photo GetSinglePhotobyId(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.[Name] AS PhotoName, p.PhotoLocation, p.Attribute, p.ResolutionLevel, p.CreatedDateTime, p.IsPublic, p.GalleryId, p.UserProfileId,
                              g.Name AS GalleryName,
                              up.FirstName, up.LastName, up.DisplayName, up.Email, up.LogoLocation
                        FROM Photo p
                            LEFT JOIN Gallery g ON p.GalleryId = g.Id
                            LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                        WHERE p.Id = @id";

                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    Photo photo = null;

                    if (reader.Read())
                    {
                        photo = new Photo
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("PhotoName")),
                            PhotoLocation = reader.GetString(reader.GetOrdinal("PhotoLocation")),
                            Attribute = reader.GetString(reader.GetOrdinal("Attribute")),
                            ResolutionLevel = reader.GetInt32(reader.GetOrdinal("ResolutionLevel")),
                            CreatedDateTime = reader.GetDateTime(reader.GetOrdinal("CreatedDateTime")),
                            IsPublic = reader.GetInt32(reader.GetOrdinal("IsPublic")),
                            GalleryId = reader.GetInt32(reader.GetOrdinal("GalleryId")),
                            Gallery = new Gallery
                            {
                                Name = reader.GetString(reader.GetOrdinal("GalleryName")),
                            },
                            UserProfile = new UserProfile
                            {
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                LogoLocation = DbUtils.GetString(reader, "LogoLocation"),
                            }
                        };

                    }

                    reader.Close();

                    return photo;
                }
            }


        }


        //Get Random Photo related to UserProfile
        //random number generated before call based on length?
        //public Photo GetRandomPhotobyUserId(int userId) { }




        //Random Image for Public Use
        //public Photo GetRandomImage {}

    }
}
