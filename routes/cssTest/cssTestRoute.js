require('../../config/mongoose');
const { ensureAuthenticated } = require('../../config/auth');
const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const axios = require('axios');

const CssQues = require('../../models/cssQuesModel');

// -------- requirements for css tesing ------------
const cssParse = require('./cssParse');
const { isEqual } = require('lodash');

// ---------------------------- TESTING CSS CODE ---------------------------------------
router.post('/test/css', async (req, res) => {
	let defaultCss = '';

	// variable to store results of compared code
	let comparedCSScode = false;

	try {
		// const q3 = new CssQues({
		// 	taskNo: 3,
		// 	task: 'Change the color of the background to blue and change its opacity to 0.3',
		// 	defaultHtml: 'Hello there! You can do it!!!',
		// 	cssSolution: 'body{background-color:blue;opacity:0.3;}'
		// });
		// q3.save();

		await CssQues.findOne({ taskNo: req.user.cssTaskPointer }, (err, task) => {
			defaultCss = task.cssSolution;

			let userCss = req.body.dataToTest;

			defaultCss = cssParse.toJSON(defaultCss);
			userCss = cssParse.toJSON(userCss);

			comparedCSScode = isEqual(defaultCss, userCss);

			if (comparedCSScode) {
				User.findOneAndUpdate(
					{ _id: req.user._id },
					{ cssTaskPointer: req.user.cssTaskPointer + 1 },
					(err, document) => {
						if (err) console.log(err);
					}
				);
			}

			res.send({ sol: comparedCSScode });
				});
	} catch (err) {
		console.log(err);
	}

});

router.get('/dashboard/css', ensureAuthenticated, async (req, res) => {
	try {
		await CssQues.findOne({ taskNo: req.user.cssTaskPointer }, (err, task) => {
			if (err) console.log(err);
			if (task) {
				res.send({ taskStatement: task.task, defaultHtml: task.defaultHtml });
			} else {
				res.send({ taskStatement: 'Question not available.', defaultHtml: '' });
			}
		});
	} catch (err) {
		console.log(err);
	}
});
module.exports = router;
