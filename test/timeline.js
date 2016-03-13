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
        actors: [],
        customCurves: {}
      };

      assert.deepEqual(actual, expected);
    });
  });

  describe('#keyframe', function () {
    describe('single keyframes', function () {
      describe('single actor', function () {
        describe('empty keyframes', function () {
          describe('starting from 0', function () {
            beforeEach(function () {
              timeline.keyframe('actor-1', 0, {});
            });

            it('adds a new keyframe', function () {
              var actual = timeline.toJSON();
              var expected = {
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

          describe('starting later than 0', function () {
            beforeEach(function () {
              timeline.keyframe('actor-1', 100, {});
            });

            it('adds a new keyframe', function () {
              var actual = timeline.toJSON();
              var expected = {
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

        describe('non-empty keyframes', function () {
          describe('undefined easing', function () {
            describe('single property', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0 });
              });

              it('adds a new keyframe', function () {
                var actual = timeline.toJSON();
                var expected = {
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

            describe('multiple properties', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 });
              });

              it('adds new keyframes', function () {
                var actual = timeline.toJSON();
                var expected = {
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

          describe('object easing', function () {
            describe('single property, single easing', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0 }, { x: 'fakeEasing' });
              });

              it('adds a new keyframe', function () {
                var actual = timeline.toJSON();
                var expected = {
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

            describe('multiple properties, single easing', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 }, { x: 'fakeEasing' });
              });

              it('adds new keyframes', function () {
                var actual = timeline.toJSON();
                var expected = {
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

            describe('multiple properties, multiple easings', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 }, { x: 'fakeEasing', y: 'fakeEasing' });
              });

              it('adds new keyframes', function () {
                var actual = timeline.toJSON();
                var expected = {
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

            describe('single property, multiple easings', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0 }, { x: 'fakeEasing', y: 'fakeEasing' });
              });

              it('adds a new keyframe', function () {
                var actual = timeline.toJSON();
                var expected = {
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

          describe('string easing', function () {
            describe('single property, single easing', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0 }, 'fakeEasing');
              });

              it('adds a new keyframe', function () {
                var actual = timeline.toJSON();
                var expected = {
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

            describe('multiple properties, single easing', function () {
              beforeEach(function () {
                timeline.keyframe('actor-1', 0, { x: 0, y: 0 }, 'fakeEasing');
              });

              it('adds new keyframes', function () {
                var actual = timeline.toJSON();
                var expected = {
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

          describe('duplicate keyframes', function () {
            beforeEach(function () {
              timeline
                .keyframe('actor-1', 0, { x: 0 })
                .keyframe('actor-1', 0, { x: 0 });
            });

            it('does not create redundant keyframes', function () {
              var actual = timeline.toJSON();
              var expected = {
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

          describe('updating keyframe', function () {
            beforeEach(function () {
              timeline
                .keyframe('actor-1', 0, { x: 0 })
                .keyframe('actor-1', 0, { x: 100 });
            });

            it('existing keyframe is updated', function () {
              var actual = timeline.toJSON();
              var expected = {
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

      describe('multiple actors', function () {
        describe('empty keyframes', function () {
          beforeEach(function () {
            timeline.keyframe('actor-1', 0, {});
            timeline.keyframe('actor-2', 0, {});
          });

          it('adds new keyframes', function () {
            var actual = timeline.toJSON();
            var expected = {
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

    describe('multiple keyframes', function () {
      describe('single actor', function () {
        describe('non-empty keyframes', function () {
          describe('keyframes made in order', function () {
            beforeEach(function () {
              timeline
                .keyframe('actor-1', 0, { x: 0 })
                .keyframe('actor-1', 100, { x: 200 });
            });

            describe('creates multiple keyframes in a single track', function () {
              it('adds new keyframes', function () {
                var actual = timeline.toJSON();
                var expected = {
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

          describe('keyframes made out of order', function () {
            beforeEach(function () {
              timeline
                .keyframe('actor-1', 100, { x: 200 })
                .keyframe('actor-1', 0, { x: 0 });
            });

            describe('keyframes are added and ordered internally', function () {
              it('adds new keyframes', function () {
                var actual = timeline.toJSON();
                var expected = {
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

        describe('updating keyframes', function () {
          beforeEach(function () {
            timeline
              .keyframe('actor-1', 0, { x: 0, y: 10 })
              .keyframe('actor-1', 0, { x: 100 });
          });

          it('existing keyframe is partially updated', function () {
            var actual = timeline.toJSON();
            var expected = {
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

      describe('multiple actors', function () {
        describe('associating keyframes with correct actors', function () {
          beforeEach(function () {
            timeline
              .keyframe('actor-1', 0, { x: 0 })
              .keyframe('actor-2', 0, { y: 0 })
              .keyframe('actor-1', 100, { x: 200 })
              .keyframe('actor-2', 150, { y: 200 });
          });

          it('adds keyframes to correct actors', function () {
            var actual = timeline.toJSON();
            var expected = {
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

  describe('#remove', function () {
    beforeEach(function () {
      timeline
        .keyframe('actor-1', 0, { x: 0 })
        .keyframe('actor-1', 100, { x: 100 });
    });

    describe('actor', function () {
      describe('single actor', function () {
        it('removes an entire actor', function () {
          timeline.remove('actor-1');

          var actual = timeline.toJSON();
          var expected = {
            actors: [],
            customCurves: {}
          };

          assert.deepEqual(actual, expected);
        });

        it('does nothing if requested actor is not found', function () {
          timeline.remove('actor-9');

          var actual = timeline.toJSON();
          var expected = {
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

      describe('multiple actors', function () {
        it('does not affect the unremoved actor', function () {
          timeline
            .keyframe('actor-2', 0, { y: 0 })
            .keyframe('actor-2', 50, { y: 50 });
          timeline.remove('actor-1');

          var actual = timeline.toJSON();
          var expected = {
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

    describe('actor + ms', function () {
      it('removes the first keyframe', function () {
        timeline.remove('actor-1', 0);

        var actual = timeline.toJSON();
        var expected = {
          actors: [{
            id: 'actor-1',
            start: 100,
            end: 100,
            propertyTracks: {
              x: [{
                ms: 100,
                value: 100,
                easing: 'linear'
              }]
            }
          }],
          customCurves: {}
        };

        assert.deepEqual(actual, expected);
      });

      it('removes a middle keyframe', function () {
        timeline
          .keyframe('actor-1', 50, { x: 50 })
          .remove('actor-1', 50);

        var actual = timeline.toJSON();
        var expected = {
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
                value: 100,
                easing: 'linear'
              }]
            }
          }],
          customCurves: {}
        };

        assert.deepEqual(actual, expected);
      });

      it('removes the last keyframe', function () {
        timeline.remove('actor-1', 100);

        var actual = timeline.toJSON();
        var expected = {
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

    describe('actor + ms + props', function () {
      beforeEach(function () {
        timeline.keyframe('actor-1', 100, { y: 100 });
      });

      describe('removing only specified properties', function () {
        it('removes specified properties and leaves others alone', function () {
          timeline.remove('actor-1', 100, 'y');

          var actual = timeline.toJSON();
          var expected = {
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
                  value: 100,
                  easing: 'linear'
                }]
              }
            }],
            customCurves: {}
          };

          assert.deepEqual(actual, expected);
        });

        it('does nothing if nonexistent property is targeted', function () {
          timeline.remove('actor-1', 100, 'z');

          var actual = timeline.toJSON();
          var expected = {
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
                  value: 100,
                  easing: 'linear'
                }],
                y: [{
                  ms: 100,
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

    describe('actor + props', function () {
      it('throws an error', function () {
        assert.throws(
          () => timeline.remove('actor-1', undefined, 'x'),
          TypeError
        );
      });
    });
  });

  describe('#modify', function () {
    beforeEach(function () {
      timeline.keyframe('actor-1', 0, { x: 0 });
    });

    describe('basic modification', function () {
      it('modifies a property value', function () {
        timeline.modify('actor-1', 0, 'x', 150);

        var actual = timeline.toJSON();
        var expected = {
          actors: [{
            id: 'actor-1',
            start: 0,
            end: 0,
            propertyTracks: {
              x: [{
                ms: 0,
                value: 150,
                easing: 'linear'
              }]
            }
          }],
          customCurves: {}
        };

        assert.deepEqual(actual, expected);
      });
    });

    describe('invalid parameter handling', function () {
      it('does nothing if an invalid actor is specified', function () {
        timeline.modify('actor-9', 0, 'x', 150);

        var actual = timeline.toJSON();
        var expected = {
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

      it('does nothing if an invalid ms is specified', function () {
        timeline.modify('actor-1', 999, 'x', 150);

        var actual = timeline.toJSON();
        var expected = {
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

      it('does nothing if an invalid prop is specified', function () {
        timeline.modify('actor-1', 0, 'z', 150);

        var actual = timeline.toJSON();
        var expected = {
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
    })
  });
});
