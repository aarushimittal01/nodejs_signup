const usersDB = require('../data-store/users').usersDB
const userNameDB = require('../data-store/users').userNameDB

//1) list of users
//2) return username, password / error for that user
//3) get all users
//4) delete users


function generatePassword(email) {
    let password = (Math.random() * 1000) + email[0] + email[1] + email[3] + email[4]
    return password
}

function createUser(req, res) {
    try{
        let name, userName, password;
        if(req.body.name) {
        name = req.body.name.split(' '); 
        } else throw new Error({code: 400, message: "Name is not provided"})

        if(req.body.companyName) {
            userName = name.join('') + req.body.companyName
        } else throw new Error({code: 400, message: "Company Name is not provided"})

        if(userNameDB.has(userName)) throw new Error({code: 400, message: "User name already exists"})
        else {
            password = generatePassword(req.body.email)
            usersDB.push({
                [userName]: {
                    name: req.body.name,
                    email: req.body.email,
                    phoneNo: req.body.phoneNo,
                    companyName: req.body.companyName,
                    password
                }
            })
            userNameDB.add(userName)
        }

        res.status(200).json("New User created")

    } catch (e) {
        if(e.message && e.code) {
            console.log("Error : ", e.message)
            res.status(e.code).json(e.message)
        } else {
            console.log("Error : ", e)
            res.status(500).json(e)
        }
    }
}

module.exports = {
    createUser
}
