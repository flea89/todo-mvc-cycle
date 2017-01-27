import {
  button,
  div,
  h1,
  h2,
  h4,
  ul,
  li,
  hr,
  form,
  input,
  label,
  p,
} from '@cycle/dom';
import xs from 'xstream';
import sampleCombine from 'xstream/extra/sampleCombine';
import dropUntil from 'xstream/extra/dropUntil';
import split from 'xstream/extra/split';
import TodoItem from './components/todo-item/index';


function view(state$) {
  return state$.map((state) => {
    console.log(state);
    return div([
      form('.todo__form', [
        input('.todo__input', {
          props: {
            type: 'text',
            name: 'text',
          },
          hook: {
            update(oldNode, { elm }) {
              elm.value = '';
            },
          },
        }),
      ]),
      ul('.todo__container',
        state.todos.map((todo, index) =>
          todo.DOM.last()
        ),
      ),
    button('.todo__delete-all', 'delete all'),
    ]);
  });
}


export function App(sources) {
  const submit$ = sources.DOM.select('.todo__form')
  .events('submit')
  .map(ev => {
    ev.preventDefault();
    return true;
  });

  const input$ = sources.DOM
    .select('.todo__input')
    .elements();

  const deleteAll$ = sources.DOM.select('.todo__delete-all')
    .events('click');


  const todosTexts$$ = submit$
    .compose(sampleCombine(input$))
    .map(combinedValues => combinedValues[1])
    .map(([inputEl]) => inputEl && inputEl.value)
    .compose(split(deleteAll$))
    .map(todos$ =>
      todos$.fold((todos, text) =>
        todos.concat([ 
          TodoItem({
            props$: xs.of({
              title: text
            }),
          DOM: sources.DOM
        })]
    ), []));

  const todos$ = todosTexts$$.flatten();

    console.log(todos$)

  const state$ = todos$.map(todos => ({
    todos,
  }));

  const vtree$ = view(state$);

  return {
    DOM: vtree$,
  };
}