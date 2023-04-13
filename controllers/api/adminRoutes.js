const router = require('express').Router();
const { Project } = require('../../models');
const { User } = require('../../models');

const requireAdmin = (req, res, next) => {
      console.log("require admin")
      console.log(req.session)
      if (req.session.is_admin) {
      next();
    } else {
      res.status(403).send('Access denied');
    }
  };

router.get('/project', requireAdmin, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });
    const users = userData.map((user) => user.get({ plain: true }));

    res.render('project', {
      users,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;