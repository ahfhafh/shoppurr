const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');

initializeApp({
	credential: applicationDefault(),
	databaseURL: 'https://shop-purr.firebaseio.com'
});

var db = admin.firestore();

exports.updateFoodRating = functions.firestore
	.document('Foods/{FoodId}/Reviews/{FeedbackId}')
	.onWrite((change, context) => {
		const Food = context.params.FoodId;

		// read all docs of Reviews, get rating, calc avg of ratings
		let avgRating = 0;
		let count = 0;
		var FoodRef = db.doc('Foods/' + Food);
		var ReviewsRef = FoodRef.collection('Reviews');
		ReviewsRef.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					console.log(doc.get('Rating'));
					avgRating += doc.get('Rating');
					count++;
				})
				avgRating = avgRating / count;
				if (avgRating) {
					console.log("avgrating: " + avgRating);
					return FoodRef.set({ Rating: avgRating.toFixed(2) }, { merge: true });
				}
			})
			.catch(err => {
				console.log('Error getting documents', err);
			});

		return null;
	});

	// TODO: get count of ratings