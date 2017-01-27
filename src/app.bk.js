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



// export function App(sources) {
//   const incAction$ = sources.DOM
//     .select('.inc')
//     .events('click')
//     .map(() => 1);

//   const decAction$ = sources.DOM
//     .select('.dec')
//     .events('click')
//     .map(() => -1);



//   const counter$ = xs
//     .merge(incAction$, decAction$)
//     .fold((counter, newVal) => counter + newVal, 0);



//   return {
//     DOM: counter$.map( (counter) =>
//       div([
//         button('.inc', 'Increment'),
//         button('.dec', 'Decrement'),
//         span(`${counter}`)
//       ])
//     )
//   };
// }



function view(state$) {
  return state$.map((state) =>
    div([
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
          li('.todo__item', [
            input('.todo__item-check', {
              props: {
                type: 'checkbox',
                dataset: {
                  id: index,
                },
              },
            }),
            todo.text,
          ]),
        ),
      ),
    button('.todo__delete-all', 'delete all'),
    ]),
  );
}


// function intent(DOMSource) {
//   return {
//     addTodo$: DOMSource.select('.todo__form')
//       .events('submit')
//       .map(ev => ev.preventDea,
//     deleteTodo$: DOMSource.select('.todo__item-check')
//       .events('input')
//       .map((ev) => ({
//         value: ev.target.value,
//         id: ev.target.dataset.id,
//       })),
//   };
// };


// function model(values$) {
//   return values$
//     .map()

// }


// export function App(sources) {
//    const addTodo$ = sources.DOM.select('.todo__form')
//     .events('submit')
//     .map(ev => {
//       const formData = new FormData(ev.target);
//       ev.preventDefault();
//       // return false;
//       return formData.get('text');
//     });

//   const latestDeleteAll$ = sources.DOM.select('.todo__delete-all')
//     .events('click')
//     .last();

//     latestDeleteAll$
//       .addListener(() => console.log('last'))


//   const inputValue$ = sources.DOM.select('.todo__input')
//     .elements()
//     .map(([el]) => {
//       return el && el.value
//     });


//   const todos$ =
//     addTodo$
//     // .compose(dropUntil(latestDeleteAll$))
//     // .compose(sampleCombine(inputValue$))
//     .fold((todos, text) => {
//       return todos.concat([{
//           text,
//       }]);
//     }, []);


//   const state$ = todos$.map(todos => ({
//     todos,
//   }));

//   const vtree$ = view(state$);
//   return {
//     DOM: vtree$
//   };
// }




function model ($addTodo, deleteTodos) {
  const todos$ =
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


  const todos$$ = submit$
    .compose(sampleCombine(input$))
    .map(combinedValues => combinedValues[1])
    .map(([inputEl]) => inputEl && inputEl.value)
    .compose(split(deleteAll$))
    .map(todos$ =>
      todos$.fold((todos, text) =>
        todos.concat([{
          text,
        }]
    ), []));

  const todos$ = todos$$.flatten();

  const state$ = todos$.map(todos => ({
    todos,
  }));

  const vtree$ = view(state$);

  return {
    DOM: vtree$,
  };
}


// export function App(sources) {
//   const input$ = sources.DOM
//     .select('.field')
//     .events('input');

//   const name$ = input$
//     .map(ev => ev.target.value)
//     .startWith('');


//   const sinks = {
//     DOM: name$
//       .map(name =>
//         div([
//           label('Name'),
//           input('.field', {
//             type: 'text',
//           }),
//           hr(),
//           h1(`Hello ${name}!`),
//         ])
//       ),
//   };


//   return sinks;
// }


// export function App(sources) {
//   const dClicks$ = sources.DOM
//     .select('.dicrement')
//     .events('click');

//   const iClicks$ = sources.DOM
//     .select('.increment')
//     .events('click');

//   const dAction$ = dClicks$
//     .map(ev => -1);

//   const iAction$ = iClicks$
//     .map(ev => 1);

//   const num$ = xs.merge(dAction$, iAction$)
//     .fold((num, nVal) => num + nVal, 0);

//   const sinks = {
//     DOM: num$
//       .map( num =>
//         div([
//           button('.dicrement', 'Dicrement'),
//           button('.increment', 'Increment'),
//           p([
//             label(`${num}`)]),
//         ])
//     )
//   };

//   return sinks;
// }
//
//



// export function App(sources) {
//   const getUserClick$ = sources.DOM
//     .select('.get-first')
//     .events('click');

//   const request$ = getUserClick$
//     .map(() => ({
//       url: 'https://jsonplaceholder.typicode.com/users/1',
//       category: 'user',
//       method: 'GET',
//     }));

//   const response$ = sources.HTTP
//     .select('user')
//     .flatten();

//   const firstUser$ = response$
//     .map(response => response.body)
//     .startWith({});


//   return {
//     DOM: firstUser$.map(user =>
//       div([
//         button('.get-first', 'Get First user'),
//         div('.user-details', [
//           h1('.user-name', user.name),
//           h4('.user-email', user.mail),
//         ]),
//       ])
//     ),
//     HTTP: request$,
//   };
// }
//
//
//
//
//

// function intent(DOMSource) {
//   return DOMSource.select('.slider')
//     .events('input')
//     .map((ev) => ev.target.value);
// }

// function model(change$) {
//   return $change
//     .startWith(70);
// }


// function view(state$) {
//   return state$
//     .map((state) =>
//       div('.labeled-slider', [
//         label('.label', ''),
//         input('.weight', {
//           props: {
//             type: 'range',
//             min: 40,
//             max: 150,
//             value: state.weight,
//           },
//         }),
//       ])
//     );
// }


// function mainSlider(sources) {
//   const change$ = intent(sources.DOM);
//   const model$ = model(change$);
//   const vtree$ = view(model$);
//   return {
//     DOM: vtree$
//   };
// }



// function intent(DOMSource) {
//   const weight$ = DOMSource
//     .select('.weight')
//     .events('input')
//     .map(ev => ev.target.value)
//     .startWith(70);

//   const height$ = DOMSource
//     .select('.height')
//     .events('input')
//     .map(ev => ev.target.value)
//     .startWith(170);
//   return { weight$, height$ };
// }

// function model(height$, weight$) {
//   return xs.combine(height$, weight$)
//     .map(([height, weight]) => {
//       const heightMeters = height * 0.01;
//       const bmi = Math.round(weight / (heightMeters * heightMeters));
//       return { bmi, weight, height };
//     });
// }


// function view(state$) {
//   return state$.map((state) => div([
//     div([
//       label('Weight: ' + state.weight + 'kg'),
//       input('.weight', {
//         props: {
//           type: 'range',
//           min: 40,
//           max: 150,
//           value: state.weight,
//         },
//       }),
//     ]),
//     div([
//       label('Height: ' + state.height + 'cm'),
//       input('.height', {
//         props: {
//           type: 'range',
//           min: 140,
//           max: 220,
//           value: state.height,
//         },
//       }),
//     ]),
//     h2('BMI is ' + state.bmi),
//   ]));
// }


// export function App(sources) {
//   const {height$, weight$} = intent(sources.DOM);
//   const state$ = model(height$, weight$);
//   const vtree$ = view(state$);
//   return {
//     DOM: vtree$,
//   };
// }
