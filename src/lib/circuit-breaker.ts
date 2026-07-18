export type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface CircuitBreakerOptions {
  failureThreshold?: number;
  cooldownMs?: number;
}

/**
 * Minimal per-provider circuit breaker.
 *
 * States:
 *  - CLOSED: normal operation. Failures are counted; once they exceed the
 *    threshold the breaker trips to OPEN.
 *  - OPEN: calls are rejected immediately (returns false from `allowRequest`).
 *    After cooldownMs elapses, transitions to HALF_OPEN.
 *  - HALF_OPEN: a single probe request is permitted. A success resets to
 *    CLOSED; a failure returns to OPEN (resets the cooldown timer).
 */
export class CircuitBreaker {
  readonly failureThreshold: number;
  readonly cooldownMs: number;

  private state: CircuitState = "CLOSED";
  private failureCount = 0;
  private openedAt = 0;

  constructor(opts: CircuitBreakerOptions = {}) {
    this.failureThreshold = opts.failureThreshold ?? 3;
    this.cooldownMs = opts.cooldownMs ?? 60_000;
  }

  getState(): CircuitState {
    if (this.state === "OPEN" && Date.now() - this.openedAt >= this.cooldownMs) {
      this.state = "HALF_OPEN";
    }
    return this.state;
  }

  allowRequest(): boolean {
    return this.getState() !== "OPEN";
  }

  recordSuccess(): void {
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  recordFailure(): void {
    this.failureCount += 1;
    if (this.failureCount >= this.failureThreshold) {
      this.trip();
    }
  }

  trip(): void {
    this.state = "OPEN";
    this.openedAt = Date.now();
  }

  reset(): void {
    this.failureCount = 0;
    this.state = "CLOSED";
  }
}
