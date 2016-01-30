//
// Copyright (c) Microsoft and contributors.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

var fs = require('fs');
var path = require('path');
var azure;
try {
  fs.statSync(path.join(__dirname, './../../lib/azure.js'));
  azure = require('./../../lib/azure');
} catch (error) {
  azure = require('azure');
}

var queue = 'queuesample';
var serviceBusClient = azure.createServiceBusService();

function createQueue() {
  // Step 0: Create queue.
  serviceBusClient.createQueueIfNotExists(queue, function (error, queueCreated, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Created the queue: %s', queueCreated);
      sendMessages();
    }
  });
}

function sendMessages() {
  // Step 1: Send a few messages to later be consumed.
  serviceBusClient.sendQueueMessage(queue, 'Send Message Works', function (error, result, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Sent first Message');
      serviceBusClient.sendQueueMessage(queue, 'Send Message Still Works', function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('Sent Second Message');
          receiveMessages();
        }
      });
    }
  });
}

function receiveMessages() {
  // Step 2: Receive (peek) the messages
  // the isPeekLock prevents message delate
  serviceBusClient.receiveQueueMessage(queue, { isPeekLock: true }, function (error, message, response) {
    if (error) {
      console.log(error);
    } else {
      // Message received and locked
      console.log(message.body);
      // Step 3: Remove message after processing
      serviceBusClient.deleteMessage(message, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          // Message deleted
          console.log('message deleted');
        }
      });
    }
  });
}

var args = process.argv;

if (args.length > 3) {
  console.log('Incorrect number of arguments');
} else if (args.length === 3) {
  // Adding a third argument on the command line, whatever it is, will delete the container before running the sample.
  serviceBusClient.deleteQueue(queue, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      createQueue();
    }
  });
} else {
  createQueue();
}
