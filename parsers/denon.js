/*jslint white: true */
/*global module, console, require */

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

(function(exports){
  'use strict';

  exports.denon = function (deviceId, markup, state, value, language) {
    
    var translate = function(message) {
      var util;

      if(typeof Switchboard === 'object') {
        message = Switchboard.util.translate(message, 'denon');
      }

      else {
        util    = require(__dirname + '/../lib/sharedUtil').util;
        message = util.translate(message, 'denon', language);
      }

      return message;
    };
  
    if(value) {
      markup = markup.split('{{DEVICE_POWER}}').join(translate(value.power));
      markup = markup.split('{{DEVICE_Z1_INPUT}}').join(translate(value.ZONE1.input));
      markup = markup.split('{{DEVICE_Z1_POWER}}').join(translate(value.ZONE1.power));
      markup = markup.split('{{DEVICE_Z1_MUTE}}').join(translate(value.ZONE1.mute));
      markup = markup.split('{{DEVICE_Z1_MODE}}').join(translate(value.ZONE1.mode));
      markup = markup.split('{{DEVICE_Z1_VOLUME}}').join(value.ZONE1.volume);
      markup = markup.split('{{DEVICE_Z1_MAXVOLUME}}').join(value.ZONE1.maxvolume);
      markup = markup.split('{{DEVICE_Z2_POWER}}').join(translate(value.ZONE2.power));
      markup = markup.split('{{DEVICE_Z2_INPUT}}').join(translate(value.ZONE2.input));
      markup = markup.split('{{DEVICE_Z2_VOLUME}}').join(value.ZONE2.volume);
      markup = markup.split('{{DEVICE_Z3_POWER}}').join(translate(value.ZONE3.power));
      markup = markup.split('{{DEVICE_Z3_INPUT}}').join(translate(value.ZONE3.input));
      markup = markup.split('{{DEVICE_Z3_VOLUME}}').join(value.ZONE3.volume);
    }

      markup = markup.split('{{DEVICE_POWER}}').join('');
      markup = markup.split('{{DEVICE_Z1_POWER}}').join('');
      markup = markup.split('{{DEVICE_Z1_INPUT}}').join('');
      markup = markup.split('{{DEVICE_Z1_MUTE}}').join('');
      markup = markup.split('{{DEVICE_Z1_MODE}}').join('');
      markup = markup.split('{{DEVICE_Z1_VOLUME}}').join('');
      markup = markup.split('{{DEVICE_Z1_MAXVOLUME}}').join('');
      markup = markup.split('{{DEVICE_Z2_POWER}}').join('');
      markup = markup.split('{{DEVICE_Z2_INPUT}}').join('');
      markup = markup.split('{{DEVICE_Z2_VOLUME}}').join('');
      markup = markup.split('{{DEVICE_Z3_POWER}}').join('');
      markup = markup.split('{{DEVICE_Z3_INPUT}}').join('');
      markup = markup.split('{{DEVICE_Z3_VOLUME}}').join('');

    return markup;
  };
})(typeof exports === 'undefined' ? this.Switchboard.parsers : exports);
