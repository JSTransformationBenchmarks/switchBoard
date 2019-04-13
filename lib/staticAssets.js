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
 * @fileoverview Handles any request for static assets such as images, fonts,
 *               CSS or public facing JS.
 * @requires fs, path
 */

module.exports = (function () {
  'use strict';

  return {
    version : 20180109,

    mimeTypes : { '.html'     : 'text/html',
                  '.css'      : 'text/css',
                  '.js'       : 'application/javascript',
                  '.png'      : 'image/png',
                  '.jpg'      : 'image/jpeg',
                  '.gif'      : 'image/gif',
                  '.ico'      : 'image/x-icon',
                  '.eot'      : 'application/vnd.ms-fontobject',
                  '.svg'      : 'image/svg+xml',
                  '.ttf'      : 'application/x-font-ttf',
                  '.woff'     : 'application/x-font-woff',
                  '.woff2'    : 'application/x-font-woff2',
                  '.appcache' : 'text/cache-manifest',
                  '.json'     : 'application/json',
                  '.mp3'      : 'audio/mpeg',
                  '.mp4'      : 'video/mp4',
                  '.mkv'      : 'video/mp4' },

    /**
     * Resolve the directory path in which a given file exists, so we can serve
     * it up, if it's appropriate.
     */
    getDirectory : function (extension, url) {
      var sanitize  = require(__dirname + '/sharedUtil').util.sanitize,
          path      = require('path'),
          directory = false,
          imagePath;

      switch (extension) {
        case '.css' :
          directory = 'css';
        break;

        case '.js' :
          directory = 'js';
        break;

        case '.png' :
          imagePath = path.dirname(url).split(path.sep);

          if (imagePath[1] === 'images') {
            directory = 'images/' + sanitize(imagePath[2]);
          }
        break;

        case '.ico' :
          directory = 'images/icons';
        break;

        case '.jpg' :
        case '.gif' :
          imagePath = path.dirname(url).split(path.sep);

          if (path.basename(url) === 'loading.gif') {
            directory = 'images/';
          }

          if ((imagePath[1] === 'images') &&
              (imagePath[3] === 'thumb')) {
            directory = 'images/' + sanitize(imagePath[2]) + '/thumb';
          }

          if ((imagePath[1] === 'images') &&
              (imagePath[3] === 'photos')) {
            directory = 'images/' + sanitize(imagePath[2]) + '/photos';
          }
        break;

        case '.eot' :
        case '.svg' :
        case '.ttf' :
        case '.woff' :
        case '.woff2' :
          directory = 'font';
        break;

        case '.appcache' :
        case '.json'     :
          directory = '.';
        break;

        case '.mp3' :
          directory = 'mp3';
        break;

        case '.mp4' :
        case '.mkv' :
          imagePath = path.dirname(url).split(path.sep);

          if ((imagePath[1] === 'images') &&
              (imagePath[3] === 'dvr')) {
            directory = 'images/' + sanitize(imagePath[2]) + '/dvr';
          }
        break;
      }

      return directory;
    },

    /**
     * If a file exists - serve up the contents.
     */
    writeFile : function (directory, filename, response, config) {
      var path      = require('path'),
          fs        = require('fs'),
          that      = this,
          translate,
          extension = path.extname(filename),
          assetPath = path.join(__dirname + '/../' + directory + '/' + filename);

      fs.readFile(assetPath, function (err, contents) {
        var headers;

        if (err) {
          translate = require('./translate');

          console.log('\x1b[31m404 Not Found\x1b[0m: ' + assetPath + ' was not found on server');

          fs.readFile(__dirname + '/../templates/404.html', 'utf-8', function (err, contents) {
            if (err) {
              console.log('\x1b[31m404 Not Found\x1b[0m: Unable to find 404 page (how\'s that for irony?)');
            }

            else {
              contents = translate.translate(contents, 'container');
              contents = contents.replace('{{i18n_LANGUAGE}}', config.language);
              contents = contents.replace('{{THEME}}', config.theme);
              response.writeHead(404, {'Content-Type': that.mimeTypes['.html'], 'Content-Length': contents.length});
              response.end(contents);
            }
          });
        }

        else {
          headers = { 'Content-Type'   : that.mimeTypes[extension],
                      'Content-Length' : contents.length };

          if (filename === 'manifest.appcache') {
            headers['Cache-Control'] = 'no-cache';
          }

          else if (filename === 'manifest.json') {
            headers['Content-Type'] = 'application/manifest+json';
          }

          response.writeHead(200, headers);

          response.end(contents);
        }
      });
    },

    /**
     * Updates the appcache manifest with a cache-busting timestamp.
     */
    freshenManifest : function () {
      var fs = require('fs');

      fs.readFile(__dirname + '/../manifest.appcache', 'utf-8', function (err, contents) {
        var parts        = contents.split("\n"),
            now          = new Date(),
            dateStamp    = now.toLocaleString(),
            manifest     = '',
            manifestFile = {};

        if (err) {
          console.log('\x1b[31mApp Cache\x1b[0m: Cache manifest unable to be read');
        }

        else {
          parts[1] = '# ' + dateStamp;

          manifest = parts.join("\n");

          if ((parts.length > 3) && (manifest)) {
            manifestFile = fs.writeFile(__dirname + '/../manifest.appcache', manifest, function (err) {
              if (err) {
                console.log('\x1b[31mApp Cache\x1b[0m: Cache manifest unable to be updated');
              }

              else {
                console.log('\x1b[32mApp Cache\x1b[0m: Cache manifest updated');
              }
            });
          }

          else {
            console.log('\x1b[31mApp Cache\x1b[0m: Cache manifest unable to be read');
          }
        }
      });
    },

    /**
     * Builds CRT and private key for self-signed SSL if configured and not
     * already built.
     */
    buildCerts : function (config) {
      var spawn  = require('child_process').spawn,
          params = [],
          generate;

      params.push('req');
      params.push('-x509');
      params.push('-nodes');
      params.push('-sha256');
      params.push('-days');
      params.push('9990');
      params.push('-newkey');
      params.push('rsa:2048');
      params.push('-keyout');
      params.push('cache/key.pem');
      params.push('-out');
      params.push('cache/server.crt');
      params.push('-subj');
      params.push('/C=' + config.country + '/ST=' + config.state + '/L=' + config.city + '/O=' + config.org + '/CN=' + config.name);

      generate = spawn('openssl', params);

      console.log('\x1b[32mSSL\x1b[0m: Keys generating.  Hold tight.');

      generate.once('error', function () {
        console.log('\x1b[31mSSL\x1b[0m: Exception in generating SSL keys.  Do you have openssl installed?');
      });

      generate.once('close', function (code) {
        if (code === 0) {
          console.log('\x1b[31m=====================================================================\x1b[0m');
          console.log('\x1b[31mWARNING\x1b[0m: SSL keys generated.  You will need to restart to make use of');
          console.log('\x1b[31mSSL.');
          console.log('\x1b[31m=====================================================================\x1b[0m');
        }

        else {
          console.log('\x1b[31mSSL\x1b[0m: Keys failed to generate!');
        }
      });
    },

    getFilename : function (filename, validTypes) {
      var extension = null,
          clean     = null;

      validTypes = validTypes || ['jpg', 'gif', 'mp4', 'mkv'];

      if (filename) {
        extension = filename.split('.').pop();

        if (validTypes.indexOf(extension) !== -1) {
          clean = filename.slice(0, -4);
        }
      }

      return clean;
    }
  };
}());
