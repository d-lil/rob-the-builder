const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

//function to require admin auth
const requireAdmin = (req, res, next) => {
      console.log("require admin")
      console.log(req.session)
      if (req.session.is_admin) {
      next();
    } else {
      res.status(403).send('Access denied');
    }
  };

  //when logged in taken to homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route to reviews view
router.get('/reviews', async (req, res) => {
  try {
   res.render('reviews');
  } catch (err) {
    res.status(500).json(err);
  }
});

//route for admin to access all project data
router.get('/project', requireAdmin, async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('project', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route for indiidual project view
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('projectz', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//route for individual profile view
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
