const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.middleWare = (req, res, next) => {
	console.log("cookies: " + req.cookies);
	req.name = "jiten";
	res.cookie('auth', 'random token');
	//res.cookies('name', 'random thing');
	next();
}

exports.homePage = (req, res) => {
	console.log("after my middleware: " + req.name);
	//req.flash('info', 'Info message');
	//req.flash('error', 'error message');
	//req.flash('warning', 'warning message');
	//req.flash('success', 'success message');
	res.render('index', {title: 'Delicious Resturant'});
}

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store' });
}

exports.createStore = async(req, res) => {
	const store = new Store(req.body);
	await store.save();
	req.flash('success', `Successfully created ${store.name} !!`);
	res.redirect('/stores');
}

exports.getStores = async (req, res) => {
	const stores = await Store.find();
	console.log('stores' + stores);
	//if varibale name and key is same, than using ES6 syntax we can only pass the variable eg stores below is equivalent to { stores: stores}
	res.render('stores', {title: 'Stores', stores});
}

exports.editStore = async (req, res) => {
	const store = await Store.findOne({_id: req.params.id});
	res.render('editStore', {title: 'Edit Store', store });
}

exports.updateStore = async (req, res) => {
	const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
							new: true,
							runValidators: true
						});
	req.flash('success', `Updated store ${store.name} successfully!!`);
	res.redirect('/stores');
}