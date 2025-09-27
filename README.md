# 🛡️ Secure Finance Document Exchange

A secure and scalable platform to exchange sensitive financial documents with Role-Based Access Control (RBAC), audit logging, metrics, and enterprise-grade Azure cloud deployment.

---

## 🔧 Features

- 🔐 **RBAC-based Access Control**
  - `Admin`: Can delete documents
  - `User`: Upload/view own documents
  - `Auditor`: Can view audit logs
- 📂 File Uploads secured with Azure Blob Storage
- 🔍 Audit Logging (upload, download, delete actions)
- 📊 Prometheus + Grafana monitoring with custom metrics
- 🧪 Unit tests and health probes for robust microservices
- ☁️ CI/CD pipeline using **Azure DevOps**
- 🔒 Secrets managed via **Azure Key Vault + CSI Driver**
- 📦 Fully containerized using Docker & deployed on AKS
- 🌐 Ingress with TLS (Cert-Manager)

---

## 🚀 Deployment

### Prerequisites

- Azure CLI
- Azure Kubernetes Service (AKS) cluster
- Azure Container Registry (ACR)
- Azure Key Vault with secrets:
  - `JWT_SECRET`
  - `AZURE_STORAGE_CONNECTION_STRING`

### 1. Build & Push Images

```bash
# Tag and push to ACR
docker build -t myregistry01secure.azurecr.io/secure-backend:v1 ./backend
docker push myregistry01secure.azurecr.io/secure-backend:v1
````

### 2. Deploy to AKS

```bash
# Update ACR access for AKS
az aks update \
  --name bhanuja-aks \
  --resource-group aks-lab-rg \
  --attach-acr myregistry01secure

# Deploy with Helm
helm install secure-docs ./helm-chart -f ./helm-chart/values.yaml
```

### 3. Enable Azure Monitor

```bash
az aks enable-addons \
  --resource-group aks-lab-rg \
  --name bhanuja-aks \
  --addons monitoring \
  --workspace-resource-id <workspace-id>
```

---

## 🔐 CI/CD with Azure DevOps

* Pipeline authenticates with Azure and Key Vault
* Secrets injected securely
* Auto deployment on merge

Sample snippet from `azure-pipelines.yml`:

```yaml
- task: AzureKeyVault@2
  inputs:
    azureSubscription: 'Azure ARM Connection'
    KeyVaultName: 'key-vault-01-secure'
    SecretsFilter: 'JWT_SECRET,AZURE_STORAGE_CONNECTION_STRING'
```

---

## 🧪 Health Check

Kubernetes `livenessProbe` and `readinessProbe` are configured on `/health` endpoint.

---

## 🛡️ Security Practices

* ✅ Azure Key Vault for secrets
* ✅ Role bindings per service account
* ✅ Network Policies to isolate components
* ✅ TLS encryption with Ingress

## 📸 Screenshots

### Troubleshooting
![Troubleshooting](./images/Screenshot%202025-09-27%20at%2011.27.43%20AM.png)




