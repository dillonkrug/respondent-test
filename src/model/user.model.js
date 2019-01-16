const CsvFields = [{
	key: 'firstName',
	cast: String
}, {
	key: 'gender',
	cast: String
}, {
	key: 'jobTitle',
	cast: String
}, {
	key: 'industry',
	cast: value => value ? value.split(',') : []
}, {
	key: 'city',
	cast: String
}, {
	key: 'latitude',
	cast: Number
}, {
	key: 'longitude',
	cast: Number
}];

class User {
	static fromCsv (row) {
		var user = {};
		CsvFields
			.forEach(field => {
				var value = row[field.key] || '';
				user[field.key] = field.cast(value);
			});
		return user;
	}

	static getIndustries (user) {
		return user.industry;
	}

	static getLatLng (user) {
		return {
			latitude: user.latitude,
			longitude: user.longitude
		};
	}
	static getTitle (user) {
		return user.jobTitle;
	}
}

module.exports = { User };
