exports.logout = function(request, response, next) {
	request.session.destroy();
	response.redirect('/');
};

exports.authenticate = function(request, response, next) {
	request.collections.users.findOne({
		email: request.body.email, 
		password: request.body.password}, function(error, user){
			if (error) return next(error);
			if(!user) return response.render('login', {error: 'Sai email hoặc password, xin nhập lại.'});
			request.session.user = user;
			request.session.admin = user.admin;
			response.redirect('/babyList');
		});
	
};