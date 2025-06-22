const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();
const keyVaultUrl = process.env.AZURE_KEY_VAULT_URL;

const client = new SecretClient(keyVaultUrl, credential);

exports.saveEncryptionKey = async (secretName, value) => {
  await client.setSecret(secretName, value);
};

exports.getEncryptionKey = async (secretName) => {
  const secret = await client.getSecret(secretName);
  return secret.value;
};
