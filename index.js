const fs = require('fs')
const path = require('path')
const csv=require('csvtojson')
const inputFile=path.join(__dirname, 'customer-data.csv')
const outputFile=path.join(__dirname, 'customer-data.json')

const EVT_JSON = 'json';
const EVT_DONE = 'done';

const deleteCallback = () => {
  const data = [];
  csv()
  .fromFile(inputFile)
  .on(EVT_JSON, (jsonObj) => data.push(jsonObj))
  .on(EVT_DONE, (csvError) => {
    if(csvError){
      console.log(`csvError:${csvError}`);
      return;
    }
    const dataStr = JSON.stringify(data,null,2);//pretty print json
    fs.writeFile(outputFile, dataStr, (err) => {
      if(err){
        console.log(`Problem writing File ${outputFile} err:${err}`);
        return;
      }
      console.log(`Wrote ${data.length} records to File ${outputFile} successfully.`);
    });
  });//EVT_DONE
};

const deleteFile = (fileToDelete, callback) => {
  fs.unlink(fileToDelete, function(err) {
      if(err && err.code == 'ENOENT') {
          // file doens't exist
          console.warn(`File ${fileToDelete} does not exist.`);
      } else if (err) {
          // other errors, e.g. maybe we don't have enough permission
          console.error(`Error occurred while trying to remove file ${fileToDelete} `);
          return;
      } else {
          console.info(`removed file ${fileToDelete}`);
      }
      callback();
  });
}

deleteFile(outputFile, deleteCallback);
