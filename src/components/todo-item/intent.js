export default function model(DOMSource) {
  const completed$ = DOMSource.select('.toggle')
    .events('click')
    .fold((completed) => !!!completed, false);

  const clear$ = DOMSource.select('.destroy')
    .events('click');

  return {
    completed$,
    clear$,
  };
}

