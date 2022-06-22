const express = require("express");
const router = express.Router();
const Poll = require("../Schemas/pollSchema");

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.render("showPolls", { polls });
  } catch {
    console.log("Get Polls Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const polls = await Poll.findById(id);

    const options = [...polls.options];
    console.log(options);
    let result = [];

    options.forEach((o) => {
      const percentige = (o.vote * 100) / polls.totalVote;

      result.push({
        ...o._doc,
        percentige: percentige ? percentige : 0,
      });
    });
    for (let r of result) {
      console.log("rrr", r);
    }
    res.render("viewPoll", { polls, result });
  } catch {
    console.log("Get Polls Error");
  }
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const optionID = req.body.oponion;

  try {
    const poll = await Poll.findById(id);
    const options = [...poll.options];
    const index = options.findIndex((o) => o.id === optionID);
    options[index].vote = options[index].vote + 1;
    const totalVote = poll.totalVote + 1;

    await Poll.findOneAndUpdate(
      { _id: poll._id },
      {
        $set: {
          options,
          totalVote,
        },
      }
    );
    res.redirect("/show/" + id);
  } catch {
    () => {
      console.log(err);
    };
  }
});

module.exports = router;
