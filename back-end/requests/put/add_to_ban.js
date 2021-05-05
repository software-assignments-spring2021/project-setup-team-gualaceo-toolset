let Group = require("../../models/groups.model");

const add_to_ban = async (req, res,next) => {
  const group_id = req.params.group_id
  const user_id = req.params.user_id
  const own_id = req.user_id

  let members
  let banned_members
  let owners
  let error =await Group.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
      banned_members = response.banned_members
      owners = response.owners
    })
    .catch(err => {
      const msg = "Cannot find the group" 
      console.log(msg)
      return new Error(msg)
    })

  if(error)
  {
      return next(error)
  }

  if (!owners.includes(own_id))  //not an owner
  {
    const msg = "You are not an owner, cannot perform this action"
    console.log(msg)
    return next(new Error(msg))
  }

  if (banned_members.includes(user_id))  //check if banned already
  {
    const msg = "User is already banned"
    console.log(msg)
    return next(new Error(msg))
  }
  if (owners.includes(user_id))  //group owner cannot be banned
  {
    const msg = "User is group owner, cannot be banned"
    console.log(msg)
    return next(new Error(msg))
  }

  //add user to the banned list
  await Group.updateOne({_id:group_id},
  {
    $push:{banned_members:user_id}
  },
  {safe: true, upsert: true}
  )

  if(members.includes(user_id))  //if the member is in the group, remove it
  {
    await Group.updateOne({_id:group_id},
    { $pullAll: {members: [user_id] }})
  }

  res.send("Finished operation")
}
module.exports = {
  add_to_ban: add_to_ban
}