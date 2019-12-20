var mysql  = require('mysql');

module.exports = function(app) {
    
    app.get('/api/user/loginUser', function(request, response) {

        var con = mysql.createConnection({
            host: "vira-dev.cixbdvh7emms.us-east-2.rds.amazonaws.com",
            user: "admin",
            password: "Q1xbXh774HFjHooxeHwa",
            database: "vira"
        });

        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM vira.users", function (err, result, fields) {
                if (err) throw err;
                response.send({
                    success: true,
                    message: "Data successfully retrieved!",
                    result: result
                });
            });
        });

        // response.send({
        //     test_response: 'This is a test',
        //     request: request
        // });

    });

}