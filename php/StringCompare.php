<?php

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
 * StringCompare is a simple tool to compare two strings having more than one word
 * based on percentage given. For e.g
 * StringCompare('Hello World', 'Hello my world', 90) /* (master, slave, percentage)
 * will result to TRUE in this case, because all words of master fields are present
 * in slave field, 100 percentage available. Comparision will be performed
 * from master to slave.
 *
 * @author Sagar Pathak (http://www.sagarpathak.com.np)
 * @link http://github.com/sagar1992/StringCompare
 * @version 1.0
 */
class InvalidStringCompareTypeException extends LogicException {

}

interface CompareAlgo {

    public function compareString($master, $slave, $percentage);
}

class StringCompareFactory {

    public static function compareWith($type) {
        if ($type == 'wordcount') {

        } else if ($type == 'charcount') {

        } else {
            throw new InvalidStringCompareTypeException("Invalid string compare type exception.");
        }
    }

}

class WordCountMethod implements CompareAlgo {

    public function compareString($master, $slave, $percentage) {

    }

}

class CharCountMethod implements CompareAlgo {

    public function compareString($master, $slave, $percentage) {
        
    }

}

class StringCompare {
//put your code here
}
