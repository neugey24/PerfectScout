var batter_player_batting_hand_controls = {left:false, right:false, bswitch:false};
var batter_player_throwing_hand_controls = {left:false, right:false};

function toggleHandGraphic(idIn, direction, groupName, updateGroup) {
  let hand = document.querySelector('#' + idIn);
  hand.classList.remove(direction == 'remove' ? 'fas' : 'far');
  hand.classList.add(direction == 'remove' ? 'far' : 'fas');

  if (updateGroup) {
    var posGroup = gFilterGroup.get('hand');
    if (groupName=='batting_hand' && posGroup.length < 2 && ( batter_player_batting_hand_controls.left==true ||
      batter_player_batting_hand_controls.right==true || batter_player_batting_hand_controls.bswitch==true)) {
      posGroup.push(groupName);
    } else if (groupName=='batting_hand' && ( batter_player_batting_hand_controls.left==false &&
      batter_player_batting_hand_controls.right==false && batter_player_batting_hand_controls.bswitch==false)) {
      var itemIndex = posGroup.indexOf(groupName);
      posGroup.splice(itemIndex, 1);
    } else if (groupName=='throwing_hand' && posGroup.length < 2 && ( batter_player_throwing_hand_controls.left==true ||
      batter_player_throwing_hand_controls.right==true)) {
      posGroup.push(groupName);
    } else if (groupName=='throwing_hand' && ( batter_player_throwing_hand_controls.left==false &&
      batter_player_throwing_hand_controls.right==false)) {
      var itemIndex = posGroup.indexOf(groupName);
      posGroup.splice(itemIndex, 1);
    }
    updateCountDisplay('hand');
  }

}

function toggleBattingHand(handIn) {
  let wasSelected = false;
  if (handIn=='left') {
    wasSelected = batter_player_batting_hand_controls.left;
    batter_player_batting_hand_controls.left = ! batter_player_batting_hand_controls.left;
    if (!wasSelected) {
      batter_player_batting_hand_controls.bswitch = false; batter_player_batting_hand_controls.right = false;
      toggleHandGraphic('batter_player_batting_hand_bswitch', 'remove', 'batting_hand', false);
      toggleHandGraphic('batter_player_batting_hand_right', 'remove', 'batting_hand', false);
    }
  } else if (handIn=='right') {
    wasSelected = batter_player_batting_hand_controls.right;
    batter_player_batting_hand_controls.right = ! batter_player_batting_hand_controls.right;
    if (!wasSelected) {
      batter_player_batting_hand_controls.left = false; batter_player_batting_hand_controls.bswitch = false;
      toggleHandGraphic('batter_player_batting_hand_left', 'remove', 'batting_hand', false);
      toggleHandGraphic('batter_player_batting_hand_bswitch', 'remove', 'batting_hand', false);
    }
  } else { // switch
    wasSelected = batter_player_batting_hand_controls.bswitch;
    batter_player_batting_hand_controls.bswitch = ! batter_player_batting_hand_controls.bswitch;
    if (!wasSelected) {
      batter_player_batting_hand_controls.left = false; batter_player_batting_hand_controls.right = false;
      toggleHandGraphic('batter_player_batting_hand_left', 'remove', 'batting_hand', false);
      toggleHandGraphic('batter_player_batting_hand_right', 'remove', 'batting_hand', false);
    }
  }

  toggleHandGraphic('batter_player_batting_hand_' + handIn, wasSelected ? 'remove' : 'add', 'batting_hand', true);
}

function toggleThrowingHand(handIn) {
  let batter_player_throwing_hand = document.querySelector('#batter_player_throwing_hand_' + handIn);

  let wasSelected = false;
  if (handIn=='left') {
    wasSelected = batter_player_throwing_hand_controls.left;
    batter_player_throwing_hand_controls.left = ! batter_player_throwing_hand_controls.left;
    if (batter_player_throwing_hand_controls.right && batter_player_throwing_hand_controls.left) {
      batter_player_throwing_hand_controls.right = false;
      toggleHandGraphic('batter_player_throwing_hand_right', 'remove', 'throwing_hand', false);
    }
  } else {
    wasSelected = batter_player_throwing_hand_controls.right;
    batter_player_throwing_hand_controls.right = ! batter_player_throwing_hand_controls.right;
    if (batter_player_throwing_hand_controls.right && batter_player_throwing_hand_controls.left) {
      batter_player_throwing_hand_controls.left = false;
      toggleHandGraphic('batter_player_throwing_hand_left', 'remove', 'throwing_hand', false);
    }
  }

  toggleHandGraphic('batter_player_throwing_hand_' + handIn, wasSelected ? 'remove' : 'add', 'throwing_hand', true);
}

function toggleDiamondPosition(posIn) {
  var link = document.querySelector('#pos_' + posIn.toLowerCase());
  var idx = gPositionArray.indexOf(posIn);
  if (gPositionArray.indexOf(posIn) > -1) {
    gPositionArray.splice(idx, 1);
  } else {
    gPositionArray.push(posIn);
  }
  link.classList.toggle('pos-toggled');

  var posGroup = gFilterGroup.get('position');
  if (gPositionArray.length > 0 && posGroup.length==0 ) {
    posGroup.push('position');
  } else if (gPositionArray.length==0) {
    posGroup.splice(0, 1);
  }
  updateCountDisplay('position');
}

function toggleCardTier(tierIn) {
  var card = document.querySelector('#batter_card_tier_' + tierIn);
  card.classList.toggle('hl-show');
  var allWithHl = document.querySelectorAll('.hl-show');
  var posGroup = gFilterGroup.get('card_tier');
  if (posGroup.length==0 && allWithHl.length > 0) {
    posGroup.push('card_tier');
  } else if (posGroup.length==1 && allWithHl.length == 0) {
    posGroup.splice(0, 1);
  }

  updateCountDisplay('card_tier');
}

function rangeChange(sliderIn, groupName) {

  let label = document.querySelector('#' + sliderIn.id + '_output');
  label.innerHTML = sliderIn.value;

  let toggle = document.querySelector('#' + sliderIn.id + '_on');
  toggle.checked = 'checked';

  var posGroup = gFilterGroup.get(groupName);
  var itemIndex = posGroup.indexOf(sliderIn.id);
  if (itemIndex == -1) {
    posGroup.push(sliderIn.id);
  }
  updateCountDisplay(groupName);
}

function rangeChangeUse(useControlIn, sliderName, groupName) {
  var posGroup = gFilterGroup.get(groupName);
  var itemIndex = posGroup.indexOf(sliderName);
  if (itemIndex == -1 && useControlIn.checked) {
    posGroup.push(sliderName);
  } else if (itemIndex > -1 && useControlIn.checked==false) {
    posGroup.splice(itemIndex, 1);
  }
  updateCountDisplay(groupName);
}
