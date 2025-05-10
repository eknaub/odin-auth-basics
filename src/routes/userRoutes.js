const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/join-the-club",
  authMiddleware.isAuthenticated,
  userController.getJoinTheClubPage
);
router.post(
  "/join-the-club",
  authMiddleware.isAuthenticated,
  userController.updateUserMembershipStatus
);

module.exports = router;
