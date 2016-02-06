var Immutable = require('immutable');
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

  describe('#getState', function () {
    it('returns data', function () {
      var actual = JSON.stringify(timeline.getState())
      var expected = JSON.stringify({
        actors: []
      });

      assert.equal(actual, expected);
    });
  });

  describe('#toJSON', function () {
    it('returns data', function () {
      var actual = timeline.toJSON()
      var expected = {
        actors: []
      };

      assert.deepEqual(actual, expected);
    });
  });
});
