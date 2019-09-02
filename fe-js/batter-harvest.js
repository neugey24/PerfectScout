let batterFilters = new Object();

function batterHarvest() {
  batterFilters = new Object();
  
  let current = document.querySelector('#batter_player_first_name');
  if (current.value.trim()!='') {
    batterFilters.batter_player_first_name = current.value;
  }
  current = document.querySelector('#batter_player_last_name');
  if (current.value.trim()!='') {
    batterFilters.batter_player_last_name = current.value;
  }

  processMultiSelect('batter_player_team');
  processMultiSelect('batter_player_prim_pos');
  processSingleSelect('batter_card_type_program');

  let radioItems = document.getElementsByName('batter_card_tier');
  for (var ii=0, radioLength = radioItems.length; ii < radioLength; ii++) {
   if (radioItems[ii].checked) {
     if (radioItems[ii].value !='*') {
       batterFilters.batter_card_tier = radioItems[ii].value;
     }
     break;
   }
  }

  processOnField('batter_card_ovr_min');
  processOnField('batter_card_ovr_max');
  processOnField('batter_card_year_min');
  processOnField('batter_card_year_max');

  processOnField('batter_contact_min');
  processOnField('batter_contact_vs_r_min');
  processOnField('batter_contact_vs_l_min');
  processOnField('batter_gap_min');
  processOnField('batter_gap_vs_r_min');
  processOnField('batter_gap_vs_l_min');
  processOnField('batter_power_min');
  processOnField('batter_power_vs_r_min');
  processOnField('batter_power_vs_l_min');
  processOnField('batter_eye_min');
  processOnField('batter_eye_vs_r_min');
  processOnField('batter_eye_vs_l_min');
  processOnField('batter_avoid-k_min');
  processOnField('batter_avoid-k_vs_r_min');
  processOnField('batter_avoid-k_vs_l_min');

  processOnField('batter_speed_min');
  processOnField('batter_steal_min');
  processOnField('batter_baserunning_min');

  processOnField('batter_sacbunt_min');
  processOnField('batter_bunthit_min');

  processSingleSelect('batter_batted_ball');
  processSingleSelect('batter_groundball_tend');
  processSingleSelect('batter_flyball_tend');

  processOnField('batter_1b_min');
  processOnField('batter_2b_min');
  processOnField('batter_3b_min');
  processOnField('batter_ss_min');
  processOnField('batter_lf_min');
  processOnField('batter_cf_min');
  processOnField('batter_rf_min');
  processOnField('batter_if_range_min');
  processOnField('batter_if_error_min');
  processOnField('batter_if_arm_min');
  processOnField('batter_if_turn_min');
  processOnField('batter_of_range_min');
  processOnField('batter_of_error_min');
  processOnField('batter_of_arm_min');
  processOnField('batter_c_min');
  processOnField('batter_c_ab_min');
  processOnField('batter_c_arm_min');

  if (batter_player_batting_hand_controls.left) {
    batterFilters.batter_player_batting_hand ='left';
  } else if (batter_player_batting_hand_controls.right) {
    batterFilters.batter_player_batting_hand ='right';
  } else if (batter_player_batting_hand_controls.bswitch) {
    batterFilters.batter_player_batting_hand ='switch';
  }

  if (batter_player_throwing_hand_controls.left) {
    batterFilters.batter_player_throwing_hand ='left';
  } else if (batter_player_throwing_hand_controls.right) {
    batterFilters.batter_player_throwing_hand ='right';
  }

  console.log(batterFilters);

}

function processSingleSelect(nameIn) {
  let current = document.querySelector('#' + nameIn);
  let value = current.options[current.selectedIndex].value;
  if (value != '*') {
    eval("batterFilters." + nameIn + "=value;");
  }
}

function processMultiSelect(nameIn) {
  let current = document.querySelector('#' + nameIn);
  let currentLength = current.options.length;
  let teamArray = new Array();
  var iCtr = 0;
  for (var ii=0; ii < currentLength; ii++) {
    if (current.options[ii].selected) {
      teamArray[iCtr++] = current.options[ii].value;
    }
  }
  if (teamArray.length > 0) {
    eval("batterFilters." + nameIn + "=teamArray;");
  }
}

function processOnField(nameIn) {
  let current = document.querySelector('#' + nameIn + '_on');
  let valueField = document.querySelector('#' + nameIn);
  if (current.checked) {
    eval("batterFilters." + nameIn + "='" + valueField.value + "';");
  }
}
