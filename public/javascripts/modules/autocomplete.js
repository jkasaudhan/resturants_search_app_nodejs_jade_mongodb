function autocomplete(address, latInput, lngInput) {
	console.log(address, latInput, lngInput);
	if(!address) return;

	const gMapDropdown = new google.maps.places.Autocomplete(address);
	gMapDropdown.addListener('place_changed', () => {
		const place = gMapDropdown.getPlace();
		console.log('Selected place: ', place);
		latInput.value = place.geometry.location.lat();
		lngInput.value = place.geometry.location.lng();
	});

	//Do not submit the form if someone hits enter button to select a place from the google map dropdown
	address.on('keydown', (e) => {
		console.log('keydwon event', e.keyCode);
		if(e.keyCode === 13) e.preventDefault();
	});


}

export default autocomplete;