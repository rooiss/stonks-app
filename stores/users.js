const users = {}

const setUser = (username, userdeets) => {
  // add the user with the deets into the users object
  users[username] = {
    ...userdeets,
  }
}

const getUser = (username) => {
  return users[username]
}

exports.getUser = getUser
exports.setUser = setUser
