define(function(require) {
  var ComponentView = require('coreViews/componentView');
  var Adapt = require('coreJS/adapt');
  var $Typist = require('../libraries/jquery.typist.min.js');

  var Typist = ComponentView.extend({
    postRender: function() {
      this.$('.text')
        .css({
          'font-size': this.model.get('fontSize') + 'px'
        })
        // TODO we need to render this without the animation
        .typist({
          speed: 12,
          text: this.model.get('initialText')
        });

      this.setReadyStatus();
      this.$el.on('inview', _.bind(this.inview, this));
    },

    inview: function(event, visible, visiblePartX, visiblePartY) {
      if(!visible || visiblePartX !== 'both' || visiblePartY !== 'both') {
        return;
      }
      this.$el.off('inview');
      this.showText();
    },

    showText: function() {
      var $text = this.$('.text');
      var index = -1;
      var texts = this.model.get('texts');
      var _next = _.bind(function() {
        if(++index === texts.length) {
          index = 0;
          this.onTypistComplete();
        }
        $text.html('').typist({ speed: 12, text: texts[index] });
      }, this);
      $text.on('end_type.typist', function() {
        $text.typistPause(1000).typistRemove($text.text().length, _next);
    	});
      // add a delay before starting
      window.setTimeout(function() {
        $text.typistRemove($text.text().length, _next);
      }, 1500);
    },

    onTypistComplete: function() {
      this.setCompletionStatus();
      if(this.model.get('loop')) {
        return;
      }
      var $text = this.$('.text');
      $text.typistStop();
      $text.html('<p>' + this.model.get('texts').join('</p><p>') + '</p>');
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
