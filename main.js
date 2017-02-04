var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('html', exphbs({defaultLayout: 'main.html',extname: '.html'}));
app.set('view engine', 'html');

//URLs

app.get('/', function (req, res) {
	res.render('home');
})

app.get('/play/:id', function(req, res) {
	var id = req.params.id; 

    new sql.Request().query('select * from Podcasts where Id='+id).then(function(recordset) {
        var data = recordset;
	res.render('player', { 
		data: {
			Podcast: data[0]
		}
	});
    }).catch(function(err) {
        console.dir(err);
    });


});
 

app.get('/list', function(req, res) {

    new sql.Request().query('select Id,Title from Podcasts').then(function(recordset) {
        var data = recordset;
	res.render('list', { 
		data: {
			Podcasts: data
		}
	});
    }).catch(function(err) {
        console.dir(err);
    });


});


app.use('/public', express.static('public'))

var sql = require('mssql');
 
sql.connect({
	server: 'localhost\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance 
    database: 'Podkostya',
 user: 'webapp',
password: 'boost1',
    options: {
        trusted: true // Use this if you're on Windows Azure 
    }

}).then(function() {
    // Query 
    app.listen(80, function () {
  	console.log('Podkostya live on on port 80!')
	})

});
