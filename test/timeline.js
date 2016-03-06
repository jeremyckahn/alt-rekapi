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
      describe('single actor', () => {
        describe('empty keyframes', () => {
          describe('starting from 0', () => {
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
          });

          describe('starting later than 0', () => {
            beforeEach(() => {
              timeline.keyframe('actor-1', 100, {});
            });

            it('adds a new keyframe', () => {
              var actual = timeline.toJSON();
              var expected = {
                duration: 100,
                actors: [{
                  id: 'actor-1',
                  start: 100,
                  end: 100,
                  propertyTracks: {}
                }],
                customCurves: {}
              };

              assert.deepEqual(actual, expected);
            });
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

              it('adds new keyframes', () => {
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
                        value: 0,
                        easing: 'linear'
                      }],
                      y: [{
                        ms: 0,
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
            describe('single property, single easing', () => {
              beforeEach(() => {
                timeline.keyframe('actor-1', 0, { x: 0 }, { x: 'fakeEasing' });
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
                        value: 0,
                        easing: 'fakeEasing'
                      }]
                    }
                  }],
                  customCurves: {}
                };

                assert.deepEqual(actual, expected);
              });
            });

            describe('multiple properties, single easing', () => {
              beforeEach(() => {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 }, { x: 'fakeEasing' });
              });

              it('adds new keyframes', () => {
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
                        value: 0,
                        easing: 'fakeEasing'
                      }],
                      y: [{
                        ms: 0,
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

            describe('multiple properties, multiple easings', () => {
              beforeEach(() => {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 }, { x: 'fakeEasing', y: 'fakeEasing' });
              });

              it('adds new keyframes', () => {
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
                        value: 0,
                        easing: 'fakeEasing'
                      }],
                      y: [{
                        ms: 0,
                        value: 0,
                        easing: 'fakeEasing'
                      }]
                    }
                  }],
                  customCurves: {}
                };

                assert.deepEqual(actual, expected);
              });
            });

            describe('single property, multiple easings', () => {
              beforeEach(() => {
                timeline.keyframe('actor-1', 0, { x: 0 }, { x: 'fakeEasing', y: 'fakeEasing' });
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
                        value: 0,
                        easing: 'fakeEasing'
                      }]
                    }
                  }],
                  customCurves: {}
                };

                assert.deepEqual(actual, expected);
              });
            });
          });

          describe('string easing', () => {
            describe('single property, single easing', () => {
              beforeEach(() => {
                timeline.keyframe('actor-1', 0, { x: 0 }, 'fakeEasing');
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
                        value: 0,
                        easing: 'fakeEasing'
                      }]
                    }
                  }],
                  customCurves: {}
                };

                assert.deepEqual(actual, expected);
              });
            });

            describe('multiple properties, single easing', () => {
              beforeEach(() => {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 }, 'fakeEasing');
              });

              it('adds new keyframes', () => {
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
                        value: 0,
                        easing: 'fakeEasing'
                      }],
                      y: [{
                        ms: 0,
                        value: 0,
                        easing: 'fakeEasing'
                      }]
                    }
                  }],
                  customCurves: {}
                };

                assert.deepEqual(actual, expected);
              });
            });
          });

          describe('duplicate keyframes', () => {
            beforeEach(() => {
              timeline
                .keyframe('actor-1', 0, { x: 0 })
                .keyframe('actor-1', 0, { x: 0 });
            });

            it('does not create redundant keyframes', () => {
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

          describe('updating keyframe', () => {
            beforeEach(() => {
              timeline
                .keyframe('actor-1', 0, { x: 0 })
                .keyframe('actor-1', 0, { x: 100 });
            });

            it('existing keyframe is updated', () => {
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
                      value: 100,
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
      });

      describe('multiple actors', () => {
        describe('empty keyframes', () => {
          beforeEach(() => {
            timeline.keyframe('actor-1', 0, {});
            timeline.keyframe('actor-2', 0, {});
          });

          it('adds new keyframes', () => {
            var actual = timeline.toJSON();
            var expected = {
              duration: 0,
              actors: [{
                id: 'actor-1',
                start: 0,
                end: 0,
                propertyTracks: {}
              }, {
                id: 'actor-2',
                start: 0,
                end: 0,
                propertyTracks: {}
              }],
              customCurves: {}
            };

            assert.deepEqual(actual, expected);
          });
        });
      });
    });

    describe('multiple keyframes', () => {
      describe('single actor', () => {
        describe('empty keyframes', () => {
          beforeEach(() => {
            timeline.keyframe('actor-1', 0, {});
          });

          it('expands the timeline duration', () => {
            timeline.keyframe('actor-1', 100, {});
            var actual = timeline.toJSON().duration;
            var expected = 100;

            assert.deepEqual(actual, expected);
          });
        });

        describe('non-empty keyframes', () => {
          describe('keyframes made in order', () => {
            beforeEach(() => {
              timeline
                .keyframe('actor-1', 0, { x: 0 })
                .keyframe('actor-1', 100, { x: 200 });
            });

            describe('creates multiple keyframes in a single track', () => {
              it('adds new keyframes', () => {
                var actual = timeline.toJSON();
                var expected = {
                  duration: 100,
                  actors: [{
                    id: 'actor-1',
                    start: 0,
                    end: 100,
                    propertyTracks: {
                      x: [{
                        ms: 0,
                        value: 0,
                        easing: 'linear'
                      }, {
                        ms: 100,
                        value: 200,
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

          describe('keyframes made out of order', () => {
            beforeEach(() => {
              timeline
                .keyframe('actor-1', 100, { x: 200 })
                .keyframe('actor-1', 0, { x: 0 });
            });

            describe('keyframes are added and ordered internally', () => {
              it('adds new keyframes', () => {
                var actual = timeline.toJSON();
                var expected = {
                  duration: 100,
                  actors: [{
                    id: 'actor-1',
                    start: 0,
                    end: 100,
                    propertyTracks: {
                      x: [{
                        ms: 0,
                        value: 0,
                        easing: 'linear'
                      }, {
                        ms: 100,
                        value: 200,
                        easing: 'linear'
                      }]
                    }
                  }],
                  customCurves: {}
                };

                assert.deepEqual(actual, expected);
              });
            });
          })
        });

        describe('updating keyframes', () => {
          beforeEach(() => {
            timeline
              .keyframe('actor-1', 0, { x: 0, y: 10 })
              .keyframe('actor-1', 0, { x: 100 });
          });

          it('existing keyframe is partially updated', () => {
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
                    value: 100,
                    easing: 'linear'
                  }],
                  y: [{
                    ms: 0,
                    value: 10,
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

      describe('multiple actors', () => {
        describe('associating keyframes with correct actors', () => {
          beforeEach(() => {
            timeline
              .keyframe('actor-1', 0, { x: 0 })
              .keyframe('actor-2', 0, { y: 0 })
              .keyframe('actor-1', 100, { x: 200 })
              .keyframe('actor-2', 150, { y: 200 });
          });

          it('adds keyframes to correct actors', () => {
            var actual = timeline.toJSON();
            var expected = {
              duration: 150,
              actors: [{
                id: 'actor-1',
                start: 0,
                end: 100,
                propertyTracks: {
                  x: [{
                    ms: 0,
                    value: 0,
                    easing: 'linear'
                  }, {
                    ms: 100,
                    value: 200,
                    easing: 'linear'
                  }]
                }
              }, {
                id: 'actor-2',
                start: 0,
                end: 150,
                propertyTracks: {
                  y: [{
                    ms: 0,
                    value: 0,
                    easing: 'linear'
                  }, {
                    ms: 150,
                    value: 200,
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
    });
  });

  describe('#remove', () => {
    beforeEach(() => {
      timeline
        .keyframe('actor-1', 0, { x: 0 })
        .keyframe('actor-1', 100, { x: 100 });
    });

    describe('actor', () => {
      describe('single actor', () => {
        it('removes an entire actor', () => {
          timeline.remove('actor-1');

          var actual = timeline.toJSON();
          var expected = {
            duration: 0,
            actors: [],
            customCurves: {}
          };

          assert.deepEqual(actual, expected);
        });
      });

      describe('multiple actors', () => {
        it('does not affect the unremoved actor', () => {
          timeline
            .keyframe('actor-2', 0, { y: 0 })
            .keyframe('actor-2', 50, { y: 50 });
          timeline.remove('actor-1');

          var actual = timeline.toJSON();
          var expected = {
            duration: 50,
            actors: [{
              id: 'actor-2',
              start: 0,
              end: 50,
              propertyTracks: {
                y: [{
                  ms: 0,
                  value: 0,
                  easing: 'linear'
                }, {
                  ms: 50,
                  value: 50,
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

    describe('actor + ms', () => {});

    describe('actor + ms + props', () => {});

    describe('actor + props', () => {
      it('throws an error', () => {
        assert.throws(
          () => timeline.remove('actor-1', undefined, 'x'),
          TypeError
        );
      });
    });
  });
});
