#!/usr/local/bin/node
const fs = require('fs');
const csv = require('fast-csv');

console.log('*** PerfectScout utility - load data from csv file into PS database.');

// load arguments into args as indexed array
const [,, ... args] = process.argv

if (args.length == 0) {
  throw new Error('CSV input file required as first argument.');
}
const csvFile = args[0];
console.log(`- using CSV file: ${csvFile}`);

fs.access(csvFile, fs.constants.F_OK, (err) => {
  if (err) throw err;
});
fs.access(csvFile, fs.constants.R_OK, (err) => {
  if (err) throw err;
});

/*
let db = new sqlite3.Database('../../db/ps.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Connected to the PerfectScout database.');
});
*/
function printMe(value, key) {
   console.log(key + ':' + value);
}

const Sqlite3Database = require('better-sqlite3');
const psDBConn = new Sqlite3Database('../../db/ps.db', { verbose: console.log });

// card types
let teamsXref = loadTeamXref();
console.log(`${teamsXref.size} teams loaded.`);
//teamsXref.forEach(printMe);

// card types
let cardTypesXref = loadCardTypesXref();
console.log(`${cardTypesXref.size} card types loaded.`);
//cardTypesXref.forEach(printMe);


// player position
let positionXref = loadPositionXref();
console.log(`${positionXref.size} card types loaded.`);
//positionXref.forEach(printMe);

// card tier
let tierXref = loadTierXref();
console.log(`${tierXref.size} card types loaded.`);
//tierXref.forEach(printMe);


function loadTeamXref() {
    var dataMap = new Map();
    const stmt = psDBConn.prepare('SELECT team_id, city_name, team_name FROM team');
    for (const row of stmt.iterate()) {
      dataMap.set(row.city_name + ' ' + row.team_name, row.team_id);
    }
    return dataMap;
}

function loadCardTypesXref() {
  var dataMap = new Map();
  const stmt = psDBConn.prepare('SELECT card_type_id, import_name FROM card_type');
  for (const row of stmt.iterate()) {
    dataMap.set(row.import_name, row.card_type_id);
  }
  return dataMap;
}

function loadPositionXref() {
  var dataMap = new Map();
  const stmt = psDBConn.prepare('SELECT position_id, position_abbrev FROM player_position');
  for (const row of stmt.iterate()) {
    dataMap.set(row.position_abbrev, row.position_id);
  }
  return dataMap;
}


function loadTierXref() {
  var dataMap = new Map();
  const stmt = psDBConn.prepare('SELECT tier_id, tier_abbrev FROM card_tier');
  for (const row of stmt.iterate()) {
    dataMap.set(row.tier_abbrev, row.tier_id);
  }
  return dataMap;
}

fs.createReadStream(csvFile).pipe(csv.parse({ headers: true })).on('data', (row) => {
    if (row.card_title!='') {
      runCurrentImport(row);
    }
  })
  .on('end', () => {
    console.log('- CSV end of file reached.');
  });

function runCurrentImport(row) {
  importDataRow(row);
  //importTeamNamesOnly(row);
}

function getTierFromOverall(ovr) {
  var result = 'UNKNOWN';
  var ovrLook = ovr - 0;
  if (ovrLook < 60) {
    result = 'i';
  } else if (ovrLook < 70) {
    result = 'b';
  } else if (ovrLook < 80) {
    result = 's';
  } else if (ovrLook < 90) {
    result = 'g';
  } else if (ovrLook < 100) {
    result = 'd';
  } else if (ovrLook == 100) {
    result = 'p';
  }
  return result;
}

