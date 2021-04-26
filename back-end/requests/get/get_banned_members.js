const axios = require("axios")
let Group = require("../../models/groups.model");

const get_banned_members = async (req, res, next) => {
    const group_id = req.params.group_id
    const user_id = req.user_id
    let members
    let banned_members

    let error = await Group.findOne({_id: group_id})
        .then(res => {
            members = res.members
            banned_members = res.banned_members
        })
        .catch(err => {
            const msg = "Error encountered retrieving the group in get_members_and_owners"
            console.log(err)
            return new Error(msg)
        })
    
    if (error)
    {
        return next(error)
    }

    if (!members.includes(user_id))
    {
        const msg = "Error: user is not authorized to see this group's information, they must be in the group to do so."
        console.log(msg)
        return next(new Error(msg))
    }

    return res.json({
        banned_members: banned_members,
    })
}

module.exports = {
    get_banned_members: get_banned_members
}