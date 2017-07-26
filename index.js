'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const App = require('actions-on-google').ApiAiApp;

const restService = express();

restService.use(bodyParser.urlencoded({ extended: false }));

restService.use(bodyParser.json());

function listTopicsIntent(app) {
	GoogleIOAPI.getCategories().then(
	categories =>
	app.ask("The activities covered are: Appointment, task, call." +
		"How so you want me to help you??")
	)
}

restService.post('/google-assistant-for-crm', function(req, res) {
	var app = new App({req,res});
	app.handleRequest(listTopicsIntent);
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
