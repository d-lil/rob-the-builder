const router = require('express').Router();
const { Project } = require('../../models');
const { User } = require('../../models');

const adminEmails = ['dahneel@gmail.com', 'scott.schulman84@gmail.com', 'matt email', 'saniyya.mcclendon@gmail.com']

const requireAdmin = (req, res, next) => {
    if (req.user && adminEmails.includes(req.user.email)) {
      next();
    } else {
      res.status(403).send('Access denied');
    }
  };

router.get('/admin', requireAdmin, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });
    const users = userData.map((user) => user.get({ plain: true }));

    res.render('admin', {
      users,
      logged_in: true,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});