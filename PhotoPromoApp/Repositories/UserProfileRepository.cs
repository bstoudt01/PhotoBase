using Microsoft.Extensions.Configuration;
using PhotoPromo.Models;
using PhotoPromo.Utils;
using System.Collections.Generic;

namespace PhotoPromo.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.FacebookUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.Company, up.LogoLocation, up.UserTypeId, up.IsDeactivated,
                               ut.[Name] AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE up.FirebaseUserId = @FirebaseuserId AND up.IsDeactivated != 1";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FacebookUserId = DbUtils.GetString(reader, "FacebookUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Company = DbUtils.GetString(reader, "Company"),
                            LogoLocation = DbUtils.GetString(reader, "LogoLocation"),
                            IsDeactivated = reader.GetInt32(reader.GetOrdinal("IsDeactivated")),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FacebookUserId, FirstName, LastName, DisplayName, 
                                                                 Email, LogoLocation, Company)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FacebookUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @LogoLocation, @Company)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FacebookUserId", userProfile.FacebookUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Company", userProfile.Company);
                    DbUtils.AddParameter(cmd, "@LogoLocation", userProfile.LogoLocation);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public List<UserProfile> GetAllUserProfiles()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT up.Id, Up.FirebaseUserId, Up.FacebookUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.Company, up.LogoLocation, up.UserTypeId, up.IsDeactivated,
                              ut.[Name] AS UserTypeName
                       FROM UserProfile up
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                       WHERE up.IsDeactivated != 1
                       ORDER BY up.DisplayName;
                      
                       ";


                    List<UserProfile> userProfiles = new List<UserProfile>();
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        userProfiles.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FacebookUserId = DbUtils.GetString(reader, "FacebookUserId"),
                            IsDeactivated = reader.GetInt32(reader.GetOrdinal("IsDeactivated")),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Company = DbUtils.GetString(reader, "Company"),
                            LogoLocation = DbUtils.GetString(reader, "LogoLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }

                        });
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }


        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, Up.FacebookUserId, up.FirstName, up.LastName, up.DisplayName, 
                                up.Email, up.Company, up.LogoLocation, up.UserTypeId, up.IsDeactivated,
                                ut.[Name] AS UserTypeName
                        FROM UserProfile up
                            LEFT JOIN UserType ut ON up.UserTypeId = ut.Id
                       WHERE up.Id = @Id AND up.IsDeactivated != 1
                       ORDER BY up.DisplayName;
                        
                       ";

                    cmd.Parameters.AddWithValue("@Id", id);
                    UserProfile userProfile = new UserProfile();
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FacebookUserId = DbUtils.GetString(reader, "FacebookUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Company = DbUtils.GetString(reader, "Company"),
                            LogoLocation = DbUtils.GetString(reader, "LogoLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }

                        };
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }



    }
}
