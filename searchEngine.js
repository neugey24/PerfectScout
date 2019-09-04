module.exports = {
  executeSearch: function (conn, typeIn, moreTables, moreJoins, clauses, sortBy) {

    let material_columns = ['PC.card_id', 'PC.first_name', 'PC.last_name',
      'PC.card_overall', 'CTIER.tier_abbrev', 'CTYPE.card_type_name',
      'PP.position_abbrev', 'T.team_abbrev'];
    let material_tables = ['player_card PC', 'card_tier CTIER', 'card_type CTYPE',
      'player_position PP', 'team T'];
    moreTables.forEach(function (item, index) {
        material_tables.push(item);
      });

    let material_joins = ['PC.listed_position_id = PP.position_id',
      'PC.team_id = T.team_id', 'PC.card_type_id = CTYPE.card_type_id',
      'PC.tier_id = CTIER.tier_id'];
    moreJoins.forEach(function (item, index) {
          material_joins.push(item);
        });

    let lengthMinusOne = clauses.length - 1;
    let queryData = clauses[lengthMinusOne];
    clauses.pop();

    let queryStr = 'SELECT ' + material_columns.join(', ') + ' FROM ' +
      material_tables.join(', ') + ' WHERE ' + material_joins.join(' AND ') +
      ' AND ' + clauses.join(' AND ')
      ' ORDER BY ' + sortBy;
    //console.log(`QUERY STRING: ${queryStr}`);
    //console.log(`QUERY DATA is: ${queryData.toString()}`);

    const stmt = conn.prepare(queryStr);
    const result = stmt.all(queryData);
    return result;
  },
  buildClauses: function (typeIn, filters) {
    let clauses = new Array();
    let data = new Array();

    for(var currentKey of filters.keys()) {
      let found = true;
      let currentValue = filters.get(currentKey);
      let inBuild = new Array();
      let dataIsArray = false;

      switch(currentKey) {
        case 'batter_player_first_name':
            clauses.push('PC.first_name = ?'); break;
        case 'batter_player_last_name':
            clauses.push('PC.last_name = ?'); break;
        case 'batter_card_ovr_min':
            clauses.push('PC.card_overall >= ?'); break;
        case 'batter_card_ovr_max':
            clauses.push('PC.card_overall <= ?'); break;
        case 'batter_card_year_min':
            clauses.push(`PC.card_year != 'PEAK' AND PC.card_year >= ?`); break;
        case 'batter_card_year_max':
            clauses.push(`PC.card_year != 'PEAK' AND PC.card_year <= ?`); break;
        case 'batter_card_type_program':
            clauses.push('CTYPE.card_type_abbrev = ?'); break;
        case 'batter_player_team':
            currentValue.forEach(function(element) { inBuild.push('?'); });
            dataIsArray = true;
            clauses.push('PC.team_id IN (' + inBuild.join(',') + ')'); break;
        case 'batter_player_prim_pos':
            currentValue.forEach(function(element) { inBuild.push('?'); });
            dataIsArray = true;
            clauses.push('PP.position_abbrev IN (' + inBuild.join(',') + ')'); break;
        case 'batter_card_tier':
            clauses.push('CTIER.tier_abbrev = ?'); break;

        case 'batter_contact_min':
            clauses.push('BR.contact >= ?'); break;
        case 'batter_contact_vs_r_min':
            clauses.push('BR.contact_vs_r >= ?'); break;
        case 'batter_contact_vs_l_min':
            clauses.push('BR.contact_vs_l >= ?'); break;
        case 'batter_gap_min':
            clauses.push('BR.gap >= ?'); break;
        case 'batter_gap_vs_r_min':
            clauses.push('BR.gap_vs_r >= ?'); break;
        case 'batter_gap_vs_l_min':
            clauses.push('BR.gap_vs_l >= ?'); break;
        case 'batter_power_min':
            clauses.push('BR.power >= ?'); break;
        case 'batter_power_vs_r_min':
            clauses.push('BR.power_vs_r >= ?'); break;
        case 'batter_power_vs_l_min':
            clauses.push('BR.power_vs_l >= ?'); break;
        case 'batter_eye_min':
            clauses.push('BR.eye >= ?'); break;
        case 'batter_eye_vs_r_min':
            clauses.push('BR.eye_vs_r >= ?'); break;
        case 'batter_eye_vs_l_min':
            clauses.push('BR.eye_vs_l >= ?'); break;
        case 'batter_avoid-k_min':
            clauses.push('BR.avoid_k >= ?'); break;
        case 'batter_avoid-k_vs_r_min':
            clauses.push('BR.avoid_k_vs_r >= ?'); break;
        case 'batter_avoid-k_vs_l_min':
            clauses.push('BR.avoid_k_vs_l >= ?'); break;
        case 'batter_speed_min':
            clauses.push('BR.speed >= ?'); break;
        case 'batter_steal_min':
            clauses.push('BR.steal >= ?'); break;
        case 'batter_baserunning_min':
            clauses.push('BR.baserunning >= ?'); break;
        case 'batter_baserunning_min':
            clauses.push('BR.baserunning >= ?'); break;
        case 'batter_sacbunt_min':
            clauses.push('BR.sac_bunt >= ?'); break;
        case 'batter_bunthit_min':
            clauses.push('BR.bunt_for_hit >= ?'); break;

        case 'batter_if_range_min':
            clauses.push('PR.inf_range >= ?'); break;
        case 'batter_if_error_min':
            clauses.push('PR.inf_error >= ?'); break;
        case 'batter_if_arm_min':
            clauses.push('PR.inf_arm >= ?'); break;
        case 'batter_if_turn_min':
            clauses.push('PR.inf_turn >= ?'); break;
        case 'batter_of_range_min':
            clauses.push('PR.of_range >= ?'); break;
        case 'batter_of_error_min':
            clauses.push('PR.of_error >= ?'); break;
        case 'batter_of_arm_min':
            clauses.push('PR.of_arm >= ?'); break;
        case 'batter_c_ab_min':
            clauses.push('PR.catcher_ability >= ?'); break;
        case 'batter_c_arm_min':
            clauses.push('PR.catcher_arm >= ?'); break;


        // more later

        default: found = false; break;

      } // end switch

      if (found) {
        if (dataIsArray) {
          currentValue.forEach(function(element) { data.push(element); });
        } else {
          data.push(currentValue);
        }

      }


    } // end for keys

    // shove data array in last element of buildClauses
    clauses.push(data);
    //console.log('all the clauses: ' + clauses.toString());
    return clauses;

  },
  buildAdditionalTables: function (typeIn, filters) {
    let tables = new Array();

    for(var currentKey of filters.keys()) {

      switch(currentKey) {
        case 'joinToPositionRatings':
          if (filters.get(currentKey)) {
            tables.push('position_ratings PR');
          } break;
        case 'joinToBatterRatings':
          if (filters.get(currentKey)) {
            tables.push('batter_ratings BR');
          } break;
        default: break;
      } // end switch
    } // end for keys
    return tables;
  },
  buildAdditionalJoins: function (tablesIn) {
    let joins = new Array();
    tablesIn.forEach(function (table, index) {
      switch(table) {
        case 'position_ratings PR':
          joins.push('PC.card_id = PR.card_id'); break;
        case 'batter_ratings BR':
          joins.push('PC.card_id = BR.card_id'); break;
        default: break;
      } // end switch
    });

    return joins;
  }
};
