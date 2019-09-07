module.exports = {
  retrieve: function (conn, card_id, spot) {
    let queryStr =
    'SELECT PC.card_id, PC.first_name, PC.last_name, ' +
      'PC.batting_hand, PC.throwing_hand, PC.card_overall, PC.card_year, ' +
      'CTIER.tier_abbrev, CTYPE.card_type_name, PP.position_abbrev, ' +
      'T.city_name, T.team_name, BR.*, PR.*, ? AS comparison_spot ' +
    'FROM player_card PC, card_tier CTIER, card_type CTYPE, ' +
      'player_position PP, team T, position_ratings PR, batter_ratings BR ' +
    'WHERE PC.listed_position_id = PP.position_id AND ' +
      'PC.team_id = T.team_id AND PC.card_type_id = CTYPE.card_type_id AND ' +
      'PC.tier_id = CTIER.tier_id AND PC.card_id = PR.card_id AND ' +
      'PC.card_id = BR.card_id AND PC.card_id = ?';
    const stmt = conn.prepare(queryStr);
    const result = stmt.get(spot, card_id);
    return result;
  }
};
