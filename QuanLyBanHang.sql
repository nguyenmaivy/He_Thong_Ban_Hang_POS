USE He_Thong_Ban_Hang_POS;
GO
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),  
    email NVARCHAR(255) NOT NULL UNIQUE, 
    password NVARCHAR(255) NOT NULL,     
    created_at DATETIME DEFAULT GETDATE() 
);
GO


