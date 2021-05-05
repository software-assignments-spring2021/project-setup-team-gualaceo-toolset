let Group = require("../../models/groups.model");

const request_regeneration = async (req, res,next) => {
  const group_id = req.params.group_id
  const own_id = req.user_id

  let members
  let banned_members
  let error =await Group.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
      banned_members = response.banned_members
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

  if (!members.includes(own_id))  //not a member
  {
    const msg = "You are not an member, cannot request regeneration"
    console.log(msg)
    return next(new Error(msg))
  }

  if (banned_members.includes(own_id))  //check if banned
  {
    const msg = "You are banned, cannot request regeneration"
    console.log(msg)
    return next(new Error(msg))
  }
  //request regeneration
  await Group.updateOne({_id:group_id},
  {
    $set:{regeneration_requested: true}
  },
  {safe: true, upsert: true}
  )


  res.send("Finished operation")
}
module.exports = {
  request_regeneration: request_regeneration
}