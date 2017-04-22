var wordpress = require( "wordpress" );
var readline = require('readline');
var prompt = require('cli-input');
var bodyParser = require('body-parser');
var express = require('express');
var htmlCode = '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"stylesheet\" href=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/css\/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz\/K68vbdEjh4u\" crossorigin=\"anonymous\">\n    <title>POST on Wordpress<\/title>\n  <\/head>\n  <body>\n    <div class=\"container\">\n      <form action=\"http:\/\/127.0.0.1:3000\/post\" method=\"post\">\n        <h2 class=\"form-signin-heading\">New Post WordPress<\/h2>\n        <label for=\"inputTitle\" class=\"sr-only\">Title<\/label>\n        <input id=\'inputTitle\' type=\"text\" name=\"title\" class=\"form-control\" placeholder=\'Title\'><br>\n        <label for=\"inputContent\" class=\"sr-only\">Content<\/label>\n        <textarea id=\'inputContent\' name=\"content\" class=\"form-control\" placeholder=\'Content\'><\/textarea><br>\n        <label for=\"inputcategories\" class=\"sr-only\">Categories<\/label>\n        <input id=\'inputcategories\' type=\"text\" name=\"categories\" class=\"form-control\" placeholder=\'Categories\'><br>\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Submit Post<\/button>\n      <\/form>\n    <\/div>\n    <script src=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/js\/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"><\/script>\n  <\/body>\n<\/html>\n';
var app = express();
var client = wordpress.createClient({
	url: "",
	username: "",
	password: ""
});
var log = console.log;
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send(htmlCode);
});
app.post('/post', function (req, res) {
  if(req.body.title && req.body.content && req.body.categories){
    //req.body.categories
    var arrCategories = req.body.categories.split(",");

    client.newPost({
      title:  toTitleCase(req.body.title),
      content: req.body.content,
      status: "publish",
        termNames: {
          "category": arrCategories,
          "post_tag": arrCategories
        }
    }, function( err, data ) {
      if (err) {
        console.log( err );
        var errorHtmlCode = '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"stylesheet\" href=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/css\/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz\/K68vbdEjh4u\" crossorigin=\"anonymous\">\n    <title>POST on Wordpress<\/title>\n  <\/head>\n  <body>\n    <div class=\"container\">\n      <div class=\"alert alert-danger\">\n        <strong>Error!<\/strong> djsbv'+err+'\n      <\/div>\n      <form action=\"http:\/\/127.0.0.1:3000\/post\" method=\"post\">\n        <h2 class=\"form-signin-heading\">New Post WordPress<\/h2>\n        <label for=\"inputTitle\" class=\"sr-only\">Title<\/label>\n        <input id=\'inputTitle\' type=\"text\" name=\"title\" class=\"form-control\" placeholder=\'Title\'><br>\n        <label for=\"inputContent\" class=\"sr-only\">Content<\/label>\n        <textarea id=\'inputContent\' name=\"content\" class=\"form-control\" placeholder=\'Content\'><\/textarea><br>\n        <label for=\"inputcategories\" class=\"sr-only\">Categories<\/label>\n        <input id=\'inputcategories\' type=\"text\" name=\"categories\" class=\"form-control\" placeholder=\'Categories\'><br>\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Submit Post<\/button>\n      <\/form>\n    <\/div>\n    <script src=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/js\/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"><\/script>\n  <\/body>\n<\/html>\n';
        res.send(errorHtmlCode);
      }else {
        var postID=data;
        console.log('Post published - #'+data);
        var successHtmlCode = '<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"stylesheet\" href=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/css\/bootstrap.min.css\" integrity=\"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz\/K68vbdEjh4u\" crossorigin=\"anonymous\">\n    <title>POST on Wordpress<\/title>\n  <\/head>\n  <body>\n    <div class=\"container\">\n      <div class=\"alert alert-success\">\n        <strong>Success!<\/strong> Post published - #'+postID+'\n      <\/div>\n      <form action=\"http:\/\/127.0.0.1:3000\/post\" method=\"post\">\n        <h2 class=\"form-signin-heading\">New Post WordPress<\/h2>\n        <label for=\"inputTitle\" class=\"sr-only\">Title<\/label>\n        <input id=\'inputTitle\' type=\"text\" name=\"title\" class=\"form-control\" placeholder=\'Title\'><br>\n        <label for=\"inputContent\" class=\"sr-only\">Content<\/label>\n        <textarea id=\'inputContent\' name=\"content\" class=\"form-control\" placeholder=\'Content\'><\/textarea><br>\n        <label for=\"inputcategories\" class=\"sr-only\">Categories<\/label>\n        <input id=\'inputcategories\' type=\"text\" name=\"categories\" class=\"form-control\" placeholder=\'Categories\'><br>\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Submit Post<\/button>\n      <\/form>\n    <\/div>\n    <script src=\"https:\/\/maxcdn.bootstrapcdn.com\/bootstrap\/3.3.7\/js\/bootstrap.min.js\" integrity=\"sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa\" crossorigin=\"anonymous\"><\/script>\n  <\/body>\n<\/html>\n';
        res.send(successHtmlCode);
      }
    });
  }else{
    console.log('missing params');
    res.send(htmlCode);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
