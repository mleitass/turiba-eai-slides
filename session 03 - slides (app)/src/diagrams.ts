export const slideDiagrams: Record<string, string> = {
  "Running Example Introduction: E-Commerce Order Flow": `
flowchart TD

    Customer -->|Place Order| OrderService

    %% Routing based on item types
    OrderService -->|Split Order Items| Router{Item Type?}

    Router -->|Physical| InventoryService
    Router -->|Digital| DigitalDelivery[Digital Delivery Service]
    Router -->|Subscription| SubscriptionService

    %% Payment always required
    OrderService --> PaymentService

    %% Physical item flow
    InventoryService -->|Stock OK| ShippingService
    InventoryService -->|Out of Stock| FailureInventory[Inventory Failure]

    %% Digital flow
    DigitalDelivery --> DigitalDone[Digital Fulfilled]

    %% Subscription flow
    SubscriptionService --> SubscriptionDone[Subscription Activated]

    %% Shipping outcome
    ShippingService --> ShippingDone[Shipped]

    %% Aggregation
    PaymentService --> Aggregator
    ShippingDone --> Aggregator
    DigitalDone --> Aggregator
    SubscriptionDone --> Aggregator

    %% Failure handling
    FailureInventory --> ErrorHandler
    PaymentService -->|Payment Failed| ErrorHandler

    %% Final result
    Aggregator -->|All Successful| OrderCompleted[Order Completed]
    ErrorHandler --> OrderFailed[Order Failed]
  `,
  "Pipes and Filters: Core Idea": `
graph LR
    Input[Input Message] --> Filter1[Filter 1]
    Filter1 -->|Pipe| Filter2[Filter 2]
    Filter2 -->|Pipe| Filter3[Filter 3]
    Filter3 --> Output[Output Message]
    
    style Input fill:#f9f,stroke:#333,stroke-width:2px
    style Output fill:#f9f,stroke:#333,stroke-width:2px
    style Filter1 fill:#58A7D8,color:white,stroke:#333
    style Filter2 fill:#58A7D8,color:white,stroke:#333
    style Filter3 fill:#58A7D8,color:white,stroke:#333
  `,
  "Pipes and Filters: Order Flow Example": `
graph LR
    Order[Order Received] --> Validate[Validate Order]
    Validate --> Fraud[Check Fraud Score]
    Fraud --> Enrich[Enrich Customer Data]
    Enrich --> Router[Route by Type]
    
    Validate -.->|Invalid| Error[Error Channel]
    
    style Order fill:#f9f,stroke:#333
    style Error fill:#ff9999,stroke:#333
    style Validate fill:#58A7D8,color:white
    style Fraud fill:#58A7D8,color:white
    style Enrich fill:#58A7D8,color:white
    style Router fill:#58A7D8,color:white
  `,
  "Content-Based Router: Core Idea": `
graph LR
    Input[Input Channel] --> Router{Router}
    Router -->|Condition A| Out1[Output Channel 1]
    Router -->|Condition B| Out2[Output Channel 2]
    Router -->|Otherwise| Out3[Output Channel 3]
    
    style Input fill:#f9f,stroke:#333
    style Router fill:#ffd700,stroke:#333
    style Out1 fill:#58A7D8,color:white
    style Out2 fill:#58A7D8,color:white
    style Out3 fill:#58A7D8,color:white
  `,
  "Content-Based Router: Order Flow Example": `
graph TD
    Order[Incoming Order] --> Router{Check Order Type}
    
    Router -->|Physical| Inv[Inventory Service]
    Inv --> Ship[Shipping Service]
    
    Router -->|Digital| Dig[Digital Delivery Service]
    
    Router -->|Subscription| Sub[Subscription Mgmt]
    
    style Order fill:#f9f,stroke:#333
    style Router fill:#ffd700,stroke:#333
    style Inv fill:#58A7D8,color:white
    style Ship fill:#58A7D8,color:white
    style Dig fill:#58A7D8,color:white
    style Sub fill:#58A7D8,color:white
  `,
  "Dynamic Router: Core Idea": `
graph TB
    Control[Control Channel] -.->|Update Rules| Router{Dynamic Router}
    Input[Input Message] --> Router
    Router -.->|Query Rule| Store[(Rule Store)]
    Store -.->|Return Route| Router
    
    Router --> Dest1[Destination A]
    Router --> Dest2[Destination B]
    
    style Control fill:#ff9999,stroke:#333,stroke-dasharray: 5 5
    style Input fill:#f9f,stroke:#333
    style Router fill:#ffd700,stroke:#333
    style Store fill:#eee,stroke:#333
    style Dest1 fill:#58A7D8,color:white
    style Dest2 fill:#58A7D8,color:white
  `,
  "Dynamic Router: Order Flow Example": `
graph LR
    Control[Control Channel] -.->|Set Split: 90/10| Router{Router}
    Order[Order] --> Router
    
    Router -->|90%| V1[PaymentService V1]
    Router -->|10%| V2[PaymentService V2]
    
    style Control fill:#ff9999,stroke:#333,stroke-dasharray: 5 5
    style Router fill:#ffd700,stroke:#333
    style V1 fill:#58A7D8,color:white
    style V2 fill:#4CAF50,color:white
  `,
  "Recipient List: Core Idea": `
graph LR
    Input[Message] --> List[Recipient List]
    List --> Rec1[Recipient 1]
    List --> Rec2[Recipient 2]
    List --> Rec3[Recipient 3]
    
    style Input fill:#f9f,stroke:#333
    style List fill:#ffd700,stroke:#333
    style Rec1 fill:#58A7D8,color:white
    style Rec2 fill:#58A7D8,color:white
    style Rec3 fill:#58A7D8,color:white
  `,
  "Recipient List: Order Flow Example": `
graph TD
    Order[Order Placed] --> Calculator[Recipient Calculator]
    Calculator -->|List| Router[Router]
    
    Router --> Inv[Inventory System]
    Router --> Ana[Analytics System]
    Router --> CRM[CRM System]
    Router --> Audit[Audit System]
    
    style Order fill:#f9f,stroke:#333
    style Calculator fill:#ffd700,stroke:#333
    style Router fill:#ffd700,stroke:#333
    style Inv fill:#58A7D8,color:white
    style Ana fill:#58A7D8,color:white
    style CRM fill:#58A7D8,color:white
    style Audit fill:#58A7D8,color:white
  `,
  "Splitter: Core Idea": `
graph LR
    Msg[Composite Message] --> Splitter[Splitter]
    Splitter --> Item1[Message 1]
    Splitter --> Item2[Message 2]
    Splitter --> Item3[Message 3]
    
    style Msg fill:#f9f,stroke:#333
    style Splitter fill:#ffd700,stroke:#333
    style Item1 fill:#58A7D8,color:white
    style Item2 fill:#58A7D8,color:white
    style Item3 fill:#58A7D8,color:white
  `,
  "Splitter: Order Flow Example": `
graph TD
    Order["Order (3 Items)"] --> Splitter[Splitter]
    Splitter --> Item1[Item: Laptop]
    Splitter --> Item2[Item: License]
    Splitter --> Item3[Item: Support]
    
    Item1 --> CBR1{Router}
    Item2 --> CBR2{Router}
    Item3 --> CBR3{Router}
    
    CBR1 --> Inv[Inventory]
    CBR2 --> Dig[Digital Delivery]
    CBR3 --> Sub[Subscription]
    
    style Order fill:#f9f,stroke:#333
    style Splitter fill:#ffd700,stroke:#333
    style Inv fill:#58A7D8,color:white
    style Dig fill:#58A7D8,color:white
    style Sub fill:#58A7D8,color:white
  `,
  "Aggregator: Core Idea": `
graph LR
    Msg1[Message 1] --> Agg[Aggregator]
    Msg2[Message 2] --> Agg
    Msg3[Message 3] --> Agg
    
    Agg --> Result[Combined Message]
    
    style Msg1 fill:#58A7D8,color:white
    style Msg2 fill:#58A7D8,color:white
    style Msg3 fill:#58A7D8,color:white
    style Agg fill:#ffd700,stroke:#333
    style Result fill:#f9f,stroke:#333
  `,
  "Scatter-Gather: Core Idea": `
graph LR
    Request --> Split[Recipient List]
    Split --> Prov1[Provider A]
    Split --> Prov2[Provider B]
    Split --> Prov3[Provider C]
    
    Prov1 --> Agg[Aggregator]
    Prov2 --> Agg
    Prov3 --> Agg
    
    Agg --> Result[Best Quote]
    
    style Request fill:#f9f,stroke:#333
    style Split fill:#ffd700,stroke:#333
    style Prov1 fill:#58A7D8,color:white
    style Prov2 fill:#58A7D8,color:white
    style Prov3 fill:#58A7D8,color:white
    style Agg fill:#ffd700,stroke:#333
    style Result fill:#f9f,stroke:#333
  `,
  "Scatter-Gather: Order Flow Example": `
graph LR
    Order[Shipping Request] --> RL[Broadcast]
    RL --> FedEx
    RL --> UPS
    RL --> DHL
    
    FedEx --> Agg[Aggregator]
    UPS --> Agg
    DHL --> Agg
    
    Agg --> Quote[Lowest Rate Quote]
    
    style Order fill:#f9f,stroke:#333
    style RL fill:#ffd700,stroke:#333
    style FedEx fill:#58A7D8,color:white
    style UPS fill:#58A7D8,color:white
    style DHL fill:#58A7D8,color:white
    style Agg fill:#ffd700,stroke:#333
    style Quote fill:#f9f,stroke:#333
  `,
  "Splitter + Aggregator: Complete Flow": `
graph TD
    Order[Order] --> Splitter[Splitter]
    Splitter --> ItemA[Item A]
    Splitter --> ItemB[Item B]
    
    ItemA --> ProcA[Process A]
    ItemB --> ProcB[Process B]
    
    ProcA --> Agg[Aggregator]
    ProcB --> Agg
    
    Agg --> Status[Order Status]
    
    style Order fill:#f9f,stroke:#333
    style Splitter fill:#ffd700,stroke:#333
    style Agg fill:#ffd700,stroke:#333
    style Status fill:#f9f,stroke:#333
    style ProcA fill:#58A7D8,color:white
    style ProcB fill:#58A7D8,color:white
  `,
  "Pattern Selection Decision Tree": `
graph TD
    Start[Start] --> Q1{Single Dest?}
    Q1 -->|Yes| Q2{Stable Rules?}
    Q2 -->|Yes| CBR[Content-Based Router]
    Q2 -->|No| DR[Dynamic Router]
    
    Q1 -->|No| Q3{Broadcast?}
    Q3 -->|Same Message| RL[Recipient List]
    Q3 -->|Composite Msg| Split[Splitter]
    Q3 -->|Request/Reply| SG[Scatter-Gather]
    
    style Start fill:#f9f,stroke:#333
    style CBR fill:#58A7D8,color:white
    style DR fill:#58A7D8,color:white
    style RL fill:#58A7D8,color:white
    style Split fill:#58A7D8,color:white
    style SG fill:#58A7D8,color:white
  `,
  "Combining Patterns: Real Architecture": `
graph TD
    Order[Order] --> V[Validate]
    V --> S[Splitter]
    S --> Items[Order Items]
    Items --> Router{Item Router}
    
    Router -->|Physical| SG["Scatter-Gather (Rates)"]
    Router -->|Digital| D[Digital Service]
    
    SG --> Agg[Aggregator]
    D --> Agg
    
    Agg --> RL[Recipient List]
    RL --> Note[Notifications]
    
    style Order fill:#f9f,stroke:#333
    style V fill:#58A7D8,color:white
    style S fill:#ffd700,stroke:#333
    style Router fill:#ffd700,stroke:#333
    style SG fill:#ffd700,stroke:#333
    style Agg fill:#ffd700,stroke:#333
    style RL fill:#ffd700,stroke:#333
  `,
  "Lab Architecture Overview": `
graph LR
    API[Order API] -->|orders.incoming| Router{Router Service}
    
    Router -->|orders.physical| Inv[Inventory Worker]
    Router -->|orders.digital| Dig[Digital Worker]
    
    Inv -->|orders.results| Agg[Aggregator Service]
    Dig -->|orders.results| Agg
    
    Agg -->|Response| API
    
    style API fill:#f9f,stroke:#333
    style Router fill:#ffd700,stroke:#333
    style Inv fill:#58A7D8,color:white
    style Dig fill:#58A7D8,color:white
    style Agg fill:#ffd700,stroke:#333
  `
};

