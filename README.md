**Secure Finance Document Exchange**

A secure and scalable platform to exchange sensitive financial documents with Role-Based Access Control (RBAC), audit logging, metrics, and enterprise-grade Azure cloud deployment.

Features

- **RBAC-based Access Control**
  - `Admin`: Can delete documents
  - `User`: Upload/view own documents
  - `Auditor`: Can view audit logs
- File Uploads secured with Azure Blob Storage
- Audit Logging (upload, download, delete actions)
- Unit tests and health probes for robust microservices
- CI/CD pipeline using **Azure DevOps**
- Secrets managed via **Azure Key Vault + CSI Driver**
- Fully containerized using Docker & deployed on AKS
- Ingress with TLS (Cert-Manager)
