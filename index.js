'use strict';

process.env.DEBUG = 'actions-on-google:*';

const express = require('express');
const bodyParser = require('body-parser');
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');


const restService = express();

restService.use(bodyParser.urlencoded({ extended: false }));

restService.use(bodyParser.json());

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
	
	app.handleRequest(addCard);
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
