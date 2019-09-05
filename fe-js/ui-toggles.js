let currentRatingGroup = {'bat':'contact', 'fld':'if_sk'};
let sr_ids = new Array();

function toggleRatingGroup(selectItem, group) {
  let current = document.querySelector('#' + selectItem.id);
  let currentValue = current.options[current.selectedIndex].value;
  if (currentValue != currentRatingGroup[group]) {
    let changer = document.querySelector('#' + selectItem.id + '_' + currentRatingGroup[group]);
    changer.style.display = 'none';
    currentRatingGroup[group] = currentValue;
    changer = document.querySelector('#' + selectItem.id + '_' + currentRatingGroup[group]);
    changer.style.display = 'block';
  }

}

function psUIReady() {
  var accordions = bulmaAccordion.attach();
}

function toggleModal() {
  let modalWindow = document.querySelector('.modal');

  modalWindow.classList.toggle('is-clipped');
  modalWindow.classList.toggle('is-active');
}
