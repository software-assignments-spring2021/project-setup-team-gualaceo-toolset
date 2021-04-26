const axios = require("axios")
const set_authentication = require("../other/authentication.js").set_authentication
let Group = require("../../models/groups.model");

const get_members_and_owners = async (req, res, next) => {
    const group_id = req.params.group_id
    const user_id = req.user_id
    let members
    let owners

    let error = await Group.findOne({_id: group_id})
        .then(res => {
            members = res.members
            owners = res.owners
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
        members: members,
        owners: owners,
        requester: user_id,
    })
}

module.exports = {
    get_members_and_owners: get_members_and_owners
}