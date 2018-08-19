import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
const fetch = require('node-fetch');

admin.initializeApp();
exports.saveBook = functions.https.onRequest((request, response) => {
  const book = request.query['book'];
  response.setHeader('Content-Type', 'application/json');
  console.log('book', book);
  if (!book) {
    response.statusCode = 400;
    return response.send('Book is mandatory');
  }
  const bookDocRef = admin.firestore().collection('books').doc(book);
  fetch('http://getbible.net/json?v=almeida&p=Psalms').then(res => {
    bookDocRef.set(JSON.parse(res.data));
    console.log(res)
  });
  return response.send('ok');
});
