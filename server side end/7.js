// Register HTTP endpoint to access enrolled students by facultyId
app.get('/api/v1/faculties/:facultyId', async function(req, res) {
  try {
    // Build the query
    let query = db.select('*').from('public.enrollments').join('public.students', 'enrollments.student_id', 'students.id');
    if (req.params.facultyId) {
      // Filter by faculty ID if provided
      query = query.join('public.courses', 'enrollments.course_id', 'courses.id').where('courses.faculty_id', req.params.facultyId);
    } 
    // Execute the query
    const enrollments = await query;
    return res.status(200).json(enrollments);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not retrieve enrollments');
  }
});
