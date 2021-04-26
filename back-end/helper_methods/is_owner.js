let Group = require("../models/groups.model");

const is_owner = async (user_id, group_id) => {
  let owners 

  let error = await Group.findOne({_id:group_id})
    .then(res => {
      owners = res.owners
      return false
    })
    .catch(err => {
      console.log(err)
      return new Error(err)
    })

  if (error)
  {
    return error
  }

  // if the user is not in the owners array, return false
  if (!owners.includes(user_id))
  {
    return false
  }

  return true
}

module.exports = {
  is_owner: is_owner
}