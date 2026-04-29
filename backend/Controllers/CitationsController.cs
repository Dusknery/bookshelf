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

    //GET all citations

    [HttpGet]
    public async Task<ActionResult<List<Citation>>> GetCitations()
    {
        return await _context.Citations.ToListAsync();
    }


    //Get citation by id
    [HttpGet("{id}")]
    public async Task<ActionResult<Citation>> GetCitation(int id)
    {
        var citation = await _context.Citations.FindAsync(id);
        if (citation == null)
        {
            return NotFound();
        }
        return citation;
    }

    //POST create new citation
    [HttpPost]
    public async Task<ActionResult<Citation>> AddCitation(Citation citation)
    {
        _context.Citations.Add(citation);
        await _context.SaveChangesAsync();
        return CreatedAtAction("GetCitation", new { id = citation.Id }, citation);
    }

    //PUT update citation
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCitation(int id, Citation updatedCitation)
    {
        if (id != updatedCitation.Id)
            return BadRequest();

        var existingCitation = await _context.Citations.FindAsync(id);
        if (existingCitation == null)
            return NotFound();

        existingCitation.CitationText = updatedCitation.CitationText;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    //DELETE citation
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCitation(int id)
    {
        var citation = await _context.Citations.FindAsync(id);
        if (citation == null)
            return NotFound();

        _context.Citations.Remove(citation);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
