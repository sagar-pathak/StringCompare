/*
 * The MIT License
 *
 * Copyright 2014 Sagar Pathak (http://www.sagarpathak.com.np).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * StringCompare is a simple tool to compare two strings based on percentage given.
 * For e.g StringCompare('Hello World', 'Hello my world', 90) (master, slave, percentage)
 * will result to TRUE in this case, because all words of master fields are present
 * in slave field, 100 percentage available. Comparision will be performed
 * from master to slave.
 *
 * @author Sagar Pathak (http://www.sagarpathak.com.np)
 * @link http://github.com/sagar1992/StringCompare
 * @version 1.0
 */
(function (window, undefined) {
    var master, slave, percentage;
    var options = {
        'COMPARE_TYP': 'wordcount'
    };

    var SC = function (master, slave, percentage) {
        return new StringCompare(master, slave, percentage);
    };

    var WordCountMethod = function () {
        this.compareString = function (master, slave, percentage) {

        }
    }

    var CharCountMethod = function () {
        this.compareString = function (master, slave, percentage) {

        }
    }

    function StringCompareFactory() {
        this.compareWith = function (type) {
            switch (type) {
                case 'wordcount':
                    return new WordCountMethod();
                    break;
                case 'charcount':
                    return new CharCountMethod();
                    break;
                default:
                    errorHandler('Invalid string compare type exception. ');
                    break;
            }
        }
    }

    var StringCompare = function (master, slave, percentage) {
        this.version = '1.0';
        var comparisionType = options.COMPARE_TYP;
        var comparator = new StringCompareFactory().compareWith(comparisionType);
        var result = comparator.compareString(master, slave, percentage);
        return result;
    };

    function errorHandler(message) {
        console.log(message);
    }

    function mergeOptions(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
        return obj3;
    }

    SC.setoptions = function (customOptions) {
        options = mergeOptions(options, customOptions);
    }

    /* Assigning SC object to global window object */
    if (!window.SC) {
        window.SC = SC;
    }

})(window);

