module.exports = {
  teamNames: function (conn, activeFlag) {
    let result = Array();

    const stmt = conn.prepare('SELECT team_id, city_name, team_name ' +
             ' FROM team WHERE is_active = ? ORDER by team_name ASC, city_name ASC ');
    for (const row of stmt.iterate(activeFlag)) {
      result.push({id:row.team_id,
        name:(row.city_name + ' ' + row.team_name),
        is_active:row.is_active});
    }
    return result;
  },
  cardTypesPrograms: function (conn) {
    let result = Array();

    const stmt = conn.prepare('SELECT card_type_id, card_type_name, card_type_abbrev ' +
             ' FROM card_type ORDER by card_type_name ASC');
    for (const row of stmt.iterate()) {
      result.push({id:row.card_type_id, name:row.card_type_name,
        abbrev:row.card_type_abbrev});
    }
    return result;
  }
};
