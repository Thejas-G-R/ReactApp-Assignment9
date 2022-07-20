const User = require("../model/user")
const bcrypt = require("bcrypt");
module.exports = (app) => {
    const EmailIdRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+");
    const PasswordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$");
    app.get('/user/getAll', function (req, res) {
        User.find({}, function (err, users) {
            if (err)
                res.send({ errCode: 1000, errMessage: "Error occurred while trying get all users " + err });
            res.status(200);
            res.json({ errCode: 0, users });
        });
    });

    app.post('/user/create', async (req, res) => {
        const emailId = req ? req.body ? req.body.emailId ? req.body.emailId : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;
        res.status(200);
        if (!emailId || !password) {
            res.json({ errCode: 1001, errMessage: "No emailId or Password" });
        } else if (emailId && !EmailIdRegex.test(emailId)) {
            res.json({ errCode: 1002, errMessage: "Email must be of pattern email@domain.com" });
        } else if (password && !PasswordRegex.test(password)) {
            res.json({ errCode: 1003, errMessage: "Password must be of Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" });
        } else if (emailId && EmailIdRegex.test(emailId) && password && PasswordRegex.test(password)) {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) {
                    res.json({
                        errCode: 1006, errMessage: "User can't be created and saved ------" + err
                    });
                } else {
                    let rec = new User({ emailId, passwordHash: hash });
                    rec.save(function (err, n) {
                        if (err) {
                            res.status(200);
                            if (err.code === 11000) {
                                res.json({ errCode: 1004, errMessage: "User can't be created and saved ------" + "EmailId already exists try a different one" });
                            } else {
                                res.json({ errCode: 1004, errMessage: "User can't be created and saved ------" + err });
                            }
                        } else {
                            res.json({ errCode: 0, documentSaved: n });
                        }
                    });
                }
            });

        }
    });

    app.post('/user/edit', async (req, res) => {
        const newEmailId = req ? req.body ? req.body.emailId ? req.body.emailId : null : null : null;
        const newpassword = req ? req.body ? req.body.password ? req.body.password : null : null : null;
        const oldpassword = req ? req.body ? req.body.oldPassword ? req.body.oldPassword : null : null : null;
        const oldEmailId = req ? req.body ? req.body.oldEmailId ? req.body.oldEmailId : null : null : null;
        res.status(200);
        if (!newEmailId || !newpassword || !oldEmailId || !oldpassword) {
            res.json({ errCode: 1001, errMessage: "No new or old emailIds or Passwords" });
        }
        else if (newEmailId && !EmailIdRegex.test(newEmailId)) {
            res.json({ errCode: 1002, errMessage: "New email must be of pattern email@domain.com" });
        }
        else if (newpassword && !PasswordRegex.test(newpassword)) {
            res.json({ errCode: 1003, errMessage: "New password must be of Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" });
        }
        else if (oldEmailId && !EmailIdRegex.test(oldEmailId)) {
            res.json({ errCode: 1002, errMessage: "Old email must be of pattern email@domain.com" });
        }
        else if (oldpassword && !PasswordRegex.test(oldpassword)) {
            res.json({ errCode: 1003, errMessage: "Old password must be of Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" });
        }
        else if (newEmailId && EmailIdRegex.test(newEmailId) && newpassword && PasswordRegex.test(newpassword) && oldEmailId && EmailIdRegex.test(oldEmailId)) {
            const salt = bcrypt.genSaltSync(10);
            const newPasswordHash = bcrypt.hashSync(newpassword, salt);
            // console.log("old " + oldEmailId + "--- new : " + newEmailId)
            User.findOne({ emailId: oldEmailId }, function (err, docs) {
                res.status(200)
                if (err) {
                    res.json({ errCode: 1000, errMessage: "Could not find user --- error: " + err })
                } else {
                    if (!docs)
                        res.json({ errCode: 1005, errMessage: "Could not find user --- error: " + "User with provided email Id doesn't exist" })
                    else {
                        let hash = docs.passwordHash;
                        bcrypt.compare(oldpassword, hash, function (err, result) {
                            if (err) {
                                res.json({ errCode: 1000, errMessage: err })
                            }
                            else if (result == true) {
                                docs.emailId = newEmailId;
                                docs.passwordHash = newPasswordHash;
                                docs.save(function (err, result) {
                                    res.status(200);
                                    if (err) {
                                        if (err.code === 11000) {
                                            res.json({ errCode: 1004, errMessage: "User can't be updated------" + "EmailId already exists try a different one" });
                                        }
                                        else {
                                            res.json({ errCode: 1000, errMessage: "User can't be updated ------" + err });
                                        }
                                    }
                                    else {
                                        res.json({ errCode: 0, documentSaved: result });
                                    }
                                })
                            } else {
                                res.json({ errCode: 1006, errMessage: "Old Password entered is wrong" })
                            }
                        });
                    }
                }
            })
        }
    });

    app.delete('/user/delete', async (req, res) => {
        const emailId = req ? req.body ? req.body.emailId ? req.body.emailId : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;
        res.status(200);
        if (!emailId || !password) {
            res.json({ errCode: 1001, errMessage: "No emailId or Password" });
        } else if (emailId && !EmailIdRegex.test(emailId)) {
            res.json({ errCode: 1002, errMessage: "Email must be of pattern email@domain.com" });
        } else if (password && !PasswordRegex.test(password)) {
            res.json({ errCode: 1003, errMessage: "Password must be of Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" });
        } else if (emailId && EmailIdRegex.test(emailId) && password && PasswordRegex.test(password)) {
            User.findOne({ emailId: emailId }, function (err, docs) {
                res.status(200)
                if (err) {
                    res.json({ errCode: 1000, errMessage: "Could not find user --- error: " + err })
                } else {
                    if (!docs)
                        res.json({ errCode: 1005, errMessage: "Could not find user --- error: " + "User with provided email Id doesn't exist" })
                    else {
                        let hash = docs.passwordHash;
                        bcrypt.compare(password, hash, function (err, result) {
                            if (err) {
                                res.json({ errCode: 1000, errMessage: err })
                            }
                            else if (result == true) {
                                User.deleteOne({ emailId }, function (err, result1) {
                                    if (err)
                                        res.json({ errCode: 1000, errMessage: "Could not delete user : " + err });
                                    res.json({ errCode: 0, result1 });
                                });
                            } else {
                                res.json({ errCode: 1000, errMessage: "Entered credentials is wrong" });
                            }
                        });
                    }
                }
            });
        }
    });

    app.post('/user/login', async (req, res) => {
        const emailId = req ? req.body ? req.body.emailId ? req.body.emailId : null : null : null;
        const password = req ? req.body ? req.body.password ? req.body.password : null : null : null;
        res.status(200);
        if (!emailId || !password) {
            res.json({ errCode: 1001, errMessage: "No emailId or Password" });
        } else if (emailId && !EmailIdRegex.test(emailId)) {
            res.json({ errCode: 1002, errMessage: "Email must be of pattern email@domain.com" });
        } else if (password && !PasswordRegex.test(password)) {
            res.json({ errCode: 1003, errMessage: "Password must be of Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" });
        } else if (emailId && EmailIdRegex.test(emailId) && password && PasswordRegex.test(password)) {
            User.findOne({ emailId: emailId }, function (err, docs) {
                res.status(200)
                if (err) {
                    res.json({ errCode: 1000, errMessage: "Could not find user --- error: " + err })
                } else {
                    if (!docs)
                        res.json({ errCode: 1005, errMessage: "Could not find user --- error: " + "User with provided email Id doesn't exist" })
                    else {
                        let hash = docs.passwordHash;
                        bcrypt.compare(password, hash, function (err, result) {
                            if (err) {
                                res.json({ errCode: 1000, errMessage: err })
                            }
                            else if (result == true) {
                                res.json({ errCode: 0, errMessage: "Successful Login" })
                            } else {
                                res.json({ errCode: 1006, errMessage: "Wrong credentials" })
                            }
                        })
                    }
                }
            })
        }
    });
}