const express = require("express");
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware.isAuthenticated, messageController.getDashboard);
router.post(
  "/add-message",
  authMiddleware.isAuthenticated,
  messageController.addMessage
);
router.post(
  "/delete-message/:id",
  authMiddleware.isAuthenticated,
  messageController.deleteMessage
);

module.exports = router;
