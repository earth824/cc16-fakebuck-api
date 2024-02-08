const { RELATIONSHIP_STATUS } = require('../constants');
const prisma = require('../models/prisma');

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
