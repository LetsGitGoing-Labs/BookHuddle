const request = require('request-promise');
const _ = require('lodash');
const axios = require('axios');
var Promise = require("bluebird");
const CryptoJS = require('crypto-js');

// Hashing function for signing amazon requests
function sha256(stringToSign, secretKey) {
  var hex = CryptoJS.HmacSHA256(stringToSign, secretKey);
  return hex.toString(CryptoJS.enc.Base64);
}

//Amazon API request that returns an array of 10 books based on search term
var retrieveBooksAPI = function(searchTerm) {
  searchTerm = searchTerm.replace(' ', '%20');

  var today = new Date();
  time = today.toISOString();
  time = encodeURIComponent(time);

  var parameters = [];
  parameters.push("Service=AWSECommerceService");
  parameters.push("AWSAccessKeyId=" + process.env.AWS_ACCESS_KEY_ID);
  parameters.push("AssociateTag=" + process.env.ASSOCIATE_ID);
  parameters.push("Operation=ItemSearch");
  parameters.push("ResponseGroup=Medium");
  parameters.push(`Keywords=${searchTerm}`);
  parameters.push("SearchIndex=Books");
  parameters.push("Timestamp=" + time);

  parameters.sort();
  var paramString = parameters.join('&');

  var signingKey = "GET\n" + "webservices.amazon.com\n" + "/onca/xml\n" + paramString;

  var signature = sha256(signingKey,process.env.AWS_SECRET_ACCESS_KEY);
      signature = encodeURIComponent(signature);

  var amazonUrl =  "http://webservices.amazon.com/onca/xml?" + paramString + "&Signature=" + signature;

  return axios.get(amazonUrl);

};

module.exports.retrieveBooksAPI = retrieveBooksAPI;