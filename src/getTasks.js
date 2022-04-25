const AWS = require("aws-sdk");

const getTasks = async (event) => {
  // Conectando módulo a DynamoDB (A través del access key y secret key configurado en el PC)
  const dynamodb = AWS.DynamoDB.DocumentClient();

  // Obteniendo datos de la bd
  const result = await dynamodb
    .scan({
      TableName: "TaskTable",
    })
    .promise();

  const tasks = result.Items;

  return {
    status: 200,
    body: {
      tasks,
    },
  };
};

module.exports = {
  getTasks,
};
