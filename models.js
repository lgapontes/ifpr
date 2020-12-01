const { v4: uuidv4 } = require('uuid');

class Afazer {
  constructor(afazer, uuid) {
    if (uuid) {
      this.uuid = uuid;
    } else {
      this.uuid = uuidv4();
    }
    this.afazer = afazer;
   }
  ehValido() {
    if ( (this.afazer) && (typeof this.afazer == 'string') && (this.afazer.length <= 20) ) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Afazer;
