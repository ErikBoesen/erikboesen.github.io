////////////////////
// Email obfuscation
//
const ADDR = 'me',
      DOMAIN = 'erikboesen.com';
document.getElementById('email').href = 'mailto' + ':' + ADDR + '@' + DOMAIN;
