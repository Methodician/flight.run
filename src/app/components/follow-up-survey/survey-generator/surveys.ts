export const internFollowUpSurvey = {
    "sections":[
        {
        "heading": "Personal Questions",
        "content": [
            {
                "required": true,
                "questionUid": "11",
                "type": "Rate",
                "text": "how cold is it at ^H while you were working there?"
            },
            {
                "required": true,
                "questionUid": "12",
                "type": "Text",
                "text": "Hint: 1 = frezing(30F) and 10 = burning (110F)"
            },
            {
                "required": true,
                "questionUid": "13",
                "type": "AptitudeInterest",
                "text": "Do you like web development?"
            },
            {
                "required": true,
                "questionUid": "14",
                "type": "TrueFalse",
                "text": "Did you answer truthfully?"
            }]
        },
        {
        "heading": "",
        "content": [
            {
                "required": true,
                "questionUid": "21",
                "type": "Rate",
                "text": "Rate portland as a city."
            },
            {
                "required": true,
                "questionUid": "22",
                "type": "FreeResponse",
                "text": "What made you want to live in Portland?"
            },
            {
                "required": true,
                "questionUid": "23",
                "type": "TrueFalse",
                "text": "Does ^H have enough lighting?"
            },
            {
                "required": true,
                "questionUid": "24",
                "type": "Text",
                "text": "Thankyou for filling out this section."
            }]

        },
        {
        "heading": "Job Questions",
        "content": [
            {
                "required": true,
                "questionUid": "31",
                "type": "TrueFalse",
                "text": "Do you wish to keep coding in the future?"
            },
            {
                "required": true,
                "questionUid": "32",
                "type": "Rate",
                "text": "How well do you know AngularJS now?"
            },
            {
                "required": true,
                "questionUid": "33",
                "type": "Text",
                "text": "How would you rate your experence?"
            },
            {
                "required": true,
                "questionUid": "34",
                "type": "ShortAnswer",
                "text": "Where will you be working in the future?"
            }]

        },
        {
        "heading":"got rid of a test",
        "content": [
            {
                "required": true,
                "questionUid": "41",
                "type": "Text",
                "text": "Answer to the best of your ability."
            },
            {
                "required": true,
                "questionUid": "42",
                "type": "TrueFalse",
                "text": "Do you like puppys?"
            },
            {
                "required": true,
                "questionUid": "43",
                "type": "Rate",
                "text": "How would you rate your experence?"
            },
            {
                "required": true,
                "questionUid": "44",
                "type": "ShortAnswer",
                "text": "Why did you take the internship?"
            }

        ]

        }
    ]
}
export const testSurvey = {
    "sections": [
      {
        "content": [
          {
            "required": true,
            "questionUid": "Meaningfull-Key",
            "text": "what is your name",
            "type": "Text"
          },
          {
            "required": false,
            "questionUid": "A-Key",
            "text": "how cold is ^H",
            "type": "Rate"
          }
        ],
        "heading": "personal"
      },
      {
        "content": [
          {
            "required": false,
            "questionUid": "No-Key",
            "text": "coding prowess",
            "type": "AptitudeInterest"
          }
        ],
        "heading": "other stuff"
      }
    ],
    "title": "The Great Test"
  }