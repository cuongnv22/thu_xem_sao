exports.populateData = function(request, response, next) {	
	var person_names = "";
	var person_no = "";
	var p_water_no = 0;
	var p_electric_no = 0;

	var electric_unit = 4000;
	var water_unit = 8000;
	var room_fee = 850000;
	var clean_fee = 15000;
	var other_fee = 0;

	var apartmentId = request.params.id;	
	var currentDate = new Date();
	var month = currentDate.getMonth() + 1;
	var year =  currentDate.getFullYear();
	var yearOfPreviousMonth = year;
	var previousMonth = month - 1;
	if (month == 1)	{
		previousMonth = 12;
		yearOfPreviousMonth = year - 1;
	}
	
	// Get data from previous month to populate person names in a room.
	request.collections.apartments.findOne({apartmentId: apartmentId, year: yearOfPreviousMonth, month: previousMonth}, function(error, old_apartment) {
		if(error) next(error);

		request.collections.apartments.findOne({appartmentId: apartmentId, month:month}, function(error, apartment) {
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
				p_electric_no = old_apartment.p_electric_no;

			if (apartment != null && apartment.p_water_no > 0)
				p_water_no = apartment.p_water_no;
			if (old_apartment != null && (apartment == null || apartment.p_water_no == 0))
				p_water_no = old_apartment.p_water_no;

			response.render('apartment', {apartment: apartment, 
											apartmentId: apartmentId, 
											month: month, 
											year: year, 
											person_names: person_names,
											person_no : person_no,
											p_electric_no: p_electric_no,
											p_water_no: p_water_no,
											electric_unit: electric_unit,
											water_unit: water_unit,
											room_fee: room_fee,
											clean_fee: clean_fee,
											other_fee: other_fee
										});
		});
	});		
};

exports.addOrUpdateApartment = function(request, response, next) {
	var apartmentId = request.params.id;
	var person_no = request.body.person_no;
	var person_names = request.body.person_names;
	var room_fee = request.body.room_fee;
	var p_electric_no = request.body.p_electric_no;
	var c_electric_no = request.body.c_electric_no;
	var p_water_no = request.body.p_water_no;
	var c_water_no = request.body.c_water_no;
	var total_electric = request.body.total_electric;
	var total_water = request.body.total_water;
	var clean_fee = request.body.clean_fee;
	var other_fee = request.body.other_fee;
	var total_fee = request.body.total_fee;

	var currentDate = new Date();
	var month = currentDate.getMonth() + 1;
	var year =  currentDate.getFullYear();

	var apartment_data = {
		apartmentId : apartmentId,
		year : year,
		month : month,
		person_no : request.body.person_no,
		person_names : request.body.person_names,
		room_fee : request.body.room_fee,
		p_electric_no : request.body.p_electric_no,
		c_electric_no : request.body.c_electric_no,
		p_water_no : request.body.p_water_no,
		c_water_no : request.body.c_water_no,
		total_electric : request.body.total_electric,
		total_water : request.body.total_water,
		clean_fee : request.body.clean_fee,
		other_fee : request.body.other_fee,
		total_fee : request.body.total_fee
	} 
	
	request.collections.apartments.findOne({apartmentId: apartmentId}, 
		function(error, apartment) {
			if(error) next(error);
			// update
			if (apartment != null) {

			}
			else { // insert
				request.collections.apartments.insert(apartment_data, function(error, apartmentResponse) {
				    if (error) return next(error);
				    	  
					if (error) {	    
					  flash = { type: 'alert-danger', messages: errors };
					  response.send({ flash: flash });	  
					} else {
						response.render('apartment', {apartment: apartment, 
											apartmentId: apartmentId, 
											month: month, 
											year: year, 
											person_names: person_names,
											person_no : person_no,
											p_electric_no: p_electric_no,
											p_water_no: p_water_no,
											electric_unit: electric_unit,
											water_unit: water_unit,
											room_fee: room_fee,
											clean_fee: clean_fee,
											other_fee: other_fee
										});
					}
				});
			}
		}
	);
};

exports.getStatistic = function(request, response, next) {
	response.render('apartmentStatistic');
};