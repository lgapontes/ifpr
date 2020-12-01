const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

class Banco {
  constructor() {
    let adapter = new FileSync('db.json')
    this.db = low(adapter)
    //this.db.defaults({ afazeres: [] }).write()
  }

  consultar_por_id(uuid,sucesso,erro) {
    let afazer = this.db.get('afazeres').find({ uuid: uuid }).value()
    if (afazer) {
      sucesso(afazer);
    } else {
      erro();
    }
  }

  consultar_todos(sucesso) {
    let afazeres = this.db.get('afazeres').value()
    sucesso(afazeres);
  }

  inserir(afazer) {
    this.db.get('afazeres').push(afazer).write()
  }

  atualizar(uuid,afazer,sucesso,erro) {
    this.consultar_por_id(uuid, afazer_encontrado => {
      this.db.get('afazeres').find({ uuid: uuid }).set('afazer', afazer).write()
      sucesso();
    }, () => {
      erro();
    });
  }

  apagar(uuid,sucesso,erro) {
    this.consultar_por_id(uuid, afazer_encontrado => {
      this.db.get('afazeres').remove({ uuid: uuid }).write()
      sucesso();
    }, () => {
      erro();
    });
  }
}

module.exports = Banco;
