const AWS = require("aws-sdk");

const getTask = async (event) => {
  // Conectando módulo a DynamoDB (A través del access key y secret key configurado en el PC)
  const dynamodb = AWS.DynamoDB.DocumentClient();

  // Datos que nos envia el usuario por path
  const { id } = event.pathParameters;

  // Obteniendo datos de la bd
  const result = await dynamodb
    .get({
      TableName: "TaskTable",
      // Indicamos por que parámetro buscar
      Key: {
        id: id,
      },
    })
    .promise();

  const task = result.Item;

  return {
    status: 200,
    body: task,
  };
};

module.exports = {
  getTask,
};
