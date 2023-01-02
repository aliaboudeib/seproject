  // Register HTTP endpoint to retrieve student information by ID
  app.get('/api/v1/admin/student/:id', async function(req, res) {
    try {
      // Query the database for the student
      const student = await db.select('*').from('public.students').where('id', req.params.id).first();
      if (student) {
        return res.status(200).json(student);
      } else {
        return res.status(400).send('Student not found');
      }
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not retrieve student');
    }
  });
