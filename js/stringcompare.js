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
    var options = {
        'COMPARE_TYP': 'wordcount'
    };

    var SC = function (master, slave, percentage) {
        return new StringCompare(master, slave, percentage).result;
    };

    var WordCountMethod = function () {
        var statsArray = Array();
        this.generateResult = function (array) {
            var totalCount = array.length;
            var count = 0;
            for (var i = 0; i < totalCount; i++) {
                if (array[i] === 0) {
                    continue;
                } else {
                    count++;
                }
            }
            var r_percentage = (count / totalCount) * 100;
            return this.percentage <= r_percentage ? 1 : 0;
        };

        this.compareString = function (master, slave, percentage) {
            var words = master.split(' ');
            this.percentage = percentage;
            if (words.length > 0) {
                for (var key = 0; key < words.length; key++) {
                    if (words[key] <= 2)
                        continue;
                    statsArray.push(substr_count(slave, words[key]));
                }
                return this.generateResult(statsArray);
            } else {
                return 0;
            }
        };
    };

    var CharCountMethod = function () {
        this.compareString = function (master, slave, percentage) {

        };
    };

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
        var comparisionType = options.COMPARE_TYP;
        var comparator = new StringCompareFactory().compareWith(comparisionType);
        this.result = comparator.compareString(master, slave, percentage);
        return this.result;
    };

    function errorHandler(message) {
        console.log(message);
    }

    function substr_count(string, word) {
        string = string.replace(/\s{2,}/g, ' ');
        var words = string.split(' ');
        var count = 0;
        for (var i = 0; i < words.length; i++) {
            if (words[i] === word) {
                count++;
            }
        }
        return count;
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
    };

    /* Assigning SC object to global window object */
    if (!window.SC) {
        window.SC = SC;
    }

})(window);

