const { ipcRenderer } = require('electron');
//const console = require('console');
var templateProcessor = require('./templateProcessor');

let replyDiv = document.querySelector('#filter_reply');

function executeSearch(typeIn) {
  if (typeIn=='batter') {
    var filters = batterHarvest();
    var sortBy = 'card_overall DESC';
    // convert Map to Object, ipcRenderer can only handle Object/JSON, Maps get destroyed
    var mapAsObject = Object.fromEntries(filters);
    let srData = ipcRenderer.sendSync('executeSearch', typeIn, mapAsObject, sortBy);
    let srOutputHtml = templateProcessor.processTemplate('search-results', {result_data:srData});
    replyDiv.innerHTML = srOutputHtml;

    // update JS array of search result ID's
    sr_ids = new Array();
    let grab_sr_ids = document.querySelector('#sr_ids_holder');
    let string_sr_ids = grab_sr_ids.innerHTML.split(',');
    let string_sr_ids_length = string_sr_ids.length;
    for (var xx=0; xx <string_sr_ids_length - 1; xx++) {
      sr_ids.push((string_sr_ids[xx] - 0));
    }
    // JSON.stringify(results);
  }
}

function determineComparisonTrio(selectedCardId) {
  let sr_ids_length = sr_ids.length;
  let selectedCardIndex = sr_ids.indexOf(selectedCardId);
  let distanceToEnd = (sr_ids_length-1) - selectedCardIndex;
  let beforeCards = (selectedCardIndex >= 2 && sr_ids_length > 3)
  let afterCards = (distanceToEnd >= 2 && sr_ids_length > 3);
  let selPos = 1;

  if (selectedCardIndex == 0) {
    selPos = 0;
  }
  else if (selectedCardIndex == (sr_ids_length-1) && selectedCardIndex >=2) {
    selPos = 2;
  }

  let trioIds = new Array();
  switch(selPos) {
    case 0: trioIds = [sr_ids[selectedCardIndex], sr_ids[selectedCardIndex+1], sr_ids[selectedCardIndex+2]];
    break;
    case 1: trioIds = [sr_ids[selectedCardIndex-1], sr_ids[selectedCardIndex], sr_ids[selectedCardIndex+1]];
    break;
    case 2: trioIds = [sr_ids[selectedCardIndex-2], sr_ids[selectedCardIndex-1], sr_ids[selectedCardIndex]];
    break;
  }

  return {'leftCard':trioIds[0], 'midCard':trioIds[1], 'rightCard':trioIds[2],
    'currentPosition':selPos, 'beforeCards':beforeCards, 'afterCards':afterCards};
}

function presentPlayerComparison(selectedCardId, fromResults) {
  var idData = determineComparisonTrio(selectedCardId);

  let resultData = ipcRenderer.sendSync('executePlayerCompare', idData);
  let results = templateProcessor.processTemplate('player-comparison', resultData);
  let comparisonArea = document.querySelector('#player_comparison_area');
  comparisonArea.innerHTML = results;

  producePSBarCharts(resultData.playerData);
  if (fromResults) {    
    toggleModal();
  }

}
