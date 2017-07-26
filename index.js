'use strict';

process.env.DEBUG = 'actions-on-google:*';

const express = require('express');
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const bodyParser = require('body-parser');

const restService = express();
restService.use(bodyParser.json());
restService.use(bodyParser.urlencoded({ extended: false }));


function addCard(app) {
	
	if(app.hasSurfaceCapability(
	app.SurfaceCapabilities.SCREEN_OUTPUT)) {
		
		app.data.selectedSession = sessionData;
			
		app.ask(app.getIncomingRichResponse()
			.addSimpleResponse("Appointment Created. Please find the details below.")
			.addBasicCard(
				app.buildBasicCard(sessionData.description)
					.setTitle(sessionData.title)
					.addButton('CRM Meeting Schedule', sessionData.url))
			.addSimpleResponse("You want help with anything else?"));
	} else {
		app.ask("That's great");
	}
	
}

restService.post('/google-assistant-for-crm', function(req, res) {
	var app = new App({req,res});
	
	console.log('Request headers: ' + JSON.stringify(req.headers));
	console.log('Request body: ' + JSON.stringify(req.body));
	
	var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-echo-sample'
    });
	
	//app.handleRequest(addCard);
});

restService.get('/version', (req, res) => {
    res.status(200).send("APIAI Webhook Integration. Version 1.0");
});

restService.get('/', (req, res) => {
    res.status(200).send("Hello from APIAI Webhook Integration.");
});

/* Handling all messenges */
restService.post('/assistant-for-crm', (req, res) => {
    console.log(req.body);
    console.log(req.body.result.parameters["CRMActivities"]);
    //Persist this in some database
    //Send out an email that new feedback has come in
    res.status(200).json({
          speech: "Thank you for the feedback",
          displayText: "Thank you for the feedback",
          source: 'CRMActivities Feedback System'});
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


restService.post('/slack-test', function(req, res) {

    var slack_message = {
        "text": "Details of JIRA board for Browse and Commerce",
        "attachments": [{
            "title": "JIRA Board",
            "title_link": "http://www.google.com",
            "color": "#36a64f",

            "fields": [{
                "title": "Epic Count",
                "value": "50",
                "short": "false"
            }, {
                "title": "Story Count",
                "value": "40",
                "short": "false"
            }],

            "thumb_url": "https://stiltsoft.com/blog/wp-content/uploads/2016/01/5.jira_.png"
        }, {
            "title": "Story status count",
            "title_link": "http://www.google.com",
            "color": "#f49e42",

            "fields": [{
                "title": "Not started",
                "value": "50",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }, {
                "title": "Development",
                "value": "40",
                "short": "false"
            }]
        }]
    }
    return res.json({
        speech: "speech",
        displayText: "speech",
        source: 'webhook-echo-sample',
        data: {
            "slack": slack_message
        }
    });
});




restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
