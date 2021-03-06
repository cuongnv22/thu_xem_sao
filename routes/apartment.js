var apartmentlist = [
	{		
		apartmentId: '1',
		name: 'Phòng 1'
	},
	{		
		apartmentId: '2',
		name: 'Phòng 2'		
	},
	{		
		apartmentId: '3',
		name: 'Phòng 3'
	},
	{		
		apartmentId: '4',
		name: 'Phòng 4'		
	},
	{		
		apartmentId: '5',
		name: 'Phòng 5'
	},
	{		
		apartmentId: '6',
		name: 'Phòng 6'		
	},
	{		
		apartmentId: '7',
		name: 'Phòng 7'
	},
	{		
		apartmentId: '8',
		name: 'Phòng 8'		
	},
	{		
		apartmentId: '9',
		name: 'Phòng 9'
	},
	{		
		apartmentId: '10',
		name: 'Phòng 10'		
	},
	{		
		apartmentId: '11',
		name: 'Phòng 11'
	},
	{		
		apartmentId: '12',
		name: 'Phòng 12'		
	},
	{		
		apartmentId: '13',
		name: 'Phòng 13'
	},
	{		
		apartmentId: '14',
		name: 'Phòng 14'		
	},
	{		
		apartmentId: '15',
		name: 'Phòng 15'
	},
	{		
		apartmentId: '16',
		name: 'Phòng 16'		
	},
	{		
		apartmentId: '17',
		name: 'Phòng 17'
	},
	{		
		apartmentId: '18',
		name: 'Phòng 18'		
	},
	{		
		apartmentId: '19',
		name: 'Phòng 19'
	},
	{		
		apartmentId: '20',
		name: 'Phòng 20'		
	},
	{		
		apartmentId: '21',
		name: 'Phòng 21'
	},
	{		
		apartmentId: '22',
		name: 'Phòng 22'		
	},
	{		
		apartmentId: '23',
		name: 'Phòng 23'
	},
	{		
		apartmentId: '24',
		name: 'Phòng 24'		
	},
	{		
		apartmentId: '25',
		name: 'Phòng 25'		
	},
	{		
		apartmentId: '26',
		name: 'Phòng 26'		
	},
	{		
		apartmentId: '27',
		name: 'Phòng 27'		
	},
	{		
		apartmentId: '28',
		name: 'Phòng 28'		
	},
	{		
		apartmentId: '29',
		name: 'Phòng 29'		
	},
	{		
		apartmentId: '30',
		name: 'Phòng 30'		
	},
	{		
		apartmentId: '31',
		name: 'Phòng 31'		
	},
	{		
		apartmentId: '32',
		name: 'Phòng 32'		
	},
	{		
		apartmentId: '33',
		name: 'Phòng 33'		
	},
];

var years = [
	{		
		id: 2016,
		name: '2016'		
	},
	{		
		id: 2017,
		name: '2017'		
	},
	{		
		id: 2018,
		name: '2018'		
	},
	{		
		id: 2019,
		name: '2019'		
	},
	{		
		id: 2020,
		name: '2020'		
	},
	{		
		id: 2021,
		name: '2021'		
	},
	{		
		id: 2022,
		name: '2022'		
	},
	{		
		id: 2023,
		name: '2023'		
	},
	{		
		id: 2024,
		name: '2024'		
	},
	{		
		id: 2025,
		name: '2025'		
	},
];


