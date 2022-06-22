const express = require("express");
const router = express.Router();
const Poll = require("../Schemas/pollSchema");

router.get("/", (req, res) => {
  res.render("createPoll");
});

router.post("/", async (req, res) => {
  const { title, description, option } = req.body;
  const options = option.map((op) => {
    return {
      name: op,
      vote: 0,
    };
  });

  const poll = new Poll({
    title,
    description,
    options,
  });

  try {
    await poll.save();
    res.redirect("/show");
  } catch {
    console.log("Post poll error");
  }
});

module.exports = router;
