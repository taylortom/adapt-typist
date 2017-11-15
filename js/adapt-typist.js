define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');
  var $Typist = require('../libraries/jquery.typist.min.js');

  var Typist = ComponentView.extend({
    postRender: function() {
      this.$('.text').css('font-size', this.model.get('fontSize'));

      this.setReadyStatus();
      this.$el.on('inview', _.bind(this.inview, this));
    },

    inview: function(event, visible, visiblePartX, visiblePartY) {
      if(!visible || visiblePartX !== 'both' || visiblePartY !== 'both') {
        return;
      }
      this.$el.off('inview');

      this.showText();
      this.setCompletionStatus();
    },

    showText: function() {
      var $text = $('.text');
      var index = -1;
      var texts = this.model.get('texts');
      var loop = this.model.get('loop');
      var _next = function() {
        if(++index === texts.length) {
          if(!loop) return;
          index = 0;
        }
        $text.html('').typist({ speed: 12, text: texts[index] });
      };
      $text.on('end_type.typist', function() {
        $text.typistPause(1000).typistRemove($text.text().length, _next);
    	});
      window.setTimeout(_next, 500);
    },

    remove: function() {
      this.$el.off('inview');
      ComponentView.prototype.remove.call(this);
    }
  },
  {
    template: 'typist'
  });

  Adapt.register('typist', Typist);

  return Typist;
});
