// utils/vault.js
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const credential = new DefaultAzureCredential();
const vaultName = process.env.AZURE_KEY_VAULT_URI;
const client = new SecretClient(vaultName, credential);

async function getEncryptionKey(secretName) {
  const secret = await client.getSecret(secretName);
  return secret.value;
}
module.exports = { getEncryptionKey };
