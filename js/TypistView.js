import ComponentView from 'core/js/views/componentView';

const CHARACTER_DELAY = 1000 / 12;
const START_DELAY = 1500;
const PAUSE_DELAY = 1000;

class TypistView extends ComponentView {

  preRender() {
    this.timers = [];
    this.model.set({
      _typedText: this.model.get('initialText') ?? '',
      _isFinished: false
    });
  }

  postRender() {
    this.setReadyStatus();
    this.$el.on('inview', this.onInview.bind(this));
  }

  onInview(event, isVisible, visiblePartX, visiblePartY) {
    if (!isVisible || visiblePartX !== 'both' || visiblePartY !== 'both') return;
    this.$el.off('inview');
    if ($('html').hasClass('is-prefers-reduced-motion')) return this.finish();
    this.play();
  }

  async play() {
    const texts = this.model.get('texts') ?? [];
    if (!texts.length) return this.finish();
    await this.wait(START_DELAY);
    do {
      for (const text of texts) {
        await this.erase();
        await this.type(text);
        await this.wait(PAUSE_DELAY);
      }
      this.setCompletionStatus();
    } while (this.model.get('loop'));
    this.finish();
  }

  async type(text) {
    for (let length = 1; length <= text.length; length++) {
      this.model.set('_typedText', text.slice(0, length));
      await this.wait(CHARACTER_DELAY);
    }
  }

  async erase() {
    let text = this.model.get('_typedText');
    while (text.length) {
      text = text.slice(0, -1);
      this.model.set('_typedText', text);
      await this.wait(CHARACTER_DELAY);
    }
  }

  wait(delay) {
    return new Promise(resolve => this.timers.push(setTimeout(resolve, delay)));
  }

  finish() {
    this.model.set('_isFinished', true);
    this.setCompletionStatus();
  }

  remove() {
    this.timers.forEach(clearTimeout);
    this.$el.off('inview');
    super.remove();
  }

}

TypistView.template = 'typist.jsx';

export default TypistView;
