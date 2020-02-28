const security = require(process.cwd() + '/includes/env/security.json');
const mysqlFunctions = require(process.cwd() + '/includes/functions/mysqlFunctions')

module.exports = function(app) {
    
    // Establish the new functions container
    sql = new mysqlFunctions()

    app.post('/api/user/createUser', function(request, response) {

        salt = (Math.random().toString(36).substring(2, ((security.salt_length / 2) + 2)) + Math.random().toString(36).substring(2, ((security.salt_length / 2) + 2)));

        var body = request.body;
        var toHashPass = security.pepper + request.body.password + salt;

        // response.send({
        //     pepper: security.pepper,
        //     salt: salt,
        //     before_hash_pass: toHashPass
        // })        
        
        console.log(body);

        var query = "INSERT INTO vira.users (first_name, last_name, email_address, user_pass, pass_salt) VALUES ('"+body.firstName+"', '"+body.lastName+"', '"+body.email+"', SHA1('"+toHashPass+"'), '"+salt+"')";

        sql.mysqlQuery(query)
            .then((res) => {
                response.send({
                    success: true,
                    message: "Success!",
                });
            });

    });

}