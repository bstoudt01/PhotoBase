USE [master]

IF db_id('PhotoPromo') IS NULL
  CREATE DATABASE [PhotoPromo]
GO

USE [PhotoPromo]
GO

DROP TABLE IF EXISTS [Photo];
DROP TABLE IF EXISTS [Gallery];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];

GO



CREATE TABLE [UserType] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULL

)
CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [FaceBookUserId] NVARCHAR(28) DEFAULT'0' NOT NULL,
  [IsDeactivated] integer DEFAULT (0) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [UserTypeId] integer DEFAULT (1) NOT NULL,
  [Company] nvarchar(255),
  [LogoLocation] nvarchar(255),

  CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId),

)


CREATE TABLE [Gallery] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Gallery_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),

)

CREATE TABLE [Photo] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(50) NOT NULL,
  [PhotoLocation] nvarchar(255) NOT NULL,
  [IsPublic] bit NOT NULL,
  [UserProfileId] integer NOT NULL,
  [GalleryId] integer NOT NULL,
  [Attribute] nvarchar(255) NOT NULL,
  [ResolutionLevel] integer NOT NULL,
  [CreatedDateTime] datetime DEFAULT GETUTCDATE() NOT NULL,

  CONSTRAINT [FK_Photo_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_Photo_Gallery] FOREIGN KEY ([GalleryId]) REFERENCES [Gallery] ([Id])

)

GO

