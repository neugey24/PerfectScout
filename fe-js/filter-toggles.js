var batter_player_batting_hand_controls = {left:false, right:false, bswitch:false};
var batter_player_throwing_hand_controls = {left:false, right:false};

function toggleHandGraphic(idIn, direction) {
  let hand = document.querySelector('#' + idIn);
  hand.classList.remove(direction == 'remove' ? 'fas' : 'far');
  hand.classList.add(direction == 'remove' ? 'far' : 'fas');
}

function toggleBattingHand(handIn) {
  let wasSelected = false;
  if (handIn=='left') {
    wasSelected = batter_player_batting_hand_controls.left;
    batter_player_batting_hand_controls.left = ! batter_player_batting_hand_controls.left;
    if (!wasSelected) {
      batter_player_batting_hand_controls.bswitch = false; batter_player_batting_hand_controls.right = false;
      toggleHandGraphic('batter_player_batting_hand_bswitch', 'remove');
      toggleHandGraphic('batter_player_batting_hand_right', 'remove');
    }
  } else if (handIn=='right') {
    wasSelected = batter_player_batting_hand_controls.right;
    batter_player_batting_hand_controls.right = ! batter_player_batting_hand_controls.right;
    if (!wasSelected) {
      batter_player_batting_hand_controls.left = false; batter_player_batting_hand_controls.bswitch = false;
      toggleHandGraphic('batter_player_batting_hand_left', 'remove');
      toggleHandGraphic('batter_player_batting_hand_bswitch', 'remove');
    }
  } else { // switch
    wasSelected = batter_player_batting_hand_controls.bswitch;
    batter_player_batting_hand_controls.bswitch = ! batter_player_batting_hand_controls.bswitch;
    if (!wasSelected) {
      batter_player_batting_hand_controls.left = false; batter_player_batting_hand_controls.right = false;
      toggleHandGraphic('batter_player_batting_hand_left', 'remove');
      toggleHandGraphic('batter_player_batting_hand_right', 'remove');
    }
  }

  toggleHandGraphic('batter_player_batting_hand_' + handIn, wasSelected ? 'remove' : 'add');
}

function toggleThrowingHand(handIn) {
  let batter_player_throwing_hand = document.querySelector('#batter_player_throwing_hand_' + handIn);

  let wasSelected = false;
  if (handIn=='left') {
    wasSelected = batter_player_throwing_hand_controls.left;
    batter_player_throwing_hand_controls.left = ! batter_player_throwing_hand_controls.left;
    if (batter_player_throwing_hand_controls.right && batter_player_throwing_hand_controls.left) {
      batter_player_throwing_hand_controls.right = false;
      toggleHandGraphic('batter_player_throwing_hand_right', 'remove');
    }
  } else {
    wasSelected = batter_player_throwing_hand_controls.right;
    batter_player_throwing_hand_controls.right = ! batter_player_throwing_hand_controls.right;
    if (batter_player_throwing_hand_controls.right && batter_player_throwing_hand_controls.left) {
      batter_player_throwing_hand_controls.left = false;
      toggleHandGraphic('batter_player_throwing_hand_left', 'remove');
    }
  }

  toggleHandGraphic('batter_player_throwing_hand_' + handIn, wasSelected ? 'remove' : 'add');
}
