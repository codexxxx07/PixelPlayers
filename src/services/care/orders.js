// Ordering service abstraction for medicines + groceries.
//
// Demo adapter only — never performs a real transaction. Every status flowing
// from this module is labelled "Demo" by the UI. The `createDemoOrder` factory
// returns a real shape (id, items, total, status, timeline) so a future real
// pharmacy/grocery integration can replace the adapter behind the same surface.

export const ORDER_STEP_SELECT = "select";
export const ORDER_STEP_REVIEW = "review";
export const ORDER_STEP_CONFIRM = "confirm";
export const ORDER_STEP_STATUS = "status";

export const ORDER_STEPS = [
  ORDER_STEP_SELECT,
  ORDER_STEP_REVIEW,
  ORDER_STEP_CONFIRM,
  ORDER_STEP_STATUS,
];

export const DEMO_STATUS_FLOW = ["placed", "processing", "out-for-delivery", "delivered"];

export function createDemoOrder({ items = [] }, now = new Date()) {
  const id = `order-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return {
    id,
    demo: true,
    items,
    total,
    status: "placed",
    placedAt: now.toLocaleString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function getOrderStatus(order) {
  if (!order) return null;
  return {
    label: order.status,
    demo: Boolean(order.demo),
    index: DEMO_STATUS_FLOW.indexOf(order.status),
  };
}

export function advanceDemoStatus(order) {
  const index = DEMO_STATUS_FLOW.indexOf(order.status);
  const next = DEMO_STATUS_FLOW[Math.min(index + 1, DEMO_STATUS_FLOW.length - 1)];
  return { ...order, status: next };
}

export function nextStep(currentStep) {
  const index = ORDER_STEPS.indexOf(currentStep);
  if (index < 0 || index >= ORDER_STEPS.length - 1) return null;
  return ORDER_STEPS[index + 1];
}