import mysql = require("mysql");
import {config} from "./SQL Connection Config";

// promise-wrapper for mysql queries
export default class Database {
  connection: mysql.Connection;

  constructor(){
    this.connection = mysql.createConnection(config);
  }

  query(sql: string, args?: string[]): Promise<any>{
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, results) => {
        if(err){
          console.error(err);
          this.connection.end();
          reject(err);
        } else{
          resolve(results);
        }
      });
    });
  }

  close(): Promise<any>{
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if(err){
          console.error(err);
          return reject(err);
        }
        resolve();
      });
    });
  }
}
