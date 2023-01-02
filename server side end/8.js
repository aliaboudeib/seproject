// Register HTTP endpoint to provide grades to students
app.put('/api/v1/enrollment/:courseId', async function(req, res) {
  if (!req.body.grade) {
    return res.status(400).send('Missing required parameter: grade');
  }
  try {
    // Update the enrollment in the database
    const numUpdated = await db('public.enrollments')
      .where('id', req.params.courseId)
      .update({ grade: req.body.grade });
    if (numUpdated > 0) {
      return res.status(200).send('Grade update');
    } else {
      return res.status(400).send('Enrollment not found');
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not update grade');
  }
});
