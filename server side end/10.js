// Register HTTP endpoint to retrieve enrollments information for courseId
app.get('/api/v1/enrollment/:courseId', async function(req, res) {
  try {
    // Query the database for the enrollments
    const enrollments = await db.select('*').from('public.enrollments').where('courseId', req.params.courseId).first();
    if (enrollments) {
      return res.status(200).json(enrollments);
    } else {
      return res.status(400).send('enrollment not found');
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not retrieve enrollments');
  }
});
