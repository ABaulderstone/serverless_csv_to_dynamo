"use strict";
const transformCsv = require("./handlers/transformCvs");
const { S3 } = require("aws-sdk");
const s3 = new S3();
const csvToJson = require("csvtojson");

const addData = async (event, context, callback) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const data = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();
  csvToJson()
    .fromStream(data)
    .on("data", row => {
      let parsedRow = JSON.parse(row);
      let rowObject = JSON.stringify(parsedRow);
      transformCsv(rowObject);
    });
};
module.exports = {
  addData
};
