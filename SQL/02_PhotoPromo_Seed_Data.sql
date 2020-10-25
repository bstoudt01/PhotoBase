USE [PhotoPromo];
GO

set identity_insert [UserType] on
insert into [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, Company, LogoLocation, UserTypeId, FirebaseUserId) values (1, 'Admin1', 'Key', 'Master', 'admin@admin.com', 'PhotoPromo Services Corp', 'https://robohash.org/numquamutut.png?size=150x150&set=set1', 1, 'VnPUPpY5ldM2IoOAJ6NYWSMu7wy2');
insert into UserProfile (Id, DisplayName, FirstName, LastName, Email, Company, LogoLocation, UserTypeId, FirebaseUserId) values (2, 'Photographer1', 'Photo', 'Generate', 'user@user.com', 'NeuWave Photo', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', 2, '3L7wkXwW44Qn3qCGMmU9JbDSONk2');
set identity_insert [UserProfile] off

set identity_insert [Gallery] on
insert into [Gallery] ([Id], [Name], [UserProfileId]) 
values (1, 'Main', 2), (2, 'Event', 2), (3, 'Portrait', 2), (4, 'Landscape', 2), (5, 'Art', 2)
set identity_insert [Gallery] off

set identity_insert [Photo] on
insert into [Photo] ([Id], [Name], [PhotoLocation], [Attribute], [ResolutionLevel], [IsPublic], [UserProfileId], [GalleryId])
values (1, 'BeachTree', 'C:\Users\Island Life\workspace\csharp\projects\PhotoPromo\ImageStorage\DSC_0480.jpg', 'Allie Stoudt', 300, 0, 2, 1),
	   (2, 'BeachBeer', 'C:\Users\Island Life\workspace\csharp\projects\PhotoPromo\ImageStorage\DSC_0868.jpg', 'Allie Stoudt', 300, 0, 2, 1)
set identity_insert [Photo] off
