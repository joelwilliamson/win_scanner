using System.ComponentModel.DataAnnotations.Schema;

namespace MathService.Server.Models.ContosoUniversity
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CourseID { get; set; }

        public string? Title { get; set; }

        public double Credits { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}
