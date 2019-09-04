const { ipcRenderer } = require('electron');
const console = require('console');

let replyDiv = document.querySelector('#filter_reply');

/*
let filter_button = document.querySelector('#filter_button');

//alert('am i here?');

let readDiv = document.querySelector('#read_it').innerHTML;


replyDiv.innerHTML = 'heyyyyy!';


filter_button.addEventListener('click', () => {
  replyDiv.innerHTML = 'wowow';

 var tier_select = document.querySelector('#tier_select option:checked').value;
 let reply = ipcRenderer.sendSync('filterMessage',tier_select);
 replyDiv.innerHTML = '^&^&^&^&' + reply;
 return false;

});
*/
function executeSearch(typeIn) {
  if (typeIn=='batter') {
    var filters = batterHarvest();
    var sortBy = 'card_overall DESC';
    // convert Map to Object, ipcRenderer can only handle Object/JSON, Maps get destroyed
    var mapAsObject = Object.fromEntries(filters);
    let results = ipcRenderer.sendSync('executeSearch', typeIn, mapAsObject, sortBy);
    replyDiv.innerHTML = `<h1>Search Results (${results.length} found):</h1><br />` + JSON.stringify(results);
  }
}
