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

fs.createReadStream(csvFile).pipe(csv.parse({ headers: true })).on('data', (row) => {
    if (row.card_title!='') {
      importDataRow(row);
    }
  })
  .on('end', () => {
    console.log('- CSV end of file reached.');
  });

function importDataRow(row) {
  let look = JSON.stringify(row);
  console.log(`my row:${look}`);
  let titleParts = row.card_title.split('  ');
  let posNameParts = titleParts[1].split(' ');
  console.log(`title pieces:${titleParts}`);
  let usePos = posNameParts[0];
  let useFirstName = posNameParts[1];
  let useLastName = (posNameParts.length > 3) ? posNameParts[2] + ' ' + posNameParts[3] : posNameParts[2];

  let useCardYear = titleParts[3];
  console.log(`pos: ${usePos}`);
  console.log(`first: ${useFirstName}`);
  console.log(`last: ${useLastName}`);
  console.log(`card year: ${useCardYear}`);


}
