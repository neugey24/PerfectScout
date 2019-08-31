const { ipcRenderer } = require('electron');

let filter_button = document.querySelector('#filter_button');

//alert('am i here?');

let readDiv = document.querySelector('#read_it').innerHTML;
let replyDiv = document.querySelector('#filter_reply');

replyDiv.innerHTML = 'heyyyyy!';


filter_button.addEventListener('click', () => {
  replyDiv.innerHTML = 'wowow';

 var tier_select = document.querySelector('#tier_select option:checked').value;
 let reply = ipcRenderer.sendSync('filterMessage',tier_select);
 replyDiv.innerHTML = '^&^&^&^&' + reply;
 return false;

});
