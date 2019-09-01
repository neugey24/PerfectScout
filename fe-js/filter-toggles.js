var batter_player_batting_hand_controls = {left:false, right:false, bswitch:false};
var batter_player_throwing_hand_controls = {left:false, right:false};

function toggleBattingHand(handIn) {
  let batter_player_batting_hand = document.querySelector('#batter_player_batting_hand_' + handIn);

  let wasSelected = false;
  if (handIn=='left') {
    wasSelected = batter_player_batting_hand_controls.left;
    batter_player_batting_hand_controls.left = ! batter_player_batting_hand_controls.left;
    if (!wasSelected) {
      batter_player_batting_hand_controls.bswitch = false; batter_player_batting_hand_controls.right = false;
      let removeHand = document.querySelector('#batter_player_batting_hand_bswitch');
      removeHand.classList.remove('fas');
      removeHand.classList.add('far');
      removeHand = document.querySelector('#batter_player_batting_hand_right');
      removeHand.classList.remove('fas');
      removeHand.classList.add('far');
    }
  } else if (handIn=='right') {
    wasSelected = batter_player_batting_hand_controls.right;
    batter_player_batting_hand_controls.right = ! batter_player_batting_hand_controls.right;
    if (!wasSelected) {
      batter_player_batting_hand_controls.left = false; batter_player_batting_hand_controls.bswitch = false;
      let removeHand = document.querySelector('#batter_player_batting_hand_left');
      removeHand.classList.remove('fas');
      removeHand.classList.add('far');
      removeHand = document.querySelector('#batter_player_batting_hand_bswitch');
      removeHand.classList.remove('fas');
      removeHand.classList.add('far');
    }
  } else { // switch
    wasSelected = batter_player_batting_hand_controls.bswitch;
    batter_player_batting_hand_controls.bswitch = ! batter_player_batting_hand_controls.bswitch;
    if (!wasSelected) {
      batter_player_batting_hand_controls.left = false; batter_player_batting_hand_controls.right = false;
      let removeHand = document.querySelector('#batter_player_batting_hand_left');
      removeHand.classList.remove('fas');
      removeHand.classList.add('far');
      removeHand = document.querySelector('#batter_player_batting_hand_right');
      removeHand.classList.remove('fas');
      removeHand.classList.add('far');
    }
  }

  let removeClass = 'far'; let addClass = 'fas';
  if (wasSelected) {
    addClass = 'far'; removeClass = 'fas';
  }
  batter_player_batting_hand.classList.remove(removeClass);
  batter_player_batting_hand.classList.add(addClass);

}

function toggleThrowingHand(handIn) {
  let batter_player_throwing_hand = document.querySelector('#batter_player_throwing_hand_' + handIn);

  let wasSelected = false;
  if (handIn=='left') {
    wasSelected = batter_player_throwing_hand_controls.left;
    batter_player_throwing_hand_controls.left = ! batter_player_throwing_hand_controls.left;
    if (batter_player_throwing_hand_controls.right && batter_player_throwing_hand_controls.left) {
      batter_player_throwing_hand_controls.right = false;
      let changeRight = document.querySelector('#batter_player_throwing_hand_right');
      changeRight.classList.remove('fas');
      changeRight.classList.add('far');
    }
  } else {
    wasSelected = batter_player_throwing_hand_controls.right;
    batter_player_throwing_hand_controls.right = ! batter_player_throwing_hand_controls.right;
    if (batter_player_throwing_hand_controls.right && batter_player_throwing_hand_controls.left) {
      batter_player_throwing_hand_controls.left = false;
      let changeLeft = document.querySelector('#batter_player_throwing_hand_left');
      changeLeft.classList.remove('fas');
      changeLeft.classList.add('far');
    }
  }

  let removeClass = 'far'; let addClass = 'fas';
  if (wasSelected) {
    addClass = 'far'; removeClass = 'fas';
  }
  batter_player_throwing_hand.classList.remove(removeClass);
  batter_player_throwing_hand.classList.add(addClass);

}
