let Group = require("../../models/groups.model");

const get_pool = async (req, res, next) => {
    let group_id = req.params.group_id
    let requester = req.user_id
    let pool
    let members
    let error = await Group.findOne({_id: group_id})
      .then(res => {
        pool = res.pool
        members = res.members
        return false
      })
      .catch(err => {
        const msg = "Error: could not find group in get_pool endpoint"
        console.log(msg)
        console.log(err)
        return new Error(msg)
      })
    
    if (error)
    {
      return next(error)
    }
  
    if (!members.includes(requester))
    {
      const msg = "Error: user not in group"
      console.log(msg)
      return next(new Error(msg))
    }
  
    return res.json({pool: pool})
}

module.exports = {
    get_pool: get_pool
}