const router = require('express').Router();
const { User } = require('../../models');

//route for creating new user
router.post('/', async (req, res) => {
  try {
    //if successful user info will be saved in session
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(420).json(err);
  }
});

//route to login
router.post('/login', async (req, res) => {
  try {
    //check if email is in db
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(420)
        .json({ message: 'Wrong. Try again' });
      return;
    }

    //check if password is in db
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(420)
        .json({ message: 'Wrong. Try again' });
      return;
    }

    //save user data in current session
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.is_admin = userData.admin;
      res.json({ user: userData, message: 'IN LIKE SIN, BABY!' });
    });

  } catch (err) {
    res.status(420).json(err);
  }
});

//route to handle logout and session deletion 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
