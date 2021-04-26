const router = require("express").Router();
let Group = require("../models/groups.model");
const add_to_pool = require("../requests/put/add_to_pool");
const remove_from_pool = require("../requests/delete/remove_from_pool")
const user_id = require("../requests/get/user_id");
const add_members = require("../requests/put/add_members");
const get_members_and_owners = require("../requests/get/get_members_and_owners")
const add_to_ban = require("../requests/put/add_to_ban");
const kick_member = require("../requests/put/kick_member");
const unban = require("../requests/put/unban");
const get_banned_members = require("../requests/get/get_banned_members");

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

//get user id, and set it for any routes which require it
router.use("/add_to_pool/:group_id/:playlist_id/:bearer", user_id.get_user_id);
router.use("/remove_from_pool/:group_id/:playlist_id/:bearer", user_id.get_user_id)
router.use("/get_members_and_owners/:group_id/:bearer",user_id.get_user_id)
router.use("/get_banned_members/:group_id/:bearer", user_id.get_user_id)

router.get("/get_members_and_owners/:group_id/:bearer", get_members_and_owners.get_members_and_owners)
router.get("/get_banned_members/:group_id/:bearer", get_banned_members.get_banned_members)

router.put(
  "/add_to_pool/:group_id/:playlist_id/:bearer",
  add_to_pool.add_to_pool
);

router.delete("/remove_from_pool/:group_id/:playlist_id/:bearer", remove_from_pool.remove_from_pool)

router.put("/add_members/:group_id/:user_id", add_members.add_members)
router.use("/add_to_ban/:group_id/:user_id/:bearer", user_id.get_user_id);
router.put("/add_to_ban/:group_id/:user_id/:bearer", add_to_ban.add_to_ban)
router.use("/kick_member/:group_id/:user_id/:bearer", user_id.get_user_id)
router.put("/kick_member/:group_id/:user_id/:bearer", kick_member.kick_member)
router.use("/unban/:group_id/:user_id/:bearer", user_id.get_user_id)
router.put("/unban/:group_id/:user_id/:bearer", unban.unban)

router.use("/playlist_id/:group_id/:bearer", user_id.get_user_id)
router.get("/playlist_id/:group_id/:bearer", async (req, res, next) => {
  let group_id = req.params.group_id
  let generated_playlist_id
  let error = await Group.findOne({_id: group_id})
    .then(res => {
      generated_playlist_id = res.generated_playlist_id
    })
    .catch(err => {
      console.log(err)
      return new Error(err)
    })

  if (error)
  {
    return next(error)
  }

  return res.json({generated_playlist_id: generated_playlist_id})
})
router.use("/playlist_is_generated/:group_id/:bearer", user_id.get_user_id)
router.get("/playlist_is_generated/:group_id/:bearer", async (req, res, next) => {
  let user_id = req.user_id
  let group_id = req.params.group_id
  let members
  let playlist_is_generated
  let error = await Group.findOne({_id: group_id})
    .then(res => {
      playlist_is_generated = res.playlist_is_generated
      members = res.members
    })
    .catch(err => {
      const msg = "Error: could not retrieve group"
      console.log(msg)
      console.log(err)
      return new Error(msg)
    })
  if (error)
  {
    return next(error)
  }

  if (!members.includes(user_id))
  {
    const msg = "Error: user not in group"
    console.log(msg)
    return new Error(msg)
  }

  return res.json({playlist_is_generated: playlist_is_generated})
  
})

module.exports = router;
