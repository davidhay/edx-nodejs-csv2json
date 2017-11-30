# edx-nodejs-csv2json
Converts CSV files to JSON

reads CSV records in ./customer-data.csv, converts them to JSON and outputs the JSON to ./customer-data.json.

* Starts be deleting the ./customer-data.json file (if it exists)
* Then uses csv2json module to read in the CSV and parse it line by line.
* For each CSV line, a callback processes the resultant JSON object and adds it to an array.
* When all of the CSV file has been processed, the array of (JSON) Objects is converted to a string and that string is written to the output file ./customer-data.json.


No automated testing. Tested by checking that the expected output file was produced, that it was valid JSON and that it contains 1000 records.
