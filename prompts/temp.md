| Camada                     | Responsabilidade Principal                                    | Tecnologias Utilizadas                        |
|----------------------------|---------------------------------------------------------------|------------------------------------------------|
| API RESTful                | Exposição de endpoints seguros                               | ASP.NET Core, Swagger, OAuth2                 |
| Serviço de Negócio         | Regras de negócio, versionamento, rollback                   | C# / .NET, FluentValidation, AutoMapper       |
| Persistência               | Armazenamento de parâmetros versionados                      | Azure Cosmos DB (NoSQL, JSON Document Store)  |
| Cache                      | Leitura rápida e fallback temporário                         | Azure Redis Cache, TTL, Publish/Subscribe     |
| Observabilidade & Auditoria| Logs, rastreamento, métricas e auditoria                     | Application Insights, ELK Stack, Azure Monitor |
