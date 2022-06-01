const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/reset_password_controller');

router.get('/', resetPasswordController.forgotPasswordForm);
router.post('/mail', resetPasswordController.resetPasswordLink);
router.get(
  '/resetlink/accesstoken/:token',
  resetPasswordController.resetPasswordForm
);
router.post('/reset', resetPasswordController.resetPasswordDetails);

module.exports = router;
