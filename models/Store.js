const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please enter a store name.'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String],
	created: {
		type: Date,
		default: Date.now
	},
	location: {
		type: {
			type: String,
			default: 'Point'
		},
		coordinates: [{
			type: Number,
			required: 'You must supply coordinates'
		}],
		address: {
			type: String,
			required: 'You must supply address'
		}
	}
});

//Before saving any data, create url friendly slug name and save it
storeSchema.pre('save', function(next) {
	//Do not use arrow function here, because we want to use this object which should point to the current Store model
	if(!this.isModified(this.name)) {
		next();
		return;
	}

	this.slug = slug(this.slug);
	next();
});

module.exports = mongoose.model('Store', storeSchema);