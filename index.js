
const spawnSync = require('child_process').spawnSync;

module.exports.handler = async (event) => {
  try {
    // Execute the CLI tool command using npx
    const env = 'staging'
    const deploymentId = '12345'
    // const command = ` trigger --record --tags=${env} --test-session-name=${deploymentId} --location=eu-central-1`;
    const { stdout, stderr } = spawnSync('./node_modules/.bin/checkly', ['trigger', '--record', `--tags=${env}`, `--test-session-name=${deploymentId}`, '--location=eu-central-1']);
    console.log(`CLI tool output: ${stdout}`);
    console.error(`CLI tool error: ${stderr}`);
    if (stderr){
      throw new Error(stderr);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "It worked",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.error(`Error executing CLI tool: ${error}`);
    return error;
  };

};
