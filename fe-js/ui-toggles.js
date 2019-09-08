let gPositionArray = new Array();
let gCurrentFilter = 'new';
let gFilterGroup = new Map(); // map of groupName -> array of Field names
gFilterGroup.set('name', new Array());
gFilterGroup.set('team', new Array());
gFilterGroup.set('position', new Array());
gFilterGroup.set('hand', new Array());
gFilterGroup.set('ovr', new Array());
gFilterGroup.set('card_tier', new Array());
gFilterGroup.set('card_type', new Array());
gFilterGroup.set('card_year', new Array());
gFilterGroup.set('contact', new Array());
gFilterGroup.set('gap', new Array());
gFilterGroup.set('power', new Array());
gFilterGroup.set('eye', new Array());
gFilterGroup.set('avoid_k', new Array());
gFilterGroup.set('running', new Array());
gFilterGroup.set('bunting', new Array());
gFilterGroup.set('infield', new Array());
gFilterGroup.set('outfield', new Array());
gFilterGroup.set('catcher', new Array());

function toggleFilter(selectedFilterIn) {
  if (selectedFilterIn != gCurrentFilter) {
    let currentHandle = document.querySelector('#filter_toggle_' + gCurrentFilter);
    currentHandle.classList.toggle('ps-active');
    currentHandle = document.querySelector('#filter_' + gCurrentFilter);
    currentHandle.style.display = 'none';
    currentHandle = document.querySelector('#filter_toggle_' + selectedFilterIn);
    currentHandle.classList.toggle('ps-active');
    currentHandle = document.querySelector('#filter_' + selectedFilterIn);
    currentHandle.style.display = 'block';
    gCurrentFilter = selectedFilterIn;
  }
}

function filterCountUpdate(fieldTypeIn, fieldName, groupNameIn, currentValue) {
  var group = gFilterGroup.get(groupNameIn);
  if (fieldTypeIn =='text') {
    var trimField = document.querySelector('#' + fieldName);
    trimField.value = trimField.value.trim();
    var itemIndex = group.indexOf(fieldName);
    if (trimField.value == null || trimField.value == '') {
      if (itemIndex > -1) {
        group.splice(itemIndex,1);
      }
    } else {
      if (itemIndex == -1) {
        group.push(fieldName);
      }
    }

  } else if (fieldTypeIn =='multiselect') {
    var selectField = document.querySelector('#' + fieldName);
    let currentLength = selectField.options.length;
    var atLeastOneSelected = false;
    for (var ii=0; ii < currentLength; ii++) {
      if (selectField.options[ii].selected) {
        atLeastOneSelected = true; break;
      }
    }
    var itemIndex = group.indexOf(fieldName);
    if (!atLeastOneSelected) {
      if (itemIndex > -1) {
        group.splice(itemIndex,1);
      }
    } else {
      if (itemIndex == -1) {
        group.push(fieldName);
      }
    }


  }

  updateCountDisplay(groupNameIn);
}

function updateCountDisplay(nameIn) {
  var group = gFilterGroup.get(nameIn);
  var ctrField = document.querySelector('#filter_count_' + nameIn);
  ctrField.innerHTML = (group.length==0) ? '' : '&nbsp;' + group.length + '&nbsp;';
}


function clearSelections(fieldIn, groupNameIn) {
  var group = gFilterGroup.get(groupNameIn);
  var field = document.querySelector('#' + fieldIn);
  var fieldLength = field.options.length;
  for (xx=0; xx <fieldLength; xx++) {
    field.options[xx].selected = false;
  }
  var itemIndex = group.indexOf(fieldIn);
  if (itemIndex > -1) {
    group.splice(itemIndex,1);
  }
  updateCountDisplay(groupNameIn);
}






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
