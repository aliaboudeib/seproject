app.put('/api/v1/courses/:courseId/drop', async function(req, res) {
  // get user's credentials from the JSON body
  const { email, password, courseId } = req.body;
  if (!email) {
    // If the email is not present, return an HTTP unauthorized code
    return res.status(400).send('email is required');
  }
  if (!password) {
    // If the password is not present, return an HTTP unauthorized code
    return res.status(400).send('Password is required');
  }
  if (!courseId) {
    // If the courseId is not present, return an HTTP bad request code
    return res.status(400).send('courseId is required');
  }

  // validate the provided password against the password in the database
  // if invalid, send an unauthorized code
  const user = await db.select('*').from('public.users').where('email', email).first();
  if (isEmpty(user)) {
    return res.status(400).send('user does not exist');
  }
  if (user.password !== password) {
    return res.status(401).send('Password does not match');
  }

  // check if the user is enrolled in the given course
  const enrollment = await db.select('*').from('public.enrollments').where({ userId: user.id, courseId }).first();
  if (isEmpty(enrollment)) {
    return res.status(400).send('user is not enrolled in the given course');
  }

  // update the enrollment to inactive
  try {
    const updatedEnrollment = await db('public.enrollments').update({ active: false }).where({ userId: user.id, courseId }).returning('*');
    return res.status(200).json(updatedEnrollment);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not drop course');
  }
});
