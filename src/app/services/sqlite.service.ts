import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { MdlCliente } from '../modelo/mdlCliente';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  db: SQLiteObject;
  constructor(
    private sqlite: SQLite
  ) { }

  getDB(): Promise<SQLiteObject> {
    if (this.db == undefined) {
      return this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          return Promise.resolve(this.db);
        })
        .catch(e => {
          return Promise.reject(e);
        });
    } else {
      return Promise.resolve(this.db);
    }
  }

  setclienteSesion(cliente: MdlCliente): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        try{
          let udpates=[];
          udpates.push([
            "delete from cliente_sesion"
          ]);
          udpates.push([
            "insert into cliente_sesion values(?,?)",
            [cliente.id, cliente.nombre]
          ]);
          return db.sqlBatch(udpates)
              .then(() => {
                return Promise.resolve();
              })
              .catch(e => {
                return Promise.reject(e);
              });
        } catch (error) {
          return Promise.reject(error);
        }
      });
  }

  getclienteSesion(): Promise<MdlCliente> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from cliente', [])
          .then((data) => {
            let cliente: MdlCliente;
            if (data.rows.length > 0) {
              cliente=new MdlCliente(
                data.rows.item(0).id,
                data.rows.item(0).nombre,                
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
              );
            }
            return Promise.resolve(cliente);
          })
          .catch(e => {
            return Promise.reject(e);
          });
      });
  }

  crearBD(): Promise<any> {
    return this.getDB()
      .then((db: SQLiteObject) => {
        let ddl=[];
        ddl.push([
          "create table IF NOT EXISTS cliente (id, nombre)", []
        ]);
        return db.sqlBatch(ddl)
          .then(() => {
            return Promise.resolve();
          })
          .catch(e => {
            return Promise.reject(e);
          });
      });
  }
  
}

