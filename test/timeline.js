var Immutable = require('immutable');
var Timeline = require('../tmp/timeline').Timeline;
var assert = require('assert');

describe('Timeline', () => {
  var timeline;

  beforeEach(() => {
    timeline = new Timeline();
  });

  it('initializes', () => {
    var actual = timeline instanceof Timeline;
    var expected = true;
    assert.equal(actual, expected);
  });

  describe('#getState', () => {
    it('returns data', () => {
      var actual = Immutable.Map(timeline.getState()).toJSON();
      var expected = {
        duration: 0,
        actors: [],
        customCurves: {}
      };

      assert.deepEqual(actual, expected);
    });
  });

  describe('#toJSON', () => {
    it('returns data', () => {
      var actual = timeline.toJSON()
      var expected = {
        duration: 0,
        actors: [],
        customCurves: {}
      };

      assert.deepEqual(actual, expected);
    });
  });

  describe('#keyframe', () => {
    describe('single keyframes', () => {
      describe('empty keyframes', () => {
        beforeEach(() => {
          timeline.keyframe('actor-1', 0, {});
        });

        it('adds a new keyframe', () => {
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

        it('expands the timeline duration', () => {
          timeline.keyframe('actor-1', 100, {});
          var actual = timeline.toJSON().duration;
          var expected = 100;

          assert.deepEqual(actual, expected);
        });
      });

      describe('non-empty keyframes', () => {
        describe('undefined easing', () => {
          describe('single property', () => {
            beforeEach(() => {
              timeline.keyframe('actor-1', 0, { x: 0 });
            });

            it('adds a new keyframe', () => {
              var actual = timeline.toJSON();
              var expected = {
                duration: 0,
                actors: [{
                  id: 'actor-1',
                  start: 0,
                  end: 0,
                  propertyTracks: {
                    x: [{
                      ms: 0,
                      name: 'x',
                      value: 0,
                      easing: 'linear'
                    }]
                  }
                }],
                customCurves: {}
              };

              assert.deepEqual(actual, expected);
            });
          });

          describe('multiple properties', () => {
            beforeEach(() => {
              timeline.keyframe('actor-1', 0, { x: 0, y: 0 });
            });

            it('adds a new keyframe', () => {
              var actual = timeline.toJSON();
              var expected = {
                duration: 0,
                actors: [{
                  id: 'actor-1',
                  start: 0,
                  end: 0,
                  propertyTracks: {
                    x: [{
                      ms: 0,
                      name: 'x',
                      value: 0,
                      easing: 'linear'
                    }],
                    y: [{
                      ms: 0,
                      name: 'y',
                      value: 0,
                      easing: 'linear'
                    }]
                  }
                }],
                customCurves: {}
              };

              assert.deepEqual(actual, expected);
            });
          });
        });

        describe('object easing', () => {
          describe('single property, single easing', () => {});
          describe('multiple properties, single easing', () => {});
          describe('multiple properties, multiple easings', () => {});
          describe('single property, multiple easings', () => {});
        });

        describe('string easing', () => {
          describe('single property, single easing', () => {});
          describe('multiple properties, single easing', () => {});
          describe('multiple properties, multiple easings', () => {});
          describe('single property, multiple easings', () => {});
        });

      });
    });
  });
});
