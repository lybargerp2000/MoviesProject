using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            // Retrieve all movies from db logic
            var movies = _context.Movies.Select(a => a);
            return Ok(movies);
        }

        // GET api/movie/5

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = _context.Movies.Where(a => a.MovieId == id).SingleOrDefault();
            // return Ok(movie);
            return Ok(movie);
        }

        // GET api/movie/string

        [HttpGet("{input}")]
        public IActionResult Get(string input)
        {
            var movies = _context.Movies.Where(a => a.Title.Contains(input) || a.Director.Contains(input) || a.Genre.Contains(input));
            return Ok(movies);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok(value);
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            var foundMovie = _context.Movies.Where(a => a.MovieId == movie.MovieId).SingleOrDefault();
            foundMovie.Title = movie.Title;
            foundMovie.Director = movie.Director;
            foundMovie.Genre = movie.Genre;
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete movie from db logic
            var foundMovie = _context.Movies.Where(a => a.MovieId == id).SingleOrDefault();
            _context.Remove(foundMovie);
            _context.SaveChanges();
            return Ok();
        }
    }
}