"use strict";
const csvParser = require("csv-parse");
const { DynamoDB } = require("aws-sdk");
const dynamo = new DynamoDB.DocumentClient({ convertEmptyValues: true });

module.exports = item => {
  const params = {
    TableName: "jobs",
    Item: {
      soc: item.soc,
      title: item.title,
      major_group: item.major_group,
      minor_group: item.minor_group,
      broad_group: item.broad_group,
      alt_title: item.alt_title
    }
  };
  return dynamo
    .put(params)
    .promise()
    .then(result => params.Item);
};
