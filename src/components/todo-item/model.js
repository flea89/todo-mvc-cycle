import xs from 'xstream';

export default function model(props$, actions) {
    // return completed$.map((completed) => ({
    //   completed,
    //   title:
    // }))
    // title$: props$.map((props) => props.title),
    // completed: actions.completed$
  return props$.map(prop =>
    actions.completed$.map(completed => ({
      completed,
      title: prop.title,
    }))
  )
  .flatten();
}
