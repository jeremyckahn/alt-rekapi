var Timeline = require('../tmp/timeline').Timeline;
var assert = require('assert');

describe('Timeline', function () {
  var timeline;

  beforeEach(function () {
    timeline = new Timeline();
  });

  it('initializes', function () {
    var actual = timeline instanceof Timeline;
    var expected = true;
    assert.equal(actual, expected);
  });
});
