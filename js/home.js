var ADDR = 'me',
    DOMAIN = 'erikboesen.com';
document.getElementById('email').href = 'mailto' + ':' + ADDR + '@' + DOMAIN;

document.getElementById('name').onmouseenter = function() { this.textContent = 'ERIK BOESEN'; }
document.getElementById('name').onmouseout   = function() { this.textContent = 'ERIK BØSEN';  }
