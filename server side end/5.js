// Register HTTP endpoint to view faculty transfer requests
app.get('/api/v1/transfers', async function(req, res) {
  try {
    // Query the database for all faculty transfer requests
    const requests = await db.select('*').from('public.transfer_requests');
    return res.status(200).json(requests);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send('Could not retrieve transfer requests');
  }
});
