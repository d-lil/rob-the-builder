const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

//endpoint to create a new project 
router.post('/', withAuth, async (req, res) => {
  try {
    //save new project in the db
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(420).json(err);
  }
});

//delete project using current user id 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
