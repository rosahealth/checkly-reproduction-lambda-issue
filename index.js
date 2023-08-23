const {spawn} = require('child_process')

async function spawnChild(exec, args) {
  const child = spawn(exec, args);

  let data = "";
  for await (const chunk of child.stdout) {
    console.log('stdout chunk: '+chunk);
    data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
    console.error('stderr chunk: '+chunk);
    error += chunk;
  }
  const exitCode = await new Promise( (resolve, reject) => {
    child.on('close', resolve);
  });

  if( exitCode) {
    throw new Error( `subprocess error exit ${exitCode}, ${error}`);
  }
  return data;
}


module.exports.handler = async (event) => {


  try {
    // Execute the CLI tool command using npx
    const env = 'staging'
    const deploymentId = '12345'
    const exec = '/Users/timnolet/Library/Caches/fnm_multishells/19867_1692796221624/bin/node'
    const args = ['./node_modules/.bin/checkly', 'trigger', '--record', `--tags=nextjs`, `--test-session-name=${deploymentId}`, '--location=eu-central-1']

    await spawnChild(exec, args);

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
