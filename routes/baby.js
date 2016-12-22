var users = {
	'1' : {
		name : 'Cuong',
		email : 'cuong@fpt.com.vn',
		website: 'www.preschool.com'
	}
}
var classes = [
	{		
		id: '1',
		name: 'kitty', 
		description: '18-24'
	},
	{		
		id: '2',
		name: 'rabbit',
		description: '24-36'
	}
]
var branches = [
	{
		id : '1',
		name : "vietmymon",
		addr: "Linh Dam"
	},
	{
		id: '2',
		name: 'hoa hong',
		addr: "Dinh Cong"
	}
]

var timeTables = [
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	},
	{
		id: "1",
		name : 'T2 01',
		day: '01',		
	},
	{
		id: "2",
		name : 'T3 02',
		day: '02',		
	},
	{
		id: "3",
		name : 'T4 03',
		day: '03',		
	}
];

var absences = [
	{
		id : "1",
		name : "Nghỉ cả ngày"
	},
	{
		id: "2",
		name : "Nghỉ nửa ngày"
	}
]
//var classes = [ 'no-repeat', 'day', 'week', 'month'];
var flash = {};

exports.findUserByUserId = function(userId, callback) {
	if(!users[userId]) {
		return callback('doesnt exists', null);
	}
	else
		return callback(null,users[userId]);
}
exports.addBaby = function (request, response, next) {
	
	var name = request.body.name;
	var fname = request.body.fname;
	var gender = request.body.gender;	
	var dob = request.body.dob;
	var address = request.body.address;
	var branchId = request.body.branchId;
	var classId = request.body.classId;
	var priorityId = request.body.priorityId;
	var note_1 = request.body.note_1;
	var faname = request.body.faname;
	var phone = request.body.phone;
	var mname = request.body.mname;
	var mphone = request.body.mphone;
	var email = request.body.email;
	var note_2 = request.body.note_2;
	
	var baby = {
		 name : request.body.name,
		 fname : request.body.fname,
		 gender : request.body.gender,	
		 dob : request.body.dob,
		 address : request.body.address,
		 branchId : request.body.branchId,
		 classId : request.body.classId,
		 priorityId : request.body.priorityId,
		 note_1 : request.body.note_1,
		 faname : request.body.faname,
		 phone : request.body.phone,
		 mname : request.body.mname,
		 mphone : request.body.mphone,
		 email : request.body.email,
		 note_2 : request.body.note_2
	}
	request.checkBody('name', 'Username is required').notEmpty();
	var errors = request.validationErrors();
	request.collections.babyInfo.insert(baby, function(error, babyResponse) {
	    if (error) return next(error);
	    	  
		if (errors) {	    
		  flash = { type: 'alert-danger', messages: errors };
		  response.send({ flash: flash });	  
		} else {
			response.render('babyInfo',
				{error: "Sucess fully.",
				classes : classes, branches : branches}
			);
		}
	})
}
exports.populateData = function(babyId, request, callback) {
 	request.collections.babyInfo.findById(babyId, function(error, baby) {
    	if (error) return callback(error, {classes : classes, branches : branches, baby : baby});;
    	
    	return callback(null, {classes : classes, branches : branches, baby : baby});
  	});	
}

exports.getRefData = function(request, response, next) {
	response.render('babyInfo', {classes : classes, branches : branches, baby : null});
}

exports.getBabies = function(request, response, next) {

	request.collections.babyInfo.find({}).toArray(function(error, babies){
		if (error) return next(error);
		response.render('babyList',{babies:babies})	;
	});
}

exports.getTimeTables = function(request, response, next) {
	request.collections.babyInfo.find({}).toArray(function(error, babies){
		if (error) return next(error);
		response.render('babyAttendance',{babies:babies, timeTables : timeTables, classes : classes, absences: absences});
	});
}