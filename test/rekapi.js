var rekapi = require('../lib/rekapi');
var assert = require('assert');

describe('Timeline', function () {
  var timeline;

  beforeEach(function () {
    timeline = new rekapi.Timeline();
  });

  it('initializes', function () {
    var actual = timeline instanceof rekapi.Timeline;
    var expected = true;
    assert.equal(actual, expected);
  });
});
