export function buttonComponent() {
    const but = document.createElement('button');
    return but;
}
export function cardComponent() {
    const card = document.querySelector('.movie');
    console.log('in testt ', card);
    if (!card)
        throw new Error('Could not find card element');
    return card;
}
export function modalComponent() {
    const modal = document.querySelector('.form-container');
    console.log(modal);
    if (!modal)
        throw new Error('Modal is not found');
    const clonedModal = modal.cloneNode(true);
    return clonedModal;
}
