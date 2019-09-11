var batterFilters = new Map();

function batterHarvest() {
  batterFilters.clear();
  batterFilters.set('joinToBatterRatings', false);
  batterFilters.set('joinToPositionRatings', false);

  let current = document.querySelector('#batter_player_first_name');
  if (current.value.trim()!='') {
    batterFilters.set('batter_player_first_name', current.value.trim());
  }
  current = document.querySelector('#batter_player_last_name');
  if (current.value.trim()!='') {
    batterFilters.set('batter_player_last_name', current.value.trim());
  }

  processMultiSelect('batter_player_team_current');
  processMultiSelect('batter_player_team_historical');
  processMultiSelect('batter_card_type_program');

  if (gPositionArray.length > 0 ) {
    batterFilters.set('batter_player_prim_pos', gPositionArray);
  }


  let radioItems = document.getElementsByName('batter_card_tier');
  for (var ii=0, radioLength = radioItems.length; ii < radioLength; ii++) {
   if (radioItems[ii].checked) {
     if (radioItems[ii].value !='*') {
       batterFilters.set('batter_card_tier', radioItems[ii].value);
     }
     break;
   }
  }

  processOnField('batter_card_ovr_min');
  processOnField('batter_card_ovr_max');
  sanityCheckMinMax('batter_card_ovr');

  processOnField('batter_card_year_min');
  processOnField('batter_card_year_max');
  sanityCheckMinMax('batter_card_year');

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
  processOnField('batter_avoid_k_min');
  processOnField('batter_avoid_k_vs_r_min');
  processOnField('batter_avoid_k_vs_l_min');

  processOnField('batter_speed_min');
  processOnField('batter_steal_min');
  processOnField('batter_baserunning_min');

  processOnField('batter_sac_bunt_min');
  processOnField('batter_bunthit_min');

  processOnField('batter_if_range_min');
  processOnField('batter_if_error_min');
  processOnField('batter_if_arm_min');
  processOnField('batter_if_turn_min');
  processOnField('batter_of_range_min');
  processOnField('batter_of_error_min');
  processOnField('batter_of_arm_min');
  processOnField('batter_c_ab_min');
  processOnField('batter_c_arm_min');

  if (batter_player_batting_hand_controls.left) {
    batterFilters.set('batter_player_batting_hand', 'L');
  } else if (batter_player_batting_hand_controls.right) {
    batterFilters.set('batter_player_batting_hand', 'R');
  } else if (batter_player_batting_hand_controls.bswitch) {
    batterFilters.set('batter_player_batting_hand', 'S');
  }

  if (batter_player_throwing_hand_controls.left) {
    batterFilters.set('batter_player_throwing_hand', 'L');
  } else if (batter_player_throwing_hand_controls.right) {
    batterFilters.set('batter_player_throwing_hand', 'R');
  }

  //console.log('batter filters: ' + batterFilters);
  //batterFilters.forEach(mapToConsole);

  return batterFilters;

}

function sanityCheckMinMax(fieldPrefixIn) {
  // if max is equal or less to the min and is contradictory, throw
  // away the max value for search filtering
  var minField = batterFilters.get(fieldPrefixIn + '_min');
  var maxField = batterFilters.get(fieldPrefixIn + '_max');
  if (minField !=null && maxField != null && maxField <= minField) {
    batterFilters.delete(fieldPrefixIn + '_max');
  }
}

function mapToConsole(value, key) {
   //console.log(key + ':' + value);
}

function processSingleSelect(nameIn) {
  let current = document.querySelector('#' + nameIn);
  let value = current.options[current.selectedIndex].value;
  if (value != '*') {
    batterFilters.set(nameIn, value);
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
    batterFilters.set(nameIn, teamArray);
  }
}

function processOnField(nameIn) {
  //alert(nameIn);
  let current = document.querySelector('#' + nameIn + '_on');
  let valueField = document.querySelector('#' + nameIn);
  if (current.checked) {
    batterFilters.set(nameIn, valueField.value);
    if (nameIn.includes("arm") || nameIn.includes("error") ||
      nameIn.includes("range") || nameIn.includes("turn") ||
      nameIn.includes("c_ab")) {
        batterFilters.set('joinToPositionRatings', true);
      } else if (nameIn.includes("ovr") || nameIn.includes("year")) {

      } else {
        batterFilters.set('joinToBatterRatings', true);
      }

  }
}
