const fs = require('fs');
const path = require('path')

const userPath = path.join('D:', 'myProjects', 'node_project', 'database', 'usersDB.json')
const users = require(userPath)

const writeFile = (data) => {
    fs.writeFile(userPath, JSON.stringify(data), err => {
        if (err) {
            console.log(err);
        }
    })
}

const writer = (userName, userAge) => {
    const userId = users[users.length - 1].id + 1
    const newUser = {id: userId, name: userName, age: userAge}

    users.push(newUser)
    writeFile(users)
}

const updater = (userId, userName, userAge) => {

    for (const user of users) {
        if (user.id === +userId) {
            user.name = userName
            user.age = userAge
        }
    }
    writeFile(users)
    return users
}

module.exports = {
    getUsers: (req, res) => {
        res.json(users)
    },

    getUserById: (req, res) => {
        const {user_id} = req.params
        const user = users.filter(user => user.id === +user_id)[0]
        res.json(user)
    },

    createUser: (req, res) => {
        writer(req.body.name, req.body.age)
        res.json(users[users.length - 1])
    },

    updateUser: (req, res) => {
        const {id, name, age} = req.body
        res.json(updater(id, name, age))
    }
}