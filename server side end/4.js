module.exports = function(app) {
  // Register HTTP endpoint to create new course
  app.post('/api/v1/courses/:courseId ', async function(req, res) {
    // Check if course already exists in the system
    const courseExists = await db.select('*').from('public.courses').where('code', req.body.code);
    if (!isEmpty(courseExists)) {
      return res.status(400).send('course exists');
    }
    
    const newCourse = {
      course: req.body.course,
      code: req.body.code,
      facultyId: req.body.facultyId,
    };
    try {
      const course = await db('public.courses').insert(newCourse).returning('*');
      return res.status(200).json(course);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not create course');
    }
  });

  // Register HTTP endpoint to delete course
  app.delete('/api/v1/courses/:courseId', async function(req, res) {
    try {
      const numDeleted = await db('public.courses').where('id', req.params.id).del();
      if (numDeleted > 0) {
        return res.status(200).send('Course deleted');
      } else {
        return res.status(400).send('Course not found');
      }
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not delete course');
    }
  });

  // Register HTTP endpoint to update course
  app.put('/api/v1/courses/:courseId', async function(req, res) {
    const updates = {};
    if (req.body.course) {
      updates.course = req.body.course;
    }
    if (req.body.code) {
      updates.code = req.body.code;
    }
    if (req.body.facultyId) {
      updates.facultyId = req.body.facultyId;
    }
    if (req.body.creditHours) {
        updates.course = req.body.creditHours;
      }
    try {
      const numUpdated = await db('public.courses').where('id', req.params.id).update(updates);
      if (numUpdated > 0) {
        return res.status(200).send('Course updated');
      } else {
        return res.status(400).send('Course not found');
      }
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not update course');
    }
  });
};
