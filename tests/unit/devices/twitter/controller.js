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

/**
 * @author brian@bevey.org
 * @fileoverview Unit test for devices/twitter/controller.js
 */

exports.twitterControllerTest = {
  fragments : function (test) {
    'use strict';

    var twitterController = require(__dirname + '/../../../../devices/twitter/controller'),
        fragments         = twitterController.fragments();

    test.strictEqual(typeof fragments.tweet,  'string', 'Tweet fragment verified');

    test.done();
  },

  generateSignature : function (test) {
    'use strict';

    var twitterController = require(__dirname + '/../../../../devices/twitter/controller'),
        mentionsConfig    = { method       : 'get',
                              port         : 443,
                              host         : 'api.twitter.com',
                              path         : '/1.1/statuses/mentions_timeline.json',
                              maxCount     : 5,
                              consumerKey  : '123456',
                              nonce        : '123456',
                              sigMethod    : 'HMAC-SHA1',
                              timestamp    : 12345678,
                              accessToken  : '123456',
                              oauthVersion : '1.0',
                              consumerSec  : '123456',
                              oauthSec     : '123456' },
        userConfig        = { method       : 'get',
                              port         : 443,
                              host         : 'api.twitter.com',
                              path         : '/1.1/statuses/user_timeline.json',
                              params       : 'user_name=imbrianj',
                              maxCount     : 5,
                              consumerKey  : '123456',
                              nonce        : '123456',
                              sigMethod    : 'HMAC-SHA1',
                              timestamp    : 12345678,
                              accessToken  : '123456',
                              oauthVersion : '1.0',
                              consumerSec  : '123456',
                              oauthSec     : '123456' },
        mentionsSignature = twitterController.generateSignature(mentionsConfig),
        userSignature     = twitterController.generateSignature(userConfig);

    test.strictEqual(mentionsSignature, '5QMMYaJWgY33ZzHv9lECRFZaSdA%3D', 'Mentions signature should match');
    test.strictEqual(userSignature,     'LT0lc0XMd9Tjg2/lfpGwqYyr0lk%3D', 'User signature should match');

    test.done();
  },

  postPrepare : function (test) {
    'use strict';

    var twitterController = require(__dirname + '/../../../../devices/twitter/controller'),
        config            = { method       : 'get',
                              port         : 443,
                              host         : 'api.twitter.com',
                              path         : '/1.1/statuses/mentions_timeline.json',
                              maxCount     : 5,
                              consumerKey  : '123456',
                              nonce        : '123456',
                              sigMethod    : 'HMAC-SHA1',
                              timestamp    : 12345678,
                              accessToken  : '123456',
                              garbage      : 'This shouldn\'t be here',
                              oauthVersion : '1.0',
                              consumerSec  : '123456',
                              oauthSec     : '123456' },
        testData           = twitterController.postPrepare(config);

    test.deepEqual(testData, { host : 'api.twitter.com',
                               port : 443,
                               path : '/1.1/statuses/mentions_timeline.json?count=5',
                               method : 'get',
                               headers : {
                                 Accept: 'application/json',
                                 'Accept-Charset': 'utf-8',
                                 'User-Agent': 'node-switchBoard',
                                 'Content-Type': 'application/x-www-form-urlencoded',
                                 Connection: 'keep-alive',
                                 Authorization: 'OAuth oauth_consumer_key="123456", oauth_nonce="123456", oauth_signature="5QMMYaJWgY33ZzHv9lECRFZaSdA%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="12345678", oauth_token="123456", oauth_version="1.0"'
                               }
                             }, 'Additional params are filtered out - sig generated and Auth properly formatted.');

    test.done();
  }
};
