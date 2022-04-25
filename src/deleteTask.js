const AWS = require("aws-sdk");

const deleteTask = async (event) => {
  // Conectando módulo a DynamoDB (A través del access key y secret key configurado en el PC)
  const dynamodb = AWS.DynamoDB.DocumentClient();

  // Datos que nos envia el usuario por path
  const { id } = event.pathParameters;

  // Actualizando item de la db
  await dynamodb
    .delete({
      TableName: "TaskTable",
      // Indicamos por que parámetro buscar
      Key: {
        id: id,
      },
    })
    .promise();

  return {
    status: 200,
    body: {
      msg: "Task deleted",
    },
  };
};

module.exports = {
  deleteTask,
};