exports.populateData = function(request, response, next) {	
	var person_names = "";
	var person_no = "";
	
	var p_electric_no = 0;
	var c_electric_no = 0;
	var electric_unit = 4000;
	var total_electric = 0;

	var p_water_no = 0;
	var c_water_no = 0;
	var water_unit = 8000;
	var total_water = 0;

	var room_fee = 850000;
	var clean_fee = 15000;
	var internet_fee = 0;
	var tv_fee = 0;
	var other_fee = 0;
	var total_fee = 0;

	var status = -1;
	var pay_date = "";

	var apartmentId = request.params.id;	
	var year = convert2Int(request.params.year);
	var month = convert2Int(request.params.month);
	var currentDate = new Date();
	var c_month = currentDate.getMonth() + 1;
	var c_year =  currentDate.getFullYear();
	var yearOfPreviousMonth = year;
	var previousMonth = month - 1;
	if (month == 1)	{
		previousMonth = 12;
		yearOfPreviousMonth = year - 1;
	}
	
	// Get data from previous month to populate person names in a room.
	request.collections.apartments.findOne({apartmentId: apartmentId, year: yearOfPreviousMonth, month: previousMonth}, function(error, old_apartment) {
		if(error) next(error);

		request.collections.apartments.findOne({apartmentId: apartmentId, year: year, month:month}, function(error, apartment) {
			if(error) next(error);
			
			if (apartment != null && apartment.person_names != "")
				person_names = apartment.person_names;
			else if (old_apartment != null && (apartment == null || apartment.person_names == ""))
				person_names = old_apartment.person_names;

			if (apartment != null && apartment.person_no != "")
				person_no = apartment.person_no;
			else if (old_apartment != null && (apartment == null || apartment.person_no == ""))
				person_no = old_apartment.person_no;

			if (apartment != null && apartment.p_electric_no > 0)
				p_electric_no = apartment.p_electric_no;
			else if (old_apartment != null && (apartment == null || apartment.p_electric_no == 0))
				p_electric_no = old_apartment.c_electric_no;

			if (apartment != null && apartment.p_water_no > 0)
				p_water_no = apartment.p_water_no;
			if (old_apartment != null && (apartment == null || apartment.p_water_no == 0))
				p_water_no = old_apartment.c_water_no;

			if (apartment != null) {
				c_electric_no = apartment.c_electric_no;
				electric_unit = apartment.electric_unit;
				total_electric = apartment.total_electric;
				c_water_no = apartment.c_water_no;
				water_unit = apartment.water_unit;
				total_water = apartment.total_water;
				room_fee = apartment.room_fee;
				internet_fee = apartment.internet_fee;
				tv_fee = apartment.tv_fee;
				clean_fee = apartment.clean_fee;
				other_fee = apartment.other_fee;
				total_fee = apartment.total_fee;
				status = apartment.status;
				pay_date = apartment.pay_date;
			}

			response.render('apartment', {
											apartmentlist: apartmentlist,
											apartmentId: apartmentId, 
											month: month, 
											year: year, 
											person_names: person_names,
											person_no : person_no,
											p_electric_no: p_electric_no,
											c_electric_no: c_electric_no,
											electric_unit: electric_unit,
											p_water_no: p_water_no,											
											c_water_no: c_water_no,											
											water_unit: water_unit,
											room_fee: room_fee,
											total_electric: total_electric,
											total_water: total_water,
											clean_fee: clean_fee,
											tv_fee : tv_fee,
											internet_fee : internet_fee,
											other_fee: other_fee,
											total_fee: total_fee,
											status: status,
											pay_date: pay_date,
											c_year: c_year,
											c_month: c_month,
											flash : null
										});
		});
	});		
};

function convert2Int(fee){
	return parseInt(fee.replace(/,/g,''));
}

