let Group = require("../../models/groups.model");

const unban = async (req, res,next) => {
  const group_id = req.params.group_id
  const user_id = req.params.user_id
  const own_id = req.user_id
  //console.log(user_id)

  let members
  let banned_members
  let owners
  let error =await Group.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
      banned_members = response.banned_members
      owners=response.owners
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


  if (!banned_members.includes(user_id))  //check if user is banned
  {
    const msg = "User is not banned"
    console.log(msg)
    return next(new Error(msg))
  }


  await Group.updateOne({_id:group_id},
    { $pullAll: {banned_members: [user_id] } }
  )

  res.send("Finished operation")
}
module.exports = {
  unban: unban
}