app.post('/api/v1/faculties/transfer ', async function(req, res) {
    // get user ID and new faculty ID from the JSON body
    const { userId, newFacultyId } = req.body;
    if (!userId) {
      // If the user ID is not present, return an HTTP bad request code
      return res.status(400).send('userId is required');
    }
    if (!newFacultyId) {
      // If the new faculty ID is not present, return an HTTP bad request code
      return res.status(400).send('newFacultyId is required');
    }
  
    // get the current faculty ID for the user
    const user = await db.select('*').from('public.users').where('id', userId).first();
    if (isEmpty(user)) {
      return res.status(400).send('user does not exist');
    }
    const currentFacultyId = user.facultyId;
  
    // create a new transfer request with a pending status
    const transferRequest = {
      userId,
      currentFacultyId,
      newFacultyId,
      status: 'pending',
    };
    try {
      await db('public.facultyTransfer').insert(transferRequest);
      return res.status(200).send('transfer request created');
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not create transfer request');
    }
  });