exports.addOrUpdateApartment = function(request, response, next) {

	var apartmentId = request.params.id;
	var person_no = convert2Int(request.body.person_no);
	var person_names = request.body.person_names;
	var room_fee = convert2Int(request.body.room_fee);
	var p_electric_no = convert2Int(request.body.p_electric_no);
	var c_electric_no = convert2Int(request.body.c_electric_no);
	var electric_unit = convert2Int(request.body.electric_unit);
	var p_water_no = convert2Int(request.body.p_water_no);
	var c_water_no = convert2Int(request.body.c_water_no);
	var water_unit = convert2Int(request.body.water_unit);
	var total_electric = convert2Int(request.body.total_electric);
	var total_water = convert2Int(request.body.total_water);
	var clean_fee = convert2Int(request.body.clean_fee);
	var internet_fee = convert2Int(request.body.internet_fee);
	var tv_fee =  convert2Int(request.body.tv_fee);
	var other_fee = convert2Int(request.body.other_fee);
	var total_fee = convert2Int(request.body.total_fee);
	var status = request.body.status;
	var pay_date = request.body.pay_date;
	
	var year = convert2Int(request.params.year);
	var month = convert2Int(request.params.month);
	var currentDate = new Date();
	var c_month = currentDate.getMonth() + 1;
	var c_year =  currentDate.getFullYear();

	var apartment_data = {
		apartmentId : apartmentId,
		year : year,
		month : month,
		person_no : person_no,
		person_names : person_names,
		room_fee : room_fee,
		p_electric_no : p_electric_no,
		c_electric_no : c_electric_no,
		electric_unit: electric_unit,
		p_water_no : p_water_no,
		c_water_no : c_water_no,
		water_unit: water_unit,
		total_electric : total_electric,
		total_water : total_water,
		clean_fee : clean_fee,
		internet_fee : internet_fee,
		tv_fee : tv_fee,
		other_fee : other_fee,
		total_fee : total_fee,
		status: status,
		pay_date: pay_date
	} 
	
	request.collections.apartments.findOne({apartmentId: apartmentId, year: year, month: month}, 
		function(error, apartment) {
			if(error) next(error);
			// update
			if (apartment != null) {
				request.collections.apartments.update({apartmentId: apartmentId, year: year, month: month},{
						apartmentId: apartmentId,
						year: year,
						month: month,
						person_names: person_names,
						person_no : person_no,
						p_electric_no: p_electric_no,						
						p_water_no: p_water_no,
						c_electric_no: c_electric_no,
						c_water_no: c_water_no,
						electric_unit: electric_unit,
						water_unit: water_unit,
						room_fee: room_fee,
						total_electric: total_electric,
						total_water: total_water,
						clean_fee: clean_fee,
						internet_fee : internet_fee,
						tv_fee : tv_fee,
						other_fee: other_fee,
						total_fee: total_fee,
						status: status,
						pay_date: pay_date
				}, function(error, updateResponse){
					flash = { type: 'alert-success', messages: "Sửa thông tin thành công!!!" };
					response.render('apartment', {apartmentlist: apartmentlist,
											apartmentId: apartmentId, 
											month: month, 
											year: year, 
											person_names: person_names,
											person_no : person_no,
											p_electric_no: p_electric_no,
											c_electric_no: c_electric_no,
											electric_unit: electric_unit,
											p_water_no: p_water_no,											
											c_water_no: c_water_no,											
											water_unit: water_unit,
											room_fee: room_fee,
											total_electric: total_electric,
											total_water: total_water,
											clean_fee: clean_fee,
											internet_fee : internet_fee,
											tv_fee : tv_fee,
											other_fee: other_fee,
											total_fee: total_fee,
											status: status,
											pay_date: pay_date,
											c_year: c_year,
											c_month: c_month,
											flash: flash
									});
				});							
			}							
			else { // insert
				request.collections.apartments.insert(apartment_data, function(error, apartmentResponse) {
				    if (error) return next(error);
				    	  
					if (error) {	    
					  flash = { type: 'alert-danger', messages: errors };
					  response.send({ flash: flash });	  
					} else {
						flash = { type: 'alert-success', messages: "Tạo thông tin thành công!!!" };
						response.render('apartment', {apartmentlist: apartmentlist,
											apartmentId: apartmentId, 
											month: month, 
											year: year, 
											person_names: person_names,
											person_no : person_no,
											p_electric_no: p_electric_no,
											c_electric_no: c_electric_no,
											electric_unit: electric_unit,
											p_water_no: p_water_no,											
											c_water_no: c_water_no,											
											water_unit: water_unit,
											room_fee: room_fee,
											total_electric: total_electric,
											total_water: total_water,
											clean_fee: clean_fee,
											internet_fee : internet_fee,
											tv_fee : tv_fee,
											other_fee: other_fee,
											total_fee: total_fee,
											status: status,
											pay_date: pay_date,
											c_year: c_year,
											c_month: c_month,
											flash : flash
										});
					}
				});
			}
		}
	);
};

