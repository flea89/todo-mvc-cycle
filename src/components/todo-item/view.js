import { div, input, label, button, li} from '@cycle/dom';;

export default function View(context$) {
  return context$.map(context =>
    li('.todoRoot', { class: context.completed ? 'completed' : '' }, [
      div('.view', [
        input('.toggle', {
          props: {
            type: 'checkbox',
            checked: context.todo.completed,
          },
        }),
        context.todo.text,
        button('.destroy'),
      ]),
    ])
  );
}
