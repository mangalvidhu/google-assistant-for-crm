'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

app.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});

/* Handling all messenges */
app.post('/crm-google-assistant', (req, res) => {
    console.log(req.body);
    //console.log(req.body.result.parameters["CRMActivities"]);
    //Persist this in some database
    //Send out an email that new feedback has come in
    res.status(200).json({
          speech: "Thank you for the feedback",
          displayText: "Thank you for the feedback",
          source: 'Hotel Feedback System'});
});

restService.post('/echo', function(req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
});


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
