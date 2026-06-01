
var generateBtn = document.getElementById('generateBtn');
var saveBtn     = document.getElementById('saveBtn');
var palette     = document.getElementById('palette');
var favorites   = document.getElementById('favorites');
var noFav       = document.getElementById('noFav');
var copyMsg     = document.getElementById('copyMsg');


var currentColors = [];



function randomHex() {
  var hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  return '#' + hex.toUpperCase();
}



function generatePalette() {
  currentColors = [];
  palette.innerHTML = ''; 

  for (var i = 0; i < 5; i++) {
    var color = randomHex();
    currentColors.push(color);

    // Create a colored box
    var box = document.createElement('div');
    box.className = 'box';
    box.style.backgroundColor = color;

    
    var label = document.createElement('span');
    label.textContent = color;
    box.appendChild(label);

    
    box.addEventListener('click', function(e) {
      var hex = e.currentTarget.style.backgroundColor;
      
      var hexText = e.currentTarget.querySelector('span').textContent;
      navigator.clipboard.writeText(hexText);

      
      copyMsg.style.display = 'block';
      setTimeout(function() { copyMsg.style.display = 'none'; }, 1500);
    });

    palette.appendChild(box);
  }

  saveBtn.style.display = 'inline-block';
}



function savePalette() {
  
  var saved = JSON.parse(localStorage.getItem('rang') || '[]');

  
  var alreadySaved = saved.some(function(p) {
    return JSON.stringify(p) === JSON.stringify(currentColors);
  });

  if (alreadySaved) {
    alert('This palette is already saved!');
    return;
  }

  saved.push(currentColors);
  localStorage.setItem('rang', JSON.stringify(saved));

  showFavorites();
}



function showFavorites() {
  var saved = JSON.parse(localStorage.getItem('rang') || '[]');
  favorites.innerHTML = '';

  if (saved.length === 0) {
    noFav.style.display = 'block';
    return;
  }
  

  noFav.style.display = 'none';

  saved.forEach(function(palette, index) {
    var row = document.createElement('div');
    row.className = 'fav-row';

    
    palette.forEach(function(color) {
      var mini = document.createElement('div');
      mini.className = 'mini';
      mini.style.backgroundColor = color;
      mini.title = color;

      
      mini.addEventListener('click', function() {
        navigator.clipboard.writeText(color);
        copyMsg.style.display = 'block';
        setTimeout(function() { copyMsg.style.display = 'none'; }, 1500);
      });

      row.appendChild(mini);
    });

    
    var del = document.createElement('button');
    del.className = 'del';
    del.textContent = '🗑';
    del.addEventListener('click', function() {
      saved.splice(index, 1);
      localStorage.setItem('rang', JSON.stringify(saved));
      showFavorites();
    });

    row.appendChild(del);
    favorites.appendChild(row);
  });
}



generateBtn.addEventListener('click', generatePalette);
saveBtn.addEventListener('click', savePalette);


showFavorites();

/*IT WAS MY 4TH PROJECT. JAVA SCRIPT IS DONE GUYSSSSS*/
