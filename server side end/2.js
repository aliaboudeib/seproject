app.post('/api/v1/user/enroll', async function(req, res) {
  // get user ID and faculty ID from the request body
  const { userId, facultyId } = req.body;
  if (!userId) {
    // If the user ID is not present, return a 400 Bad Request response
    return res.status(400).send('userId is required');
  }
  if (!facultyId) {
    // If the faculty ID is not present, return a 400 Bad Request response
    return res.status(400).send('facultyId is required');
  }

  // check if the user already exists in the system
  const userExists = await db.select('*').from('public.users').where('id', userId);
  if (isEmpty(userExists)) {
    // If the user does not exist, return a 400 Bad Request response
    return res.status(400).send('user does not exist');
  }

  // check if the user is already enrolled in a faculty
  const userEnrollmentExists = await db.select('*').from('public.users').where({ id: userId, facultyId });
  if (!isEmpty(userEnrollmentExists)) {
    // If the user is already enrolled in the specified faculty, return a 400 Bad Request response
    return res.status(400).send('user is already enrolled in the specified faculty');
  }

  // update the user's faculty ID in the users table
  try {
    const updatedUser = await db('public.users')
      .where('id', userId)
      .update({ facultyId })
      .returning('*');
    return res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not enroll user in faculty');
  }
});
