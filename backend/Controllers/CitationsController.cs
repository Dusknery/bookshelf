using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/citations")]
public class CitationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public CitationsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Citation>>> GetCitations()
    {
        return await _context.Citations.ToListAsync();
    }
}