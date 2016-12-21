var jobtitles = {
	'1' : {
		name : 'Giáo viên',
		email : 'cuong@fpt.com.vn',
		website: 'www.preschool.com'
	} ,
	'2' : {
		name : 'Hiệu trưởng',
		email : 'cuong@fpt.com.vn',
		website: 'www.preschool.com'
	} ,
	'3' : {
		name : 'Hiệu phó',
		email : 'cuong@fpt.com.vn',
		website: 'www.preschool.com'
	} 	
};

var levels = {
	'1' : {
		name : 'Đại học',
		email : 'cuong@fpt.com.vn',
		website: 'www.preschool.com'
	} ,
	'2' : {
		name : 'Cao đẳng',
		email : 'cuong@fpt.com.vn',
		website: 'www.preschool.com'
	} 
};

exports.getTeachers = function(request, response, next) {
	request.collections.teachers.find({}).toArray(function(error, babies){
		if (error) return next(error);
		response.render('teacherList',{babies:babies});
	})
};

exports.getRefData = function(request, response, next) {
	response.render('teacherInfo', {jobtitles: jobtitles, levels: levels, teacher : null});
}