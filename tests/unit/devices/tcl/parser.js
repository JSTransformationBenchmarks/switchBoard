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
 * @fileoverview Unit test for devices/tcl/parser.js
 */

exports.tclParserTest = {
  parser : function (test) {
    'use strict';

    var tclParser  = require(__dirname + '/../../../../devices/tcl/parser'),
        markup     = '<h1>Foo</h1> <div>{{TCL_DYNAMIC}}</div>',
        value      = { foo : { id : 'TESTID', cache : 'TESTCACHE', name : 'TESTNAME' },
                       bar : { id : 'TEST2',  cache : 'CACHE2',    name : 'BAR TEST' } },
        fragments  = { list : '<span>{{APP_ID}}</span> <em>{{APP_IMG}}</em> <span>{{APP_NAME}}</span>' },
        goodMarkup = tclParser.tcl('dummy', markup, 'ok', value, fragments),
        noValue    = tclParser.tcl('dummy', markup, 'ok', null,  fragments);

    test.strictEqual(goodMarkup.indexOf('{{'),                     -1, 'All values replaced');
    test.notStrictEqual(goodMarkup.indexOf('<span>TESTID</span>'), -1, 'Passed markup validated');
    test.notStrictEqual(goodMarkup.indexOf('<em>CACHE2</em>'),     -1, 'Passed markup validated');
    test.strictEqual(noValue.indexOf('{{'),                        -1, 'All values replaced');
    test.strictEqual(noValue, '<h1>Foo</h1> <div></div>',              'Passed markup validated');

    test.done();
  }
};
