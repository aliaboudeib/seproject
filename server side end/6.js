// Register HTTP endpoint to approve faculty transfer request
app.post('/api/v1/transfers/:transferId', async function(req, res) {
  try {
    // Update the transfer request in the database
    const { status } = req.body;
    const numUpdated = await db('public.transfer_requests')
      .where('id', req.params.transferId)
      .update({ status: status })
      .returning('*');
    if (numUpdated > 0) {
        if(status=="approved")
        {
            const updatedUser = await db('public.users')
            .where('id', numUpdated.userId)
            .update({ facultyId:numUpdated.newFacultyId })
            .returning('*');
        }
      return res.status(200).send('Transfer request '+ status);
    } else {
      return res.status(400).send('Transfer request not found');
    }
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not approve transfer request');
  }
});
