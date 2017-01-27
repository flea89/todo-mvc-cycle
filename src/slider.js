import {
  div,
  input,
  label,
} from '@cycle/dom';
import xs from 'xstream';
import { makeDOMDriver } from '@cycle/dom';

function intent(DOMSource) {
  return DOMSource.select('.slider')
    .events('input')
    .map((ev) => ev.target.value);
}

function model(newValue$, props$) {
  const initValue$ = props$.map(props => props.init).first();
  const value$ = $newValue
    .concat(initValue$);

  return
}


function view(state$) {
  return state$
    .map((state) =>
      div('.labeled-slider', [
        label('.label', ''),
        input('.weight', {
          props: {
            type: 'range',
            min: 40,
            max: 150,
            value: state.weight,
          },
        }),
      ])
    );
}


function main(sources) {
  const change$ = intent(sources.DOM);
  const model$ = model(change$, sources.props);
  const vtree$ = view(model$);
  return {
    DOM: vtree$,
  };
}


const drivers =  {
  DOM: makeDOMDriver('#app'),
  props: () => xs.of({
    label: 'Height',
    unit: 'cm',
    max: 220,
    init: 170,
  }),
};
