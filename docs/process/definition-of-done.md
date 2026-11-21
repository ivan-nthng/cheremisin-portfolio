# Definition Of Done

Work is done only when:

1. the change exists
2. relevant validation ran
3. expected behavior was verified
4. no known broken state remains
5. docs were updated when needed

For implementation, debugging, or behavior-changing work, define before closure:

1. the observable result
2. the preserved boundaries
3. the relevant test inventory
4. the condition that keeps the task open

`Implementation DoD: Passed` requires every required owner-level check to pass. Skipped checks must include their reason and coverage consequence.

Independent browser, cross-route, deployment, or release acceptance is a separate `Global QA Acceptance` gate when required. Owner-level validation is not a substitute for independent QA, and QA must not implement fixes during acceptance.