function importDataRow(row) {
  //let look = JSON.stringify(row);
  //console.log(`my row:${look}`);
  let titleParts = row.card_title.split('  ');
  let posNameParts = titleParts[1].split(' ');
  let usePos = posNameParts[0];
  let insFirstName = posNameParts[1];
  let insLastName = (posNameParts.length > 3) ? posNameParts[2] + ' ' + posNameParts[3] : posNameParts[2];

  let insCardYear = titleParts[3];
  let insCardOverall = row.card_overall;

  let insCardTypeId = cardTypesXref.get(titleParts[0]);
  let insTeamId = teamsXref.get(row.team);
  let insTierId = tierXref.get(getTierFromOverall(insCardOverall));
  let insPositionId = positionXref.get(usePos);

  let insBattingHand =row.bats;
  let insThrowingHand =row.throws;
  let insImportId = row.card_id;

  //console.log(`${insCardTypeId} : ${insTeamId} : ${insTierId} : ${insPositionId}`);
  //console.log(`${insFirstName} : ${insLastName} : ${insCardYear} : ${insCardOverall}`);
  //console.log(`${insBattingHand} : ${insThrowingHand} : ${insImportId}`);

  // Ignore pitchers for CSV import
  //console.log('usePos' + usePos);
  if (usePos=='SP' || usePos=='RP' || usePos=='CL') {
    return;
  }

  //console.log('card type' + (insCardTypeId - 0 ));
  // Ignore live cards for CSV import
  if ((insCardTypeId - 0 ) == 2) {
    return;
  }

  // done for now, comment out to avoid accidental insert
/*
  var stmt = psDBConn.prepare('INSERT INTO player_card ' +
  ' (import_id, card_type_id, team_id, first_name, last_name, ' +
  ' listed_position_id, batting_hand, throwing_hand, card_overall, tier_id, card_year) ' +
  ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  var info = stmt.run(insImportId, insCardTypeId, insTeamId, insFirstName, insLastName,
    insPositionId, insBattingHand, insThrowingHand, insCardOverall,
    insTierId, insCardYear);
  var currentCardId = info.lastInsertRowid;

  console.log(`player_card record inserted, last row id ${currentCardId}`);

  stmt = psDBConn.prepare('INSERT INTO batter_ratings ' +
  ' (card_id, contact, gap, power, eye, avoid_k, contact_vs_r, gap_vs_r, power_vs_r, ' +
  ' eye_vs_r, avoid_k_vs_r, contact_vs_l, gap_vs_l, power_vs_l, eye_vs_l, avoid_k_vs_l, ' +
  ' speed, steal, baserunning, sac_bunt, bunt_for_hit )' +
  ' VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?,  ?)');
  info = stmt.run(currentCardId, row.ContactOvr, row.GapOvr, row.PowerOvr, row.EyeOvr,
    row.KsOvr, row.ContractvRr, row.GapvRr, row.PowervR, row.EyevR, row.KsvR,
    row.ContactvL, row.GapvL, row.PowervL, row.EyevL, row.AvoidKvL, row.speed,
    row.steal, row.running, row.sacbunt, row.buntfhit);

  stmt = psDBConn.prepare('INSERT INTO position_ratings ' +
  ' (card_id, of_range, of_error, of_arm, inf_range, inf_error, inf_arm, inf_turn, ' +
  ' catcher_ability, catcher_arm)' +
  ' VALUES (?, ?, ?, ?, ?,  ?, ?, ?, ?, ?)');
  info = stmt.run(currentCardId, row.OFRange, row.OFError, row.OFArm, row.InfieldRange,
    row.InfieldError, row.InfieldArm, row.DP, row.CatcherAbil, row.CatcherArm);
*/

}

/*
let teamNamesImported = Array();
function importTeamNamesOnly(row) {
    if (teamNamesImported.includes(row.team)) {
      console.log(`Bypassing team name ${row.team}; already added`);
      return;
    }

    let splitName = row.team.split(' ');
    let cityName = '', teamName = '';
    switch(splitName.length) {
      case 2: cityName = splitName[0];
        teamName = splitName[1]; break;
      case 3: cityName = splitName[0] + ' ' + splitName[1];
        teamName = splitName[2]; break;
      case 4: cityName = splitName[0] + ' ' + splitName[1];
        teamName = splitName[2] + ' ' + splitName[1]; break;
      default: throw Error('unexpected team name length ' + splitName.length);
    }

    db.run('INSERT INTO team(city_name, team_name) VALUES(?,?)', [cityName, teamName], (err) => {
      if (err) {
        console.log(err);
      }
    })
    teamNamesImported.push(row.team);
    console.log(`CITY NAME: *${cityName}*  TEAM NAME: *${teamName}*`);
}
*/
