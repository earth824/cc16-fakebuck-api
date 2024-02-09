const {
  RELATIONSHIP_STATUS,
  RELATIONSHIP_TO_AUTH_USER
} = require('../constants');
const prisma = require('../models/prisma');

const userFilter = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  mobile: true,
  profileImage: true,
  coverImage: true,
  createdAt: true,
  updatedAt: true
};

exports.createRelationship = (senderId, receiverId) =>
  prisma.relationship.create({ data: { senderId, receiverId } });

exports.checkExistRelationshipBetweenTwoUser = (userId1, userId2) =>
  prisma.relationship.findFirst({
    where: {
      AND: [
        {
          OR: [
            { status: RELATIONSHIP_STATUS.PENDING },
            { status: RELATIONSHIP_STATUS.ACCEPTED }
          ]
        },
        {
          OR: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
          ]
        }
      ]
    }
  });

exports.findRelationship = where => prisma.relationship.findFirst({ where });

exports.updateRelationship = (data, id) =>
  prisma.relationship.update({ data, where: { id } });

exports.findFriendsByUserId = async userId => {
  // SELECY * FROM realtionships WHERE status = ACCEPTED AND snderId = userId OR reciverId = userId
  const relationships = await prisma.relationship.findMany({
    where: {
      status: RELATIONSHIP_STATUS.ACCEPTED,
      OR: [{ senderId: userId }, { receiverId: userId }]
    },
    select: {
      sender: {
        select: userFilter
      },
      receiver: {
        select: userFilter
      }
    }
  });

  const friends = relationships.map(el =>
    el.sender.id === userId ? el.receiver : el.sender
  );
  return friends;
};

exports.findUserOneRelationshipToUserTwo = async (userId1, userId2) => {
  if (userId1 === userId2) {
    return RELATIONSHIP_TO_AUTH_USER.ME;
  }

  const relationship = await prisma.relationship.findFirst({
    where: {
      AND: [
        {
          OR: [
            { status: RELATIONSHIP_STATUS.PENDING },
            { status: RELATIONSHIP_STATUS.ACCEPTED }
          ]
        },
        {
          OR: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 }
          ]
        }
      ]
    }
  });

  if (!relationship) {
    return RELATIONSHIP_TO_AUTH_USER.UNKNOWN;
  }

  if (relationship.status === RELATIONSHIP_STATUS.ACCEPTED) {
    return RELATIONSHIP_TO_AUTH_USER.FRIEND;
  }

  if (relationship.senderId === userId1) {
    return RELATIONSHIP_TO_AUTH_USER.SENDER;
  }

  return RELATIONSHIP_TO_AUTH_USER.RECEIVER;
};

exports.findFriendsIdByUserId = async userId => {
  const relationships = await prisma.relationship.findMany({
    where: {
      status: RELATIONSHIP_STATUS.ACCEPTED,
      OR: [{ senderId: userId }, { receiverId: userId }]
    },
    select: {
      sender: {
        select: userFilter
      },
      receiver: {
        select: userFilter
      }
    }
  });

  const friendsId = relationships.map(el =>
    el.sender.id === userId ? el.receiver.id : el.sender.id
  );
  return friendsId;
};
