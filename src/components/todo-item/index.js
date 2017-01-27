import isolate from '@cycle/isolate';
import view from './view';
import intent from './intent';
import model from './model';
// import xs from 'xstream';


function TodoItem_(sources) {
  const actions = intent(sources.DOM);
  const context$ = model(sources.props$, actions);
  const vtree$ = view(context$);

  return {
    DOM: vtree$,
    actions,
    context$,
  };
}


export default function TodoItem(sources) {
  return isolate(TodoItem_)(sources);
}
