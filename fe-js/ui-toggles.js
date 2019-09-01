let batter_displayed = true;

let batter_toggle = document.querySelector('#batter_main_tab');
let pitcher_toggle = document.querySelector('#pitcher_main_tab');

let batter_display = document.querySelector('#batter_display');
let pitcher_display = document.querySelector('#pitcher_display');

pitcher_toggle.addEventListener('click', () => {
  if (batter_displayed) {
    batter_toggle.classList.remove("is-active");
    batter_display.style.display = 'none';
    pitcher_toggle.classList.add("is-active");
    pitcher_display.style.display = 'block';
    batter_displayed = false;
  }
});

batter_toggle.addEventListener('click', () => {
  if (!batter_displayed) {
    pitcher_toggle.classList.remove("is-active");
    pitcher_display.style.display = 'none';
    batter_toggle.classList.add("is-active");
    batter_display.style.display = 'block';
    batter_displayed = true;
  }
});

setupFilterToggles('batter');
setupFilterToggles('pitcher');

function setupFilterToggles(typeIn) {
  let filter_toggle = document.querySelectorAll('li.' + typeIn + '-filter-tab');

  filter_toggle.forEach( tab => tab.addEventListener('click', (event) => {
      filter_toggle.forEach(alltab => alltab.classList.remove("is-active"));
      tab.classList.add("is-active");

      let area_toggle = document.querySelectorAll('#' + typeIn + '_filter_area div.immed');
      area_toggle.forEach(allArea => allArea.style.display='none');

      let applicable_area = document.querySelector('#' + tab.id + '_area');
      applicable_area.style.display='block';
  }));
}
