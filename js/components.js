export function buttonComponent() {
  const but = document.createElement('button');
  return but;
}

export function cardComponent() {
  const card = document.querySelector('.movie');
  const clonedCard = card.cloneNode(true);
  return card;
}

export function modalComponent() {
  const modal = document.querySelector('.form-container');
  console.log(modal);
  const clonedModal = modal.cloneNode(true);
  return clonedModal;
}
