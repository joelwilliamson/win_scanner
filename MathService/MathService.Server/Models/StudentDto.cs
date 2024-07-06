namespace MathService.Server.Models.ContosoUniversity
{
    public class StudentDto
    {
        public class Enrollment
        public int StudentID { get; set; }

        public string? LastName { get; set; }

        public string? FirstMidName { get; set; }

        public DateTime? EnrollmentDate { get; set; }

        public ICollection<Enrollment>? Enrollments { get; set; }
    }
}