let Group = require("../../models/groups.model");
const kick_member = async (req, res,next) => {
  const group_id = req.params.group_id
  const user_id = req.params.user_id
  const own_id=req.user_id
  //console.log(own_id)

  let members
  let owners
  let error =await Group.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
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


  if (!members.includes(user_id))  //member not in group
  {
    const msg = "User is not in the group"
    console.log(msg)
    return next(new Error(msg))
  }
  if (owners.includes(user_id))  //user is an owner, cannot be kicked
  {
    const msg = "User is an owner, cannot be kicked"
    console.log(msg)
    return next(new Error(msg))
  }


  await Group.updateOne({_id:group_id},
    { $pullAll: {members: [user_id] } }
  )

  res.send("Finished operation")
}
module.exports = {
  kick_member: kick_member
}