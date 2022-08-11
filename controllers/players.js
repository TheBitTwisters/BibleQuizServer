const bcrypt     = require('bcrypt')
const Member     = require('../models/Member')
const Group      = require('../models/Group')
const Attendance = require('../models/Attendance')
const jwt        = require('../middlewares/jwt')

const getAll = async (req, res) => {
  try {
    var members = await Member.getAll()
    var groups = await Group.getAll()
    res.status(200).json({
      err: false,
      code: 200,
      message: 'All groups and members fetched successfully',
      members: members,
      groups: groups,
      session: req.session
    })
  } catch (err) {
    res.status(500).json(err)
  }
}
const getGroups = (req, res) => {
  Group.getAll()
    .then(async (groups) => {
      for (let group of groups) {
        group.members = await Member.search({ group_id: group.id }, {})
      }
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Groups fetched successfully',
        groups: groups,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
const getMembers = (req, res) => {
  Member.getAll()
    .then(async (members) => {
      for (let member of members) {
        member.group = await Group.get({ id: member.group_id }, {})
      }
      res.status(200).json({
        err: false,
        code: 200,
        message: 'Members fetched successfully',
        members: members,
        session: req.session
      })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const createGroup = (req, res) => {
  const group = new Group(req.body.group)
  group.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Group created successfully',
          group: group,
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create group'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const updateGroup = (req, res) => {
  Group.get({ id: req.params.group_id })
    .then(group => {
      group.updateData(req.body.group)
      group.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Group updated successfully',
              group: group,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update group'
            })
          }
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const createMember = (req, res) => {
  const member = new Member(req.body.member)
  member.save()
    .then(result => {
      if (result) {
        res.status(200).json({
          err: false,
          code: 200,
          message: 'Member created successfully',
          member: member,
          session: req.session
        })
      } else {
        res.status(409).json({
          err: true,
          code: 409,
          message: 'Failed to create member'
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
const updateMember = (req, res) => {
  Member.get({ id: req.params.member_id })
    .then(member => {
      member.updateData(req.body.member)
      member.save()
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Member updated successfully',
              member: member,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update member'
            })
          }
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
const setMemberGroup = (req, res) => {
  Member.get({ id: req.params.member_id })
    .then(member => {
      member.setGroup(req.body.group_id)
        .then(result => {
          if (result) {
            res.status(200).json({
              err: false,
              code: 200,
              message: 'Member\'s group updated successfully',
              member: member,
              session: req.session
            })
          } else {
            res.status(409).json({
              err: true,
              code: 409,
              message: 'Failed to update member\'s group'
            })
          }
        })
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  getAll,
  getGroups,
  getMembers,
  createGroup,
  updateGroup,
  createMember,
  updateMember,
  setMemberGroup
}
