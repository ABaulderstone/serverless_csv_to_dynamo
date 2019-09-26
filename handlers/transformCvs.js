"use strict";
const csvParser = require("csv-parse");
const { DynamoDB } = require("aws-sdk");
const dynamo = new DynamoDB.DocumentClient({ convertEmptyValues: true });

const createParams = (item, tableName) => {
  return { TableName: tableName, Item: item };
};

module.exports = item => {
  const params = createParams(item, "jobs");
  return dynamo
    .put(params)
    .promise()
    .then(result => params.Item);
};
