import components from 'core/js/components';
import TypistView from './TypistView';
import TypistModel from './TypistModel';

export default components.register('typist', {
  model: TypistModel,
  view: TypistView
});
