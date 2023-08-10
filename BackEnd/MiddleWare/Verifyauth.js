const Jwt = require("jsonwebtoken");
const JWT_Secret = "PramodisgoodBoy";

module.exports.Verifyauth = (req, res, next) => {

    let token = req.headers["authorization"];

    if (token) {
        token = token.split(" ")[1];

        Jwt.verify(token, JWT_Secret, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please check token or there must some editting happened to token" })
            } else {
                console.log(valid);
                const emailID = valid.user.email;
                req.emailid = emailID;
                next();
            }
        })

    } else {
        res.status(401).send({ result: "Please mention proper token or token may be expired" })
    }

}