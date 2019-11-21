// IMPORT MODULES under test here:
import getIdString from '../node-utils/getIdString.js';

const test = QUnit.test;

test('pseudo random generator should return a string of specified length', assert => {
    const expected = 30;
    const actual = getIdString(30).length;
    assert.equal(actual, expected);
});
