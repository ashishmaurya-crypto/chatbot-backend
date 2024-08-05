const validator = require('express-validator');
const users = require('./../models/users_model');
const Group = require('./../models/group_model');
const ContactList = require('./../models/contact_model');

const getUserDetail = async (req, res, next) => {
    // console.log('=====request', req)
    // console.log('=====request', req.userDetail._id)
    try {
        const userDetail = req.userDetail;
        const result = await users.find({
            _id: userDetail._id,
            isActive: true,
            isDeleted: false
        },'_id userName email phoneNumber gender age city state country').exec();
        // console.log('sent user details', result);
        res.send(result[0]);
    } catch (error) {
        // Handle errors here
        console.error('Error fetching user details:', error);
        res.status(500).send('Error fetching user details');
    }
}

const allUsers = async (req, res, next) => {
    try {
        const query = {
            isActive: true,
            isDeleted: false
        }
        if (req.body.name) {
            query['userName'] = new RegExp(req.body.name, "g")
        }
        const allCount = await users.countDocuments(query);
        if (allCount) {
            const { page_no, page_limit } = req.body;
            let limit = page_limit ? page_limit : 10;
            let skip = page_no ? (page_no - 1) * limit : 0;
            // console.log('query======>', query)
            const result = await users.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit).exec();
            res.status(200).send({
                data: result,
                count: allCount,
                success: true,
                message: result.length > 0 ? 'users Found !!!.' : 'No user found !!!.'
            });

        } else {
            res.status(500).send({ success: false, message: 'No user found' });
        }

    } catch (error) {
        // Handle errors here
        console.error('Error fetching user details:', error);
        res.status(500).send({ success: false, message: 'Error fetching user details' });
    }
};

const getContactList = async (req, res, next) => {
    try {
        const userDetail = req.userDetail;
        const contactList = await ContactList.findOne({ user: userDetail._id }).populate('user', 'userName email _id')
            .populate('friends', 'userName email _id')
            .populate('groups')
            .exec();
        // console.log('ddd===>', contactList)
        if (contactList) {
            return res.status(200).send({
                data: contactList,
                success: true,
                message: 'Contact list found !!!.',
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'No contact list found !!!.',
            });
        }

    } catch (error) {
        // Handle errors here
        console.error('Error fetching user details:', error);
        res.status(500).send({ success: false, message: 'An error occurred while fetching the contact list.' });
    }
}


const createQuery = (id, action) => {
    let updateQuery;

    switch (action) {
        case 'add':
            updateQuery = {
                $addToSet: { friends: id }
            }
            break;
        case 'remove':
            updateQuery = {
                $pull: { friends: id }
            }
            break;
        default:
            return res.status(400).json({ error: 'Invalid action' });
    }

    return updateQuery;

}


const updateContactlist = async (req, res, next) => {
    try {
        const { friendId, action } = req.body;
        if (!friendId) {
            return res.status(500).send({ success: false, message: 'friendId is required' });
        }
        if (!action) {
            return res.status(500).send({ success: false, message: 'action is required' });
        };
        const userDetail = req.userDetail;
        const friendDetail = await users.find({ _id: friendId, isActive: true, isDeleted: false }).exec();
        if (friendDetail) {
            const currentUserQuery = createQuery(friendId, action);
            const currentFriendQuery = createQuery(userDetail._id, action)
            await ContactList.updateOne(
                { user: userDetail._id },
                currentUserQuery
            );
            await ContactList.updateOne(
                { user: friendId },
                currentFriendQuery
            );
            if (action === 'add') {
                res.status(200).json({ message: 'add new contact successfully' });
            } else {
                res.status(200).json({ message: 'remove contact successfully' });
            }
        } else {
            res.status(500).send({ success: false, message: ' new contact user is not found' });
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send('Error in updating user contact list');
    }
}



module.exports = { getUserDetail, allUsers, updateContactlist, getContactList };
