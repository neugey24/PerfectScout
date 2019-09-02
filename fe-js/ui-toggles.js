let currentRatingGroup = {'bat':'contact', 'fld':'if_pos'};

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
