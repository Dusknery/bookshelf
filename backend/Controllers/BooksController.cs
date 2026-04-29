using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    //GET all books
    [HttpGet]
    public async Task<ActionResult<List<Book>>> GetBooks()
    {
        return await _context.Books.ToListAsync();
    }


    //Get book by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return book;
    }

    //POST create new book
    [HttpPost]
    public async Task<ActionResult<Book>> AddBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetBook", new { id = book.Id }, book);
    }

    //PUT update book
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, Book updatedBook)
    {
        if (id != updatedBook.Id)
            return BadRequest();

        var existingBook = await _context.Books.FindAsync(id);
        if (existingBook == null)
            return NotFound();

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.PublicationDate = updatedBook.PublicationDate;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    //DELETE book
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
            return NotFound();

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
