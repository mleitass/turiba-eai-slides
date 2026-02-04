export const slidesContent = [
  {
    "title": "Session 3: Enterprise Integration Patterns - Routing",
    "body": "",
    "visualImage": "/images/slide1.png",
    "noImage": false
  },
  {
    "title": "Session Agenda",
    "body": "- 3.1 Why Patterns Matter\r\n- 3.2 Core Routing Patterns\r\n- 3.3 Advanced Routing Patterns\r\n- 3.4 Design Trade-offs\r\n- Practical Lab",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Recall: Session 2 Foundations",
    "body": "- Messages: header + body, atomicity, serialization\r\n- Producers, consumers, brokers\r\n- Channels: point-to-point vs. publish-subscribe\r\n- Sync vs. async communication\r\n- Reliability basics: store-and-forward, throttling",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Running Example Introduction: E-Commerce Order Flow",
    "body": "- Scenario: Online retailer processing customer orders\r\n- Systems involved: Order Service, Payment Service, Inventory Service, Shipping Service\r\n- Orders can contain multiple items (physical, digital, subscription)\r\n- Different items may require different processing paths\r\n- Goal: Route messages correctly, handle failures, aggregate results",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Section 3.1: Why Patterns Matter",
    "body": "- Section divider slide\r\n- Key question: Why not just write custom code for each integration?",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "The Problem: Ad-Hoc Integration",
    "body": "- Every integration becomes a one-off solution\r\n- Knowledge is trapped in individual developers heads\r\n- Code reviews lack shared vocabulary\r\n- Maintenance nightmare: \"What does this if-else chain do?\"\r\n- Accidental complexity compounds over time",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Patterns as Shared Vocabulary",
    "body": "- Patterns are named, reusable solutions to recurring problems\r\n- Origins: \"Design Patterns\" (GoF, 1994), then EIP (Hohpe & Woolf, 2003)\r\n- A pattern name conveys: problem, solution, trade-offs, consequences\r\n- Saying \"Content-Based Router\" is faster than explaining the logic each time\r\n- Patterns transcend programming languages and middleware vendors",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Avoiding Accidental Complexity",
    "body": "- Essential complexity: inherent to the business problem\r\n- Accidental complexity: introduced by poor design choices\r\n- Patterns encode learned experience - avoid reinventing mistakes\r\n- Consistent application of patterns makes systems predictable\r\n- Easier to onboard new team members",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Defining the Complexity Types",
    "body": "- Essential Complexity (\"The What\"):\r\n  - Difficulty inherent to the business problem itself.\r\n  - Cannot be removed, only managed.\r\n  - EAI Example: The business requirement that \"Orders > $10k need manual approval\" or \"European orders require GDPR compliance.\"\r\n  - Why it's hard: The domain reality is messy.\r\n- Accidental Complexity (\"The How\"):\r\n  - Difficulty introduced by our choices of tools, frameworks, or designs.\r\n  - Can and should be eliminated.\r\n  - EAI Example: Writing 500 lines of low-level socket code to send a message, or manually parsing a CSV file with regex instead of a library.\r\n  - Why it's hard: We reinvented the wheel or chose the wrong tool.",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Complexity in the \"Order Flow\" Scenario",
    "body": "- Scenario: Routing a multi-item order (Physical vs. Digital items).\r\n- Essential Complexity (Business Rules):\r\n  - \"If an order contains a Lithium battery, it cannot ship via Air Freight.\"\r\n  - Solution: We must configure a rule for this.\r\n- Accidental Complexity (Implementation Risks):\r\n  - Risk: Hardcoding this rule inside the Payment Service 'if/else' block.\r\n  - Result: To change the shipping rule, we have to redeploy the Payment Service.\r\n  - Pattern Solution: Use a Content-Based Router. The logic is decoupled, and the complexity of \"how to route\" is handled by the framework, leaving you to focus only on the rule itself.",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Reusability and Long-Term Maintainability",
    "body": "- Pattern-based designs are easier to extend\r\n- Adding a new routing rule vs. rewriting the router\r\n- Testing is more straightforward: patterns have known behaviors\r\n- Documentation is simpler: \"This is a Recipient List pattern\"\r\n- Patterns enable architectural governance across teams",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Section 3.2: Core Routing Patterns",
    "body": "- Four core patterns: Pipes and Filters, Content-Based Router, Dynamic Router, Recipient List\r\n- Building blocks for all routing logic",
    "visualImage": "/images/slide12.png",
    "noImage": false
  },
  {
    "title": "Pipes and Filters: Core Idea",
    "body": "- Messages flow through a sequence of processing steps (filters)\r\n- Each filter performs one transformation or decision\r\n- Pipes connect filters - typically message channels\r\n- Filters are independent, reusable, and testable in isolation\r\n- Order of filters matters",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Pipes and Filters: Order Flow Example",
    "body": "- Order received → Validate order → Check fraud score → Enrich with customer data → Route by order type\r\n- Each step is a filter\r\n- If validation fails, message goes to error channel (exit pipe)\r\n- Filters can be added/removed without rewriting the pipeline",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Pipes and Filters: Trade-offs",
    "body": "- **Advantages:** Modularity, testability, reusability, parallel development\r\n- **Disadvantages:** Latency (each filter adds overhead), complexity in long pipelines\r\n- Not suitable when: steps are tightly interdependent, or extreme low-latency required\r\n- Consider: How many filters is too many? (Rule of thumb: 5-10 max per pipeline)",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Content-Based Router: Core Idea",
    "body": "- Router inspects message content (header or body) to determine destination\r\n- Single input channel, multiple output channels\r\n- Routing rules are declarative (if X then route to Y)\r\n- The router itself should not contain business logic - only routing logic\r\n- Central point of routing decisions",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Content-Based Router: Order Flow Example",
    "body": "- Routing criteria: order.type field\r\n- Physical items → Inventory Service → Shipping Service\r\n- Digital items → Digital Delivery Service\r\n- Subscription items → Subscription Management Service\r\n- Each route has different downstream processing",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Content-Based Router: Rule Management",
    "body": "- Rules can be hardcoded, externalized to config, or stored in a rules engine\r\n- Rule explosion: as business grows, rules multiply\r\n- Strategies: rule versioning, rule testing frameworks, audit logging\r\n- Beware: \"just one more if-statement\" leads to unmaintainable routers\r\n- Consider routing tables vs. nested conditionals",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Dynamic Router: Core Idea",
    "body": "- Routing rules are not hardcoded - they are looked up at runtime\r\n- Control channel provides routing configuration updates\r\n- Enables A/B testing, gradual rollouts, feature flags\r\n- Router queries a rule store or receives control messages\r\n- More flexible than Content-Based Router, but more complex",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Dynamic Router: Order Flow Example",
    "body": "- Scenario: A/B testing a new payment provider\r\n- 10% of orders routed to new PaymentService-v2\r\n- 90% continue to PaymentService-v1\r\n- Control channel updates the split ratio without deployment\r\n- Routing decision based on order.id % 100 \\< threshold",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Comparison: Content-Based Router vs. Dynamic Router",
    "body": "| Aspect | Content-Based Router | Dynamic Router |\r\n| - | - | - |\r\n| Rule source | Message content | External config |\r\n| Flexibility | Moderate | High |\r\n| Complexity | Lower | Higher |\r\n| Use case | Stable routing logic | Changing routing logic |\r\n| Deployment | Rules change = redeploy | Rules change = config update |",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Recipient List: Core Idea",
    "body": "- Single message sent to multiple recipients\r\n- Recipient list can be static (hardcoded) or dynamic (computed per message)\r\n- Different from pub-sub: recipients are explicitly selected, not self-subscribed\r\n- No aggregation of responses (fire-and-forget to each)\r\n- Order of delivery may or may not matter",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Recipient List: Order Flow Example",
    "body": "- When an order is placed, multiple systems need notification:\r\n- Inventory: reserve stock\r\n- Analytics: track conversion\r\n- CRM: update customer profile\r\n- Audit: compliance logging\r\n- Recipient list computed based on order.region and customer.tier",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Comparison: Recipient List vs. Publish-Subscribe",
    "body": "| Aspect | Recipient List | Publish-Subscribe |\r\n| - | - | - |\r\n| Recipient selection | Sender decides | Receiver subscribes |\r\n| Coupling | Sender knows recipients | Sender doesn't know subscribers |\r\n| Use case | Explicit notification list | Topic-based broadcasting |\r\n| Governance | Centralized control | Decentralized |\r\n| Adding recipients | Change sender config | New subscriber self-registers |",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Checkpoint 1: Core Routing Patterns",
    "body": "- Question 1: An order needs to go to different warehouses based on shipping region. Which pattern?\r\n- Question 2: We want to send order confirmations to both Email and SMS services. Which pattern?\r\n- Question 3: What's the key difference between Dynamic Router and Content-Based Router?",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Section 3.3: Advanced Routing Patterns",
    "body": "- Patterns: Splitter, Scatter-Gather, Aggregator\r\n- These patterns handle composite messages and parallel processing",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Splitter: Core Idea",
    "body": "- A composite message (e.g., order with multiple items) is split into individual messages\r\n- Each split message processed independently\r\n- Splitter preserves correlation information for later reassembly\r\n- Split criteria: array elements, XML nodes, JSON fields\r\n- Also called \"Sequencer\" when order must be preserved",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Splitter: Order Flow Example",
    "body": "- Customer places order with 3 items: laptop (physical), software license (digital), support plan (subscription)\r\n- Splitter breaks order into 3 OrderItem messages\r\n- Each item routed to appropriate service via Content-Based Router\r\n- All items share orderId for correlation\r\n- Items can be processed in parallel",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Aggregator: Core Idea",
    "body": "- Collects related messages and combines them into a single message\r\n- Requires: correlation identifier, completion condition, aggregation strategy\r\n- Completion conditions: count-based, timeout-based, content-based\r\n- Aggregation strategies: collect all, first wins, combine results\r\n- Stateful component - must handle message storage",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Aggregator: Completion Conditions Deep Dive",
    "body": "- **Count-based:** \"Wait for exactly N messages\" - requires knowing N upfront\r\n- **Timeout-based:** \"Wait up to T seconds, then complete with whatever arrived\"\r\n- **Content-based:** \"Complete when a specific message type arrives\"\r\n- **Hybrid:** Count with timeout fallback\r\n- Trade-off: wait too long = latency; complete too early = incomplete data",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Aggregator Architecture: State Management",
    "body": "The Critical Challenge: Where do partial messages live while waiting?\r\n- In-Memory Aggregation:\r\n  - Pros: Extremely fast, low complexity.\r\n  - Cons: Data lost on server restart/crash.\r\n  - Use Case: Real-time analytics, non-critical data.\r\n- Persistent Aggregation (Database/Store):\r\n  - Pros: Durability (survives crashes), supports long-wait times.\r\n  - Cons: Higher latency (I/O overhead), storage management.\r\n  - Use Case: Financial transactions, Orders (Critical).\r\nThe \"Claim Check\" Pattern overlap: Storing heavy payloads in a DB and only aggregating references to keep the aggregator light.",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Scatter-Gather: Core Idea",
    "body": "- Request sent to multiple recipients (scatter)\r\n- Responses collected and combined (gather)\r\n- Combines Recipient List + Aggregator\r\n- Use cases: price comparison, parallel validation, distributed search\r\n- Timeout essential - not all recipients may respond",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Scatter-Gather: Order Flow Example",
    "body": "- Scenario: Finding best shipping rate for an order\r\n- Request sent to 3 shipping providers: FedEx, UPS, DHL\r\n- Each returns rate quote\r\n- Aggregator selects lowest rate within 2-second timeout\r\n- If no responses within timeout, use default carrier",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Splitter + Aggregator: Complete Flow",
    "body": "- Order arrives → Splitter breaks into items → items processed in parallel → results aggregated → order status updated\r\n- Correlation ID flows through entire pipeline\r\n- Aggregator completion: \"all items processed\" or \"timeout reached\"\r\n- Final message includes status of each item",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Checkpoint 2: Advanced Routing Patterns",
    "body": "- Question 1: An order has 5 items. After processing, we need to\r\n  send one confirmation. Which patterns are needed?\r\n- Question 2: What happens in Scatter-Gather if one recipient\r\n  never responds?\r\n- Question 3: Why is correlation ID essential for Aggregator?",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Section 3.4: Design Trade-offs",
    "body": "- Moving from patterns to architectural decisions\r\n- How to choose and combine patterns",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Routing vs. Orchestration: Where is the line?",
    "body": "- Routing:\r\n  - \"Stateless\" or \"Short-lived State.\"\r\n  - Decisions based on message content or availability.\r\n  - Example: \"Send to Inventory System A or B?\"\r\n- Orchestration (Session 8):\r\n  - \"Long-lived State.\"\r\n  - Decisions based on business process status.\r\n  - Example: \"Wait 3 days for shipping, if no scan, trigger refund.\"\r\n- Rule of Thumb: If you need a database to track \"what step are we on?\" for days, it's not a Router; it's a Process Manager.",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Performance vs. Flexibility",
    "body": "- More routing logic = more flexibility = more latency\r\n- Direct routing (hardcoded) is fastest but inflexible\r\n- Dynamic routing is flexible but adds lookup overhead\r\n- Caching routing decisions: middle ground\r\n- Measure: What's acceptable latency for your use case?",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Centralized vs. Distributed Routing Logic",
    "body": "| Architecture   | Description                                      | Pros                                      | Cons                                      |\r\n|----------------|--------------------------------------------------|-------------------------------------------|-------------------------------------------|\r\n| Centralized    | Single router component makes all decisions      | Easy to understand, single point of control | Single point of failure, bottleneck at scale |\r\n| Distributed    | Each service makes its own routing decisions     | Scalable, no single point of failure      | Harder to govern, inconsistent decisions possible |\r\n| Hybrid         | Central policy, distributed enforcement          | Balanced control and scalability          | Complexity in implementation              |",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Operational Visibility",
    "body": "- Every routing decision should be traceable\r\n- Logging: which rule matched, where message was sent\r\n- Metrics: messages per route, routing latency, rule match rates\r\n- Distributed tracing: follow a message through the entire flow\r\n- Alerting: unusual routing patterns may indicate problems",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Testing Strategy for Routers",
    "body": "| Strategy            | Description                                                                 | Key Actions                                                                 |\r\n|---------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------|\r\n| Black Box Testing   | Validate system behavior without internal knowledge                          | Inject message into Input Channel, listen on all Output Channels, assert correct routing |\r\n| Mocking Endpoints   | Avoid routing to real production services during tests                      | Use \"Mock\" or \"Stub\" endpoints (e.g., WireMock, Testcontainers)              |\r\n| Boundary Testing    | Test edge cases and unexpected inputs                                        | Test \"Default/Otherwise\" route, malformed headers (check for crashes or routing to Invalid Message Channel) |",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Failure Mode: Message Duplication",
    "body": "- Network failures + retries can cause duplicates\r\n- Recipient List sends to multiple destinations - what if one is a retry?\r\n- Aggregator may receive the same message twice\r\n- Mitigation: Idempotent consumers (from Session 5), deduplication at router\r\n- Track message IDs at each routing decision point",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Failure Mode: Message Ordering Issues",
    "body": "- Parallel processing (Splitter) can cause out-of-order completion\r\n- Different routes have different latencies\r\n- Aggregator receives messages out of sequence\r\n- Does order matter for your use case? Often yes (e.g., balance\r\n- updates)\r\n- Mitigation: Sequence numbers, resequencer pattern, single-threaded processing",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Failure Mode: Partial Failures and Timeouts",
    "body": "- Scatter-Gather: 2 of 3 suppliers respond\r\n- Splitter/Aggregator: 4 of 5 items processed successfully\r\n- Timeout strategies: fail fast vs. wait with fallback\r\n- Business decision: Is partial result acceptable?\r\n- Compensation: What to do with the items that succeeded when one fails?",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Failure Mode: The \"Poison Message\" in Routing",
    "body": "- Scenario: A message arrives with a corrupted header or unexpected format.\r\n- The Risk: The Router tries to inspect it, crashes, restarts, consumes the same message again, and crashes again (Infinite Loop).\r\n- Symptoms: High CPU, massive log files, stalled processing queue.\r\n- Solution:\r\n  - Validate first: Schema validation filter before routing decisions.\r\n  - Dead Letter Queue (DLQ): If a message fails routing logic X times, move it aside.\r\n  - \"Catch-All\" Route: Ensure every 'if/else' has a final 'else' (default path) to prevent unhandled exceptions.",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Failure Mode: Fan-Out Explosion",
    "body": "- Splitter + Recipient List can multiply messages exponentially\r\n- 100 orders × 10 items × 5 recipients = 5,000 messages\r\n- Downstream systems may not handle the load\r\n- Monitoring: message count amplification ratio\r\n- Mitigation: Throttling, circuit breakers, backpressure",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Checkpoint 3: Design Trade-offs and Failures",
    "body": "- Question 1: Your routing adds 50ms latency but enables dynamic rule updates. When is this acceptable?\r\n- Question 2: How would you detect that a Scatter-Gather is receiving duplicate responses?\r\n- Question 3: An order with 1000 items is submitted. What risks does this create?",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Pattern Selection Decision Tree",
    "body": "- Start: \"What routing problem are you solving?\"\r\n- Single destination based on content → Content-Based Router\r\n- Single destination, rules change frequently → Dynamic Router\r\n- Multiple destinations, same message → Recipient List\r\n- Composite message needs breakdown → Splitter\r\n- Multiple responses need combination → Aggregator\r\n- Broadcast + collect responses → Scatter-Gather",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Combining Patterns: Real Architecture",
    "body": "- Complete order processing flow:\r\n  1.  Order arrives → Pipes and Filters (validate, enrich)\r\n  2.  Splitter breaks into items\r\n  3.  Content-Based Router per item type\r\n  4.  Scatter-Gather for shipping rate (physical items only)\r\n  5.  Aggregator combines item results\r\n  6.  Recipient List notifies downstream systems",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Summary: Key Takeaways",
    "body": "- Patterns provide shared vocabulary and proven solutions\r\n- Core patterns: Pipes/Filters, CBR, Dynamic Router, Recipient List\r\n- Advanced patterns: Splitter, Aggregator, Scatter-Gather\r\n- Trade-offs: performance vs. flexibility, centralized vs. distributed\r\n- Failure modes: duplication, ordering, partial failures, fan-out\r\n- Always design for observability",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Lab Introduction: Multi-Item Order Routing",
    "body": "- Goal: Implement a routing flow for multi-item orders\r\n- Technologies: Docker, RabbitMQ, Python/Node.js services\r\n- Patterns to implement: Content-Based Router, Splitter, Aggregator\r\n- Duration: ~60 minutes\r\n- Deliverables: Working code, architecture diagram, pattern justification",
    "visualImage": "/images/slide45.png",
    "noImage": false
  },
  {
    "title": "Lab Architecture Overview",
    "body": "- Components: Order API, Router Service, Inventory Worker, Digital Worker, Aggregator Service\r\n- RabbitMQ as message broker\r\n- Queues: orders.incoming, orders.physical, orders.digital, orders.results\r\n- Flow: API → Router → Workers → Aggregator → Response",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Lab Step 1: Environment Setup",
    "body": "- Clone repository or create project folder\r\n  - Repository: https://github.com/mleitass/turiba-eai-labs.git\r\n  - Check branch: 'master' or 'main'\r\n- Docker Compose: RabbitMQ, services\r\n- Verify RabbitMQ management UI at localhost:15672\r\n- Verify all services start without errors\r\n- Test message publishing via management UI",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Lab Success Criteria",
    "body": "- Order with mixed items (physical + digital) is correctly routed\r\n- Physical items go to Inventory Worker\r\n- Digital items go to Digital Worker\r\n- Aggregator collects all results and produces final order status\r\n- Messages visible in RabbitMQ management UI\r\n- Correlation IDs preserved throughout flow",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Lab Stretch Goals",
    "body": "- Add a third item type: \"subscription\" with its own worker\r\n- Implement Dynamic Router with config file for A/B testing\r\n- Add Scatter-Gather for price comparison across two inventory services\r\n- Implement dead letter queue for failed messages\r\n- Add distributed tracing with correlation ID logging",
    "visualImage": null,
    "noImage": false
  },
  {
    "title": "Session Wrap-up and Next Steps",
    "body": "- Today: Routing patterns - directing messages through systems\r\n- Next session (Session 4): Message Transformation & Canonical Models\r\n- Reading: EIP Book chapters on Message Routing\r\n- Lab deliverables due: Before next session\r\n- Questions: Now or via course forum",
    "visualImage": null,
    "noImage": false
  }
];