/**
 * Copyright (c) 2014 brian@bevey.org
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

module.exports = (function () {
  'use strict';

  /**
   * @author brian@bevey.org
   * @requires querystring, https
   * @fileoverview Basic control of Pushover notification API.
   */
  return {
    version : 20180303,

    inputs  : ['text'],

    /**
     * Prepare a request for command execution.
     */
    postPrepare : function (config) {
      return {
        host    : config.host,
        port    : config.port,
        path    : config.path,
        method  : config.method,
        headers : {
          'Accept'         : 'application/json',
          'Accept-Charset' : 'utf-8',
          'User-Agent'     : 'node-switchBoard',
          'Content-Type'   : 'multipart/form-data; boundary=' + config.boundary,
          'Content-Length' : Buffer.byteLength(config.postRequest)
        }
      };
    },

    /**
     * Prepare the POST data to be sent.
     */
    postData : function (pushover) {
      var data      = Buffer.from('--' + pushover.boundary + '\r\n'
                    +             'Content-Disposition: form-data; name="user"\r\n\r\n'
                    +             pushover.userKey + '\r\n'
                    +             '--' + pushover.boundary + '\r\n'
                    +             'Content-Disposition: form-data; name="token"\r\n\r\n'
                    +             pushover.token + '\r\n'
                    +             '--' + pushover.boundary + '\r\n'
                    +             'Content-Disposition: form-data; name="message"\r\n\r\n'
                    +             pushover.text + '\r\n'),
          end       = Buffer.from('\r\n--' + pushover.boundary + '--'),
          imageData = Buffer.from('--' + pushover.boundary + '\r\n'
                    +            'Content-Disposition: form-data; name="attachment"; filename="image.jpg"\r\n'
                    +            'Content-Type: image/jpeg\r\n\r\n'),
          imageEnd  = Buffer.from('\r\n--' + pushover.boundary + '--'),
          image     = Buffer.from('');

      if (pushover.payload) {
        if (!Buffer.isBuffer(pushover.payload)) {
          pushover.payload = Buffer.from(pushover.payload);
        }

        image = new Buffer.concat([imageData, pushover.payload, imageEnd]);
      }

      return Buffer.concat([data, image, end]);
    },

    /**
     * We should expect that Pushover won't be down, so we'll set it's initial
     * state to explicitly be "ok".
     */
    init : function (controller) {
      var deviceState = require(__dirname + '/../../lib/deviceState');

      deviceState.updateState(controller.config.deviceId, controller.config.typeClass, { state : 'ok' });
    },

    send : function (config) {
      var https    = require('https'),
          pushover = {},
          request;

      pushover.token       = config.token    || config.device.token;
      pushover.userKey     = config.userKey  || config.device.userKey;
      pushover.host        = config.host     || 'api.pushover.net';
      pushover.path        = config.path     || '/1/messages.json';
      pushover.port        = config.port     || 443;
      pushover.method      = config.method   || 'POST';
      pushover.text        = config.text     || '';
      pushover.payload     = config.payload  || null;
      pushover.callback    = config.callback || function () {};
      pushover.boundary    = Math.random().toString(16);
      pushover.postRequest = this.postData(pushover);

      request = https.request(this.postPrepare(pushover), function (response) {
        response.setEncoding('utf8');

        response.once('data', function (response) {
          pushover.callback(null, response);
        });
      });

      request.once('error', function (err) {
        pushover.callback(err);
      });

      request.end(pushover.postRequest);
    }
  };
}());
