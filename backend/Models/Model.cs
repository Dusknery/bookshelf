using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class AppDbContext : DbContext
{
    public DbSet<Book> Books { get; set; }
    public DbSet<Citation> Citations { get; set; }
    // public DbSet<User> Users { get; set; }

    public string DbPath { get; }

    public AppDbContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "app.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
    public string PublicationDate { get; set; } = "";
}

public class Citation
{
    public int Id { get; set; }
    public required string CitationText { get; set; }
}
// public class User
// {
//     public int Id { get; set; }
//     public required string Username { get; set; }
//     public required string Password { get; set; }

//     public List<Book> Books { get; set; } = new();
//     public List<Citation> Citations { get; set; } = new();
// }