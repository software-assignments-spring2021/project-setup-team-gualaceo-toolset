const router = require("express").Router();
let Group = require("../models/groups.model");

router.route("/").get((req, res) => {
  Group.find()
    .then((groups) => {
      res.json(groups);
      console.log(req.params);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/me").get((req, res) => {
  Group.find({ members: req.body.user })
    .then((groups) => res.json(groups))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/id/:id").get((req, res) => {
  Group.find({ _id: { $eq: req.params.id } })
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const members = req.body.members;
  const owners = req.body.owners;
  const href = req.body.href;
  const newGroup = new Group({ members, owners, href });
  newGroup
    .save()
    .then(() => res.json("Group Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
