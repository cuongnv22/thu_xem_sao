exports.getTeachers = function(request, response, next) {
	request.collections.teachers.find({}).toArray(function(error, babies){
		if (error) return next(error);
		response.render('teacherList',{babies:babies});
	})
};