var builder = require('botbuilder')
var request = require('request')
const adaptiveCard = {
    'contentType': 'application/vnd.microsoft.card.adaptive',
    'content': {
      '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
      'type': 'AdaptiveCard',
      'version': '1.0',
      'body': [
        {
          'type': 'Input.Text',
          'placeholder' : 'POL',
          'style' : 'text',
          'maxlength' : 10,
          'id' : 'inputpolval'
        },
        {
          'type': 'Input.Text',
          'placeholder' : 'POD',
          'style' : 'text',
          'maxlength' : 10,
          'id' : 'inputpodval'
        },
        {
          'type': 'Input.Date',
          'placeholder': 'Due Date',
          'id': 'DateVal',
          'value': '2018-05-16'
        },
        {
          'type': 'Input.Time',
          'placeholder': 'Start time',
          'id': 'TimeVal',
          'value': '16:59'
        }
      ],
      'actions': [
        {
          'type': 'Action.Submit',
          'title': 'Inquiry',
          'data': {
            'id': '1234567890'
  
          },
          'horizontalAlignment': 'center'
        }
      ]
    }
  }
  
  module.exports = [ 
    function (session, args) {
      if (session.message && session.message.value) {
        console.log(session.message.value)
        session.endDialogWithResult(session.message.value)
        return
      }

      if((args != undefined) && (args.param != undefined)){
        var intent = args.param.intent;
        var pol = builder.EntityRecognizer.findEntity(intent.entities, 'Port::ofLoading');
        var pod = builder.EntityRecognizer.findEntity(intent.entities, 'Port::ofDischarging');
      }  

      var msg = new builder.Message(session)
          .addAttachment(adaptiveCard)
      session.send(msg)
    }
]
  