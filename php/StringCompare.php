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
/* Default configuration */
$config['COMPARE_TYP'] = 'wordcount';

/* Custom error handlers */

class InvalidStringCompareTypeException extends LogicException {

}

enum comparable_type {
    WORDCOUNT,
    CHARCOUNT
}

interface CompareAlgo {

    public function compareString($master, $slave, $percentage);
}

class StringCompareFactory {

    public static function compareWith($type) {
        if ($type == 'wordcount') {
            return new WordCountMethod();
        } else if ($type == 'charcount') {
            return new CharCountMethod();
        } else {
            throw new InvalidStringCompareTypeException("Invalid string compare type exception.");
        }
    }

}

class WordCountMethod implements CompareAlgo {

    private $percentage;
    private $statsArray = array();

    private function generateResult($array) {
        $totalCount = count($array);
        $count = 0;
        foreach ($array as $value):
            if ($value == 0) {
                continue;
            } else {
                $count++;
            }
        endforeach;
        $r_percentage = ($count / $totalCount) * 100;
        if ($this->percentage <= $r_percentage) {
            return 1;
        } else {
            return 0;
        }
    }

    public function compareString($master, $slave, $percentage) {
        $this->percentage = $percentage;
        $words = explode(' ', $master);
        if (!empty($words)) {
            foreach ($words as $word):
                if (strlen($word) <= 2)
                    continue;
                $this->statsArray[$word] = substr_count($slave, $word);
            endforeach;
            return $this->generateResult($this->statsArray);
        }else {
            return 0;
        }
    }

}

class CharCountMethod implements CompareAlgo {

    private $percentage;
    private $statsArray = array();

    private function generateResult($array) {
        $totalCount = count($array);
        $count = 0;
        foreach ($array as $value):
            if ($value < 0) {
                continue;
            } else {
                $count++;
            }
        endforeach;
        $r_percentage = ($count / $totalCount) * 100;
        if ($this->percentage <= $r_percentage) {
            return 1;
        } else {
            return 0;
        }
    }

    public function compareString($master, $slave, $percentage) {
        $this->percentage = $percentage;
        $masterCount = count_chars($master, 1);
        $slaveCount = count_chars($slave, 1);
        foreach ($masterCount as $key => $count):
            if (array_key_exists($key, $slaveCount)) {
                $this->statsArray[$key] = $slaveCount[$key] - $count;
            } else {
                $this->statsArray[$key] = '-1';
            }
        endforeach;
        return $this->generateResult($this->statsArray);
    }

}

class StringCompare {

    private $percentage;

    function __construct($master, $slave, $percentage) {
        $config = $GLOBALS['config'];
        $comparision_type = $config['COMPARE_TYP'];
        $master = $this->formatInput($master);
        $slave = $this->formatInput($slave);

        $comparator = StringCompareFactory::compareWith($comparision_type);
        $this->result = $comparator->compareString($master, $slave, $percentage);
    }

    public function __toString() {
        return (string) $this->result;
    }

    protected function formatInput($string) {
        $string = strtolower($string);
        return $string;
    }

}

function StringCompare($master, $slave, $percentage) {
    return new StringCompare($master, $slave, $percentage);
}
