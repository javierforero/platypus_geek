/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Platypus Geek for a platypus fact"
 *  Alexa: "Here's your platypus fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.ff4c4e42-9d4b-412a-a22b-34b24dbe8f62";

/**
 * Array containing platypus facts.
 */
var PLATYPUS_FACTS = [
  "A platypus lays eggs even though it is an mammal: Despite being a mammal, the platypus does lay eggs and is only one of five types of mammals that does this.",
  "Although it is not the version of the platypus that exists today, one of the most interesting platypus facts is that the animal was once as large as a dog. Today the platypus is comparable in size to a house cat, but the one from 5 or 15 million years ago, living in northern Australia, was actually around bulldog size, three feet in length.",
  "A platypus has no nipples: While it is true that the mother platypus does in fact lactate like any other mammal, it does so in a very different way. The platypus can't lactate through its nipples as it doesn't have. Instead, it secretes the milk via pores throughout the skin.",
  "Since platypus facts make it clear that this animal has a duck bill, it seems very odd that it would need to have teeth at all. In reality, however, platypus babies are actually born with teeth.",
  "Most people would expect a water-loving animal like the platypus to be either an omnivore or an herbivore. Between the teeth at birth and the duckbill, it makes sense that the platypus eats at least some meat, but in reality, they are completely carnivorous.",
  "One of the interesting platypus facts is that this animal relies on electrolocation to find their prey. They create electric fields via muscle contractions and then work to detect them.",
  "The male platypus has spurs on their hind legs and each of these spurs produces venom, making the platypus a venomous animal. This venom is deadly and can have a fairly significant impact on its victim. ",
   "Based on their habitat, it makes sense that one of the platypus facts to know is that this animal's coat is thick and waterproof. Unfortunately for the platypus, this meant that their fur was prized by fur traders to make rugs.",
  "When most people think of organs that every animal needs, a stomach is right near the top of the list.\
     Oddly enough, the platypus does not have a stomach and does not actually need one either, thanks to its unique evolutionary history.\
     In most animals, the stomach works to break down foods and help with digestion. Platypuses, however, simply have their esophagus and intestines connect.",
  "People say that the plural from of platypus should be based on the roots of the word.\
     As the word \"platypus\" comes from Greek, they argue that its plural should follow the pluralization rules for Greek, in which case it would be \"platypodes.\"",
   "The platypus is a semi-aquatic mammal that has a very unusual appearance, it is duck-billed, has a beaver-like tail, lays eggs, has otter-like fur and webbed feet.",
   "The platypus is only found in eastern Australia in small rivers and streams within the states of Queensland, New South Wales, Victoria and Tasmania.",
   "The platypus sleeps on average up to fourteen hours per day.",
   "The platypus is the state animal of New South Wales.",
   "The platypus has been used as a mascot for national events in Australia and is featured on the Australian twenty cent coin.",
   "Platypuses can live more than twelve years in the wild. Their natural predators include snakes, water rats, hawks, owls, eagles and sometimes crocodiles."

];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * PlatypusGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var PlatypusGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
PlatypusGeek.prototype = Object.create(AlexaSkill.prototype);
PlatypusGeek.prototype.constructor = PlatypusGeek;

PlatypusGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("PlatypusGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

PlatypusGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("PlatypusGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
PlatypusGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("PlatypusGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

PlatypusGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Platypus Geek tell me a platypus fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random platypus fact from the platypus facts list
    var factIndex = Math.floor(Math.random() * PLATYPUS_FACTS.length);
    var fact = PLATYPUS_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your platypus fact: " + fact;

    response.tellWithCard(speechOutput, "PlatypusGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the PlatypusGeek skill.
    var platypusGeek = new PlatypusGeek();
    platypusGeek.execute(event, context);
};
