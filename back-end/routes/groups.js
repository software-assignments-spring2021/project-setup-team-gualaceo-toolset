const router = require("express").Router();
let Group = require("../models/groups.model");
const add_to_pool = require("../requests/put/add_to_pool");
const user_id = require("../requests/get/user_id");
const add_members = require("../requests/put/add_members");
const add_to_ban = require("../requests/put/add_to_ban");
const kick_member = require("../requests/put/kick_member");
const unban = require("../requests/put/unban");

router.route("/").get((req, res) => {
  Group.find()
    .then((groups) => {
      res.json(groups);
      console.log(req.params);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/me/:user").get((req, res) => {
  // console.log(req.params);
  Group.find({ members: req.params.user })
    .then((groups) => {
      res.json(groups);
    })
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
  const generated_playlist_id = req.body.generated_playlist_id;
  const banned_members = req.body.banned_members;
  const pool = req.body.pool;
  const newGroup = new Group({ members: members, owners: owners, generated_playlist_id: generated_playlist_id, banned_members: banned_members, pool:pool })
  newGroup
    .save()
    .then((mongooseResponse) => res.json(mongooseResponse))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.use("/add_to_pool/:group_id/:playlist_id/:bearer", user_id.get_user_id);
router.put(
  "/add_to_pool/:group_id/:playlist_id/:bearer",
  add_to_pool.add_to_pool
);


router.use("/add_to_pool/:group_id/:playlist_id/:bearer", user_id.get_user_id);
router.put(
  "/add_to_pool/:group_id/:playlist_id/:bearer",
  add_to_pool.add_to_pool
);


router.get("/add_members/:group_id/:user_id", add_members.add_members)

router.use("/add_to_ban/:group_id/:user_id/:bearer", user_id.get_user_id);
router.put("/add_to_ban/:group_id/:user_id/:bearer", add_to_ban.add_to_ban)
router.use("/kick_member/:group_id/:user_id/:bearer", user_id.get_user_id)
router.put("/kick_member/:group_id/:user_id/:bearer", kick_member.kick_member)
router.use("/unban/:group_id/:user_id/:bearer", user_id.get_user_id)
router.put("/unban/:group_id/:user_id/:bearer", unban.unban)

module.exports = router;
