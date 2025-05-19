graph TD
    A[Checkout Code] --> B[Build Application]
    B --> C[Static Code Analysis]
    C --> D[Security Scan]
    D --> E[Run Unit Tests]
    E --> F[Build Docker Image]
    F --> G[Run Integration Tests]
    G --> H[Staging Deployment]
    H --> I[Production Deployment]

    class A,B,C,D,E,F,G checkout;
    class H,I deploy;
    
    style A fill:#f9f,stroke:#333,stroke-width:2px;
    style B fill:#cfc,stroke:#333,stroke-width:2px;
    style C fill:#ffcc00,stroke:#333,stroke-width:2px;
    style D fill:#ffcc00,stroke:#333,stroke-width:2px;
    style E fill:#cfc,stroke:#333,stroke-width:2px;
    style F fill:#cfc,stroke:#333,stroke-width:2px;
    style G fill:#cfc,stroke:#333,stroke-width:2px;
    style H fill:#fcf,stroke:#333,stroke-width:2px;
    style I fill:#fcf,stroke:#333,stroke-width:2px;
