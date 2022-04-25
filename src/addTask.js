const { v4 } = require("uuid");
const AWS = require("aws-sdk");

// Middleware
const middy = require("@middy/core");
const jsonBodyParser = require("@middy/http-json-body-parser");

const addTask = async (event) => {
  // Conectando módulo a DynamoDB (A través del access key y secret key configurado en el PC)
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // Datos que nos envia el usuario
  const { title, description } = event.body;
  const createdAt = new Date();
  const id = v4();

  const newTask = {
    id,
    title,
    description,
    createdAt,
    done: false,
  };

  // Guardando objeto en la BD
  await dynamodb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify(newTask),
  };
};

module.exports = {
  // Antes de que se llame la función se procesa la función del middleware
  addTask: middy(addTask).use(jsonBodyParser()),
};