exports.getApartmentList = function(request, response, next) {	
	var choosen_date = request.body.choosen_date.toString().split('/');	
	var month = convert2Int(choosen_date[0]);
	var year = convert2Int(choosen_date[1]);

	request.collections.apartments.find({year: year, month: month}).sort({status: -1}).toArray(function(error, apartments){
		if (error) next(error);
		response.json(apartments);
	});
}

exports.getRevenueAndExpenditure = function(request, response, next) {
	var choosen_date = request.body.choosen_date.toString().split('/');	
	var month = convert2Int(choosen_date[0]);
	var year = convert2Int(choosen_date[1]);

	request.collections.revenueExpenditures.findOne({year: year, month: month}, function(error, revenueExpenditures){		
		if (error) next(error);
		if (revenueExpenditures == null)
			response.json("");
		else
			response.json(revenueExpenditures);
	});
}

exports.insertOrUpdateRevenueAndExpenditure = function(request, response, next) {
	
	var month = convert2Int(request.body.month);
	var year = convert2Int(request.body.year);
	var total_take = convert2Int(request.body.total_take);
    var electric_fee = convert2Int(request.body.electric_fee);
    var water_fee = convert2Int(request.body.water_fee);
    var clean_fee = convert2Int(request.body.clean_fee);
    var internet_fee = convert2Int(request.body.internet_fee);
    var tv_fee = convert2Int(request.body.tv_fee);
    var other_fee = convert2Int(request.body.other_fee);
    var note = request.body.note;
    var total_expenditure = convert2Int(request.body.total_expenditure);
    var total_receive = convert2Int(request.body.total_receive);
    var isFinal = request.body.isFinal;

	request.collections.revenueExpenditures.findOne({year: year, month: month}, function(error, revenueExpenditures){		
		if(revenueExpenditures != null) {
			request.collections.revenueExpenditures.update({year: year, 
															month: month},{
															year: year,
															month: month,
															total_take : total_take,
															electric_fee : electric_fee,
															water_fee : water_fee,
															clean_fee : clean_fee,
															internet_fee : internet_fee,
															tv_fee : tv_fee,
															other_fee : other_fee,
															total_expenditure : total_expenditure,
															total_receive : total_receive,
															isFinal : isFinal,
															note : note}, function(error, updateResponse){
																if (error) next(error);
																response.json(updateResponse);
															});

		}
		else {
			request.collections.revenueExpenditures.insert({year: year, 
															month: month,
															total_take : total_take,
															electric_fee : electric_fee,
															water_fee : water_fee,
															clean_fee : clean_fee,
															internet_fee : internet_fee,
															tv_fee : tv_fee,
															other_fee : other_fee,
															total_expenditure : total_expenditure,
															total_receive : total_receive,
															isFinal : isFinal,
															note : note}, function(error, insertResponse){
																if (error) next(error);
																response.json(insertResponse);
															});
		}
	});
}


exports.getStatistic = function(request, response, next) {
	var currentDate = new Date();
	var month = currentDate.getMonth() + 1;
	var year =  currentDate.getFullYear();

	var yearOfPreviousMonth = year;
	var previousMonth = month - 1;
	if (month == 1)	{
		previousMonth = 12;
		yearOfPreviousMonth = year - 1;
	}
	
	request.collections.apartments.find({year: yearOfPreviousMonth, month: previousMonth, status: "0"}).sort({status: 1}).toArray(function(error, old_apartments){
		request.collections.apartments.find({year: year, month: month}).sort({status: 1}).toArray(function(error, apartments){
			response.render('apartmentStatistic', {
								apartmentlist: apartmentlist,
								isSatistical: true,
								apartments : apartments, 
								old_apartments : old_apartments,
								p_year: yearOfPreviousMonth,
								p_month: previousMonth,
								c_year: year,
								c_month: month,
								years: years
							});
		});
	});
};

exports.loadChart = function(request, response, next){
	var choosen_year = convert2Int(request.body.choosen_year.toString());
    request.collections.revenueExpenditures.find({year: choosen_year}).sort({month: 1}).toArray(function(error, revenueExpenditures){
    	response.json(revenueExpenditures);
    });
};