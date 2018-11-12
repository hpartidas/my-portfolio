'use strict';

const https = require('https');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  'apiVersion': '2006-03-01'
});

const sns = new AWS.SNS({
  'apiVersion': '2010-03-31',
  'region': process.env.SNS_REGION
});

exports.handler = (event, context, callback) => {
  event.options.headers["Authorization"] = process.env.GITHUB_TOKEN;

  const req = https.request(event.options, (res) => {

    if (res.statusCode !== 200) {
      sns.publish(publishParameters("Error contacting GitHub", res.statusMessage, process.env.SNS_TOPIC), function() {
        callback(null, res.statusMessage);
      });
    }

    let body = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('Successfully processed HTTPS response');
      if (res.headers['content-type'] === 'application/json') {
        body = JSON.parse(body);
      }

      let parameters = {
        Bucket: process.env.BUCKET,
        Key: process.env.FILE,
        ACL: process.env.ACL,
        ContentType: process.env.CONTENT_TYPE,
        ContentLength: body.length,
        Body: body
      };

      s3.putObject(parameters, function(error, response){
        let message = '';
        let subject = '';

        if (error) {
          console.log(error, error.stack);
          subject = "Error Updating GitHub Projects";
          message = error;
        } else {
          console.log("Upload Successful.");
          subject = "GitHub Projects Updated";
          message = response.ETag;
        }

        sns.publish(publishParameters(subject, message, process.env.SNS_TOPIC), function(error) {
          if (error) {
            console.log(error, error.stack);
          }
        });
      });
      callback(null, "Project file downloaded from GitHub.");
    });
  });
  req.on('error', callback);
  req.end();
};

function publishParameters(subject, message, topic) {
  return {
    Message: message,
    Subject: subject,
    TopicArn: topic
  }
}