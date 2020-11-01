using Microsoft.Extensions.Configuration;
using PhotoPromo.Models;
using System.Collections.Generic;

namespace PhotoPromo.Repositories
{
    public class GalleryRepository : BaseRepository, IGalleryRepository
    {
        public GalleryRepository(IConfiguration config) : base(config) { }

        //Get All Galleries by User
        public List<Gallery> GetAllGalleriesWithPhotoCountbyUserProfileId(int userProfileId)
        {
            

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // get id and name from gallery table or return it based on name spelling in descending order
                    cmd.CommandText = @"
                        SELECT g.Id, g.[Name], g.UserProfileId  
                        FROM Gallery g 
                        WHERE g.userProfileId = @id  ";
                    cmd.Parameters.AddWithValue("@id", userProfileId);

                    //execute sql command, builds sql data reader and retruns a reader object 
                    var reader = cmd.ExecuteReader();

                    var galleries = new List<Gallery>();

                    //while the sql data reader returns results, we obtain those values in the form we need them in (string, int, etc.)
                    // and add each converted object (now gallery type) to the empty list created above
                    while (reader.Read())
                    {
                        galleries.Add(new Gallery()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),

                        });
                    }

                    //Close the reader when there is no responses to loop through
                    reader.Close();

                    //return the list of galleries as the result of our GetAll method
                    return galleries;
                }
            }
        }


        //Get All Galleries With Photo Count by User
        public List<Gallery> GetAllGalleriesbyUserProfileId(int userProfileId)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // get id and name from gallery table or return it based on name spelling in descending order
                    cmd.CommandText = @"
                       SELECT Count(p.Id) AS PhotoCount, g.[Name], g.Id, g.UserProfileId
                        FROM Gallery g 
                        LEFT JOIN PHOTO p ON g.id = p.GalleryId
                        WHERE g.UserProfileId = @id
                        GROUP BY g.[Name], g.Id, g.UserProfileId";
                    cmd.Parameters.AddWithValue("@id", userProfileId);

                    //execute sql command, builds sql data reader and retruns a reader object 
                    var reader = cmd.ExecuteReader();

                    var galleries = new List<Gallery>();

                    //while the sql data reader returns results, we obtain those values in the form we need them in (string, int, etc.)
                    // and add each converted object (now gallery type) to the empty list created above
                    while (reader.Read())
                    {
                        galleries.Add(new Gallery()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                            PhotoCount = reader.GetInt32(reader.GetOrdinal("PhotoCount"))

                        });
                    }

                    //Close the reader when there is no responses to loop through
                    reader.Close();

                    //return the list of galleries as the result of our GetAll method
                    return galleries;
                }
            }
        }

        //Get Single Gallery by User
        public Gallery GetGalleryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT g.Id, g.[Name], g.UserProfileId  
                        FROM Gallery g
                        WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();

                    Gallery gallery = null;

                    if (reader.Read())
                    {
                        gallery = new Gallery
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                        };

                    }

                    reader.Close();

                    return gallery;
                }
            }
        }

        //Add Gallery
        public void Add(Gallery gallery)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Gallery ([Name], UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @UserProfileId)";
                    //After the SQL String is declared we place the expected values in a comand that adds values to paramaters by passing through the SQL @Values
                    cmd.Parameters.AddWithValue("@Name", gallery.Name);
                    cmd.Parameters.AddWithValue("@UserProfileId", gallery.UserProfileId);


                    gallery.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        //Edit Gallery
        public void Update(Gallery gallery)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Gallery
                            SET [Name] = @Name
                            WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", gallery.Id);
                    cmd.Parameters.AddWithValue("@Name", gallery.Name);

                    cmd.ExecuteNonQuery();
                }
            }

        }

        //Delete Gallery
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Gallery
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }

        }
    }
}
