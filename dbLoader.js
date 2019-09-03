module.exports = {
  teamNames: function (conn) {
    let result = Array();

    const stmt = conn.prepare('SELECT team_id, city_name, team_name, is_active ' +
             ' FROM team ORDER by team_name ASC, city_name ASC');
    for (const row of stmt.iterate()) {
      result.push({id:row.team_id,
        name:(row.city_name + ' ' + row.team_name),
        is_active:row.is_active});
    }
    return result;
  },
  bar: function () {
    // whatever
  }
};
