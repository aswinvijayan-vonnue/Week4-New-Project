export function buttonComponent(): HTMLButtonElement {
  const but = document.createElement('button');
  return but;
}

export function cardComponent(): HTMLElement {
  const card = document.querySelector<HTMLElement>('.movie');
  console.log('in testt ', card);
  if (!card) throw new Error('Could not find card element');
  return card;
}

export function modalComponent() {
  const modal = document.querySelector<HTMLElement>('.form-container');
  console.log(modal);
  if (!modal) throw new Error('Modal is not found');
  const clonedModal = modal.cloneNode(true) as HTMLElement;
  return clonedModal;
}
