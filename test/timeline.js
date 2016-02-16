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
      var actual = Immutable.Map(timeline.getState()).toJSON();
      var expected = {
        duration: 0,
        actors: [],
        customCurves: {}
      };

      assert.deepEqual(actual, expected);
    });
  });

  describe('#toJSON', function () {
    it('returns data', function () {
      var actual = timeline.toJSON()
      var expected = {
        duration: 0,
        actors: [],
        customCurves: {}
      };

      assert.deepEqual(actual, expected);
    });
  });

  describe('#keyframe', function () {
    describe('single keyframes', function () {
      describe('empty keyframes', function () {
        beforeEach(function () {
          timeline.keyframe('actor-1', 0, {});
        });

        it('adds a new keyframe', function () {
          var actual = timeline.toJSON();
          var expected = {
            duration: 0,
            actors: [{
              id: 'actor-1',
              start: 0,
              end: 0,
              propertyTracks: {}
            }],
            customCurves: {}
          };

          assert.deepEqual(actual, expected);
        });

        it('expands the timeline duration', function () {
          timeline.keyframe('actor-1', 100, {});
          var actual = timeline.toJSON().duration;
          var expected = 100;

          assert.deepEqual(actual, expected);
        });
      });
    });
  });
});
