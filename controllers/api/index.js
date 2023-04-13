const router = require('express').Router();
const userRoutes = require('./userRoutes');
const adminRoutes = require('./adminRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/project', projectRoutes);
router.use('/project', adminRoutes);

module.exports = router;
