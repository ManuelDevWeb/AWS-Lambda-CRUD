const AWS = require("aws-sdk");

const updateTask = async (event) => {
  // Conectando módulo a DynamoDB (A través del access key y secret key configurado en el PC)
  const dynamodb = AWS.DynamoDB.DocumentClient();

  // Datos que nos envia el usuario por path
  const { id } = event.pathParameters;
  // Datos que nos envia el usuario por body
  const { done, title, description } = JSON.stringify(event.body);

  // Actualizando item de la db
  await dynamodb
    .update({
      TableName: "TaskTable",
      // Indicamos por que parámetro buscar
      Key: {
        id: id,
      },
      UpdateExpression:
        "set done = :done, title = :title, description = :description ",
      ExpressionAttributeValues: {
        // :done lo igualamos al valor del done que viene desde el body
        ":done": done,
        ":title": title,
        ":description": description,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      msg: "Task updated successfully!",
    }),
  };
};

module.exports = {
  updateTask,
};
