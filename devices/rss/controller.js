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
   * @fileoverview Grabs RSS or ATOM feeds for display.
   * @requires http, https, xml2js
   */
  return {
    version : 20181227,

    readOnly: true,

    inputs  : ['list'],

    /**
     * Reference template fragment to be used by the parser.
     */
    fragments : function () {
      var fs = require('fs');

      return { item : fs.readFileSync(__dirname + '/fragments/rss.tpl', 'utf-8') };
    },

    /**
     * Prepare a request for command execution.
     */
    postPrepare : function (rss) {
      var method  = rss.method || 'GET';

      return {
        host   : rss.host,
        port   : rss.port,
        path   : rss.path,
        method : method
      };
    },

    /**
     * Grab the latest state as soon as SwitchBoard starts up.
     */
    init : function (controller) {
      var runCommand = require(__dirname + '/../../lib/runCommand');

      runCommand.runCommand(controller.config.deviceId, 'list', controller.config.deviceId);
    },

    /**
     * Accept the JSON formatted API response and parse through, determining if
     * the data is RSS or Atom - and returning an array of sanitized values.
     */
    getArticles : function (reply, maxCount) {
      var util    = require(__dirname + '/../../lib/sharedUtil').util,
          article = {},
          rssData = [],
          i       = 0,
          j       = 0;

      // You're an RSS feed.
      if (reply.rss) {
        for (i in reply.rss.channel[0].item) {
          if (reply.rss.channel[0].item.hasOwnProperty(i)) {
            article = reply.rss.channel[0].item[i];

            rssData[j] = { 'title'       : article.title              ? util.sanitize(article.title[0])              : null,
                           'url'         : article.link               ? util.sanitize(article.link[0])               : null,
                           'description' : article.description        ? util.sanitize(article.description[0])        : null,
                           'text'        : article['content:encoded'] ? util.sanitize(article['content:encoded'][0]) : null };

            j += 1;

            if (j >= maxCount) {
              break;
            }
          }
        }
      }

      // You're probably an Atom feed
      else if ((reply.feed) && (reply.feed.entry)) {
        for (i; i < reply.feed.entry.length; i += 1) {
          article = reply.feed.entry[i];

          rssData[j] = { 'title'       : article.title   ? util.sanitize(article.title[0]._)     : null,
                         'url'         : article.link    ? util.sanitize(article.link[0].$.href) : null,
                         'description' : article.summary ? util.sanitize(article.summary[0]._)   : null,
                         'text'        : article.content ? util.sanitize(article.content[0]._)   : null };

          j += 1;

          if (j >= maxCount) {
            break;
          }
        }
      }

      return rssData;
    },

    send : function (config) {
      var http      = config.device.port === 443 ? require('https') : require('http'),
          that      = this,
          rss       = {},
          dataReply = '',
          request;

      rss.deviceId = config.device.deviceId;
      rss.host     = config.device.host;
      rss.path     = config.device.path;
      rss.port     = config.device.port     || 80;
      rss.maxCount = config.device.maxCount || 10;
      rss.callback = config.callback        || function () {};

      console.log('\x1b[35m' + config.device.title + '\x1b[0m: Fetching device info');

      request = http.request(this.postPrepare(rss), function (response) {
        response.setEncoding('utf8');

        response.on('data', function (response) {
          dataReply += response;
        });

        response.once('end', function () {
          var xml2js  = require('xml2js'),
              parser  = new xml2js.Parser(),
              rssData = [];

          if (dataReply) {
            parser.parseString(dataReply, function (err, reply) {
              if (reply) {
                if (err) {
                  console.log('\x1b[31m' + config.device.title + '\x1b[0m: Unable to parse reply');
                }

                else {
                  rssData = that.getArticles(reply, rss.maxCount);

                  rss.callback(null, rssData);
                }
              }
            });
          }
        });
      });

      request.once('error', function (err) {
        rss.callback(err);
      });

      request.end();
    }
  };
}());
