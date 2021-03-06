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
 * @fileoverview Unit test for staticAssets.js
 */

exports.staticAssetsTest = {
  getDirectory : function (test) {
    'use strict';

    var staticAssets = require(__dirname + '/../../../lib/staticAssets'),
        css          = staticAssets.getDirectory('.css', '/css/TEST-min.css'),
        js           = staticAssets.getDirectory('.js', '/js/TEST-min.js'),
        roku         = staticAssets.getDirectory('.png', '/images/roku/TEST.png'),
        png          = staticAssets.getDirectory('.png', '/images/TEST/TEST.png'),
        gif          = staticAssets.getDirectory('.gif', '/images/foscam/thumb/TEST.gif'),
        ico          = staticAssets.getDirectory('.ico', '/images/icons/TEST.ico'),
        woff         = staticAssets.getDirectory('.woff', '/font/TEST.woff');

    test.strictEqual(css,  'css',                 'CSS lives in the CSS directory');
    test.strictEqual(js,   'js',                  'JS lives in the JS directory');
    test.strictEqual(roku, 'images/roku',         'Images live in their designated directories');
    test.strictEqual(png,  'images/TEST',         'Images live in their designated directories');
    test.strictEqual(gif,  'images/foscam/thumb', 'Images live in their designated directories');
    test.strictEqual(ico,  'images/icons',        'Icons live in the images directory');
    test.strictEqual(woff, 'font',                'Fonts live in the fonts directory');

    test.done();
  },

  getFilename : function (test) {
    'use strict';

    var staticAssets = require(__dirname + '/../../../lib/staticAssets'),
        goodFile     = staticAssets.getFilename('foo.jpg',  ['jpg']),
        badFile      = staticAssets.getFilename('dir.info', ['gif']),
        noFile       = staticAssets.getFilename();

    test.deepEqual(goodFile, 'foo', 'Removes file extension');
    test.deepEqual(badFile,  null,  'Filters out unexpected files');
    test.deepEqual(noFile,   null,  'Filters out unexpected files');

    test.done();
  }
};
