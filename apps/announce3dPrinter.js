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
 * @fileoverview Announce when your 3d printer is finished.
 */

module.exports = (function () {
  'use strict';

  var PrintProgress = {};

  return {
    version : 20170527,

    translate : function (token, lang) {
      var translate = require(__dirname + '/../lib/translate');

      return translate.translate('{{i18n_' + token + '}}', 'monoPrice3dPrinter', lang);
    },

    announce3dPrinter : function (deviceId, command, controllers, values) {
      var notify,
          lang       = controllers.config.language,
          message    = '',
          percent;

      if ((values) && (values.value)) {
        percent = values.value.percent;

        if ((PrintProgress[deviceId] !== percent) && (percent === '100')) {
          notify = require(__dirname + '/../lib/notify');

          message = this.translate('PRINT_COMPLETED', lang);

          notify.notify(message, controllers, deviceId);
        }

        PrintProgress[deviceId] = percent;
      }
    }
  };
}());
