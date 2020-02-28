security = require(process.cwd() + '/includes/env/security.json');
mysqlFunctions = require(process.cwd() + '/includes/functions/mysqlFunctions')

module.exports = function(app) {
    
    // Establish the new functions container
    sql = new mysqlFunctions()

    app.post('/api/user/loginUser', function(request, response) {

        var body = request.body;

        var password = security.pepper + body.password;
        var email = body.email;
        
        sql.mysqlQuery("SELECT CONVERT(user_id, CHAR) as user_id FROM vira.users u WHERE u.email_address = '"+email+"' AND u.user_pass = SHA1(CONCAT('"+password+"', u.pass_salt))")
            .then((res) => {

                if (res.length > 0) {

                    response.send({
                        success: true,
                        message: "User found. Log in and display dashboard.",
                        user_id: res[0].user_id
                    });

                } else {
                    response.send({
                        success: false,
                        message: "No user found. Please try again."
                    })
                }
            });

    });

}