class City {
	static getLatLng (city) {
		return city.location.location;
	}
}

module.exports = { City };
