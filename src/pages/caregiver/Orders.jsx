import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCare } from "../../context/CareContext";
import {
  ORDER_STEP_SELECT,
  ORDER_STEP_REVIEW,
  ORDER_STEP_CONFIRM,
  ORDER_STEP_STATUS,
  ORDER_STEPS,
  createDemoOrder,
  getOrderStatus,
  advanceDemoStatus,
} from "../../services/care/orders";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  StatusBadge,
  EmptyState,
} from "../../caregiver/components";

export default function Orders() {
  const { t } = useTranslation();
  const { selectedElder, orders, addOrder, updateOrder } = useCare();

  const CATALOG = useMemo(
    () => [
      { id: "demo-med", title: t("caregiver.orders.itemMeds"), price: 299, icon: "💊" },
      { id: "demo-chai", title: t("caregiver.orders.itemChai"), price: 180, icon: "☕" },
      { id: "demo-grocery", title: t("caregiver.orders.itemGroceries"), price: 540, icon: "🛒" },
    ],
    [t]
  );

  const [step, setStep] = useState(ORDER_STEP_SELECT);
  const [selectedIds, setSelectedIds] = useState([]);
  const [acceptedDemo, setAcceptedDemo] = useState(false);

  if (!selectedElder) {
    return (
      <EmptyState
        title={t("caregiver.linked.emptyTitle")}
        text={t("caregiver.linked.emptyText")}
      />
    );
  }

  const toggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cart = CATALOG.filter((item) => selectedIds.includes(item.id));
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    const order = createDemoOrder({ items: cart });
    addOrder(order);
    setSelectedIds([]);
    setAcceptedDemo(false);
    setStep(ORDER_STEP_STATUS);
  };

  const stepIndex = ORDER_STEPS.indexOf(step);

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.orders.kicker")}
        title={t("caregiver.orders.title")}
        subtitle={t("caregiver.orders.subtitle", { name: selectedElder.profile?.name })}
      />

      <div className="cg-disclaimer">{t("caregiver.orders.disclaimer")}</div>

      {/* Wizard stepper */}
      <div className="cg-stepper">
        {ORDER_STEPS.map((s, index) => (
          <div
            key={s}
            className={`cg-step ${
              index === stepIndex ? "cg-step--active" : index < stepIndex ? "cg-step--done" : ""
            }`}
          >
            <span className="cg-step__num">{index < stepIndex ? "✓" : index + 1}</span>
            <span>{t(`caregiver.orders.step${index + 1}`)}</span>
          </div>
        ))}
      </div>

      {step === ORDER_STEP_SELECT && (
        <CareCard pixel>
          <CareSectionTitle icon="🧺">{t("caregiver.orders.selectTitle")}</CareSectionTitle>
          <div className="space-y-3">
            {CATALOG.map((item) => {
              const checked = selectedIds.includes(item.id);
              return (
                <label key={item.id} className="flex items-center gap-3 rounded-xl border-2 border-(--cg-line) p-3.5 cursor-pointer bg-(--cg-surface)">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-teal-600"
                    checked={checked}
                    onChange={() => toggleItem(item.id)}
                  />
                  <span className="text-xl" aria-hidden="true">{item.icon}</span>
                  <span className="min-w-0 flex-1 font-semibold text-sm text-(--cg-text)">{item.title}</span>
                  <span className="text-sm font-bold text-(--cg-text-soft) cg-mono">₹{item.price}</span>
                </label>
              );
            })}
          </div>
          <div className="flex justify-end mt-5">
            <button
              type="button"
              className="cg-btn cg-btn--primary"
              disabled={cart.length === 0}
              onClick={() => setStep(ORDER_STEP_REVIEW)}
            >
              {t("caregiver.orders.next")} →
            </button>
          </div>
        </CareCard>
      )}

      {step === ORDER_STEP_REVIEW && (
        <CareCard pixel>
          <CareSectionTitle icon="🔎">{t("caregiver.orders.reviewTitle")}</CareSectionTitle>
          <ul className="space-y-2.5 mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <span aria-hidden="true">{item.icon}</span>
                <span className="min-w-0 flex-1 font-semibold text-(--cg-text)">{item.title}</span>
                <span className="font-bold text-(--cg-text-soft) cg-mono">₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center py-3 border-t border-(--cg-line) text-sm font-black text-(--cg-text)">
            <span>{t("caregiver.orders.total")}</span>
            <span className="cg-mono text-(--cg-brand-deep)">₹{total}</span>
          </div>
          <div className="flex flex-wrap justify-end gap-3 mt-4">
            <button type="button" className="cg-btn cg-btn--secondary" onClick={() => setStep(ORDER_STEP_SELECT)}>
              ← {t("caregiver.orders.back")}
            </button>
            <button type="button" className="cg-btn cg-btn--primary" onClick={() => setStep(ORDER_STEP_CONFIRM)}>
              {t("caregiver.orders.next")} →
            </button>
          </div>
        </CareCard>
      )}

      {step === ORDER_STEP_CONFIRM && (
        <CareCard>
          <CareSectionTitle icon="✅">{t("caregiver.orders.confirmTitle")}</CareSectionTitle>
          <label className="flex items-start gap-3 rounded-xl border-2 border-(--cg-line) p-4 cursor-pointer bg-(--cg-panel)">
            <input
              type="checkbox"
              className="w-5 h-5 mt-0.5 accent-teal-600"
              checked={acceptedDemo}
              onChange={(event) => setAcceptedDemo(event.target.checked)}
            />
            <span className="text-sm text-(--cg-text-soft) leading-relaxed">{t("caregiver.orders.confirmNote")}</span>
          </label>
          <div className="flex flex-wrap justify-end gap-3 mt-5">
            <button type="button" className="cg-btn cg-btn--secondary" onClick={() => setStep(ORDER_STEP_REVIEW)}>
              ← {t("caregiver.orders.back")}
            </button>
            <button type="button" className="cg-btn cg-btn--primary" disabled={!acceptedDemo} onClick={placeOrder}>
              {t("caregiver.orders.placeOrder")}
            </button>
          </div>
        </CareCard>
      )}

      {step === ORDER_STEP_STATUS && (
        <div className="space-y-4">
          <CareCard>
            <CareSectionTitle icon="📦">{t("caregiver.orders.ordersTitle")}</CareSectionTitle>
            <div className="flex justify-end">
              <button
                type="button"
                className="cg-btn cg-btn--secondary cg-btn--sm"
                onClick={() => {
                  setAcceptedDemo(false);
                  setStep(ORDER_STEP_SELECT);
                }}
              >
                ➕ {t("caregiver.orders.newOrder")}
              </button>
            </div>
            {orders.length === 0 ? (
              <p className="text-sm text-(--cg-text-muted) mt-2">{t("caregiver.orders.noOrders")}</p>
            ) : (
              <div className="space-y-4 mt-2">
                {orders.map((order) => {
                  const status = getOrderStatus(order);
                  return (
                    <div key={order.id} className="rounded-xl border-2 border-(--cg-line) p-4">
                      <div className="flex items-center gap-3 flex-wrap mb-3">
                        <span className="font-black text-sm text-(--cg-text)">{t("caregiver.orders.orderId", { id: order.id })}</span>
                        <span className="text-[12px] text-(--cg-text-muted)">{order.placedAt}</span>
                        <span className="ml-auto">
                          <StatusBadge tone="brand" label={t("caregiver.orders.demoBadge")} dot={false} />
                        </span>
                      </div>
                      <div className="cg-stepper">
                        {(["placed", "processing", "out-for-delivery", "delivered"]).map((state, index) => (
                          <div
                            key={state}
                            className={`cg-step ${
                              status.index >= index
                                ? index === status.index && status.index < 3
                                  ? "cg-step--active"
                                  : "cg-step--done"
                                : ""
                            }`}
                          >
                            <span className="cg-step__num">{status.index > index ? "✓" : index + 1}</span>
                            <span>{t(`caregiver.orders.state.${state}`)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-between items-center gap-3 mt-4">
                        <span className="text-sm font-bold text-(--cg-text-soft)">
                          {t("caregiver.orders.items")}: {order.items.length} · {t("caregiver.orders.total")} <span className="cg-mono">₹{order.total}</span>
                        </span>
                        {status.index < 3 && (
                          <button
                            type="button"
                            className="cg-btn cg-btn--secondary cg-btn--sm"
                            onClick={() => updateOrder(order.id, advanceDemoStatus(order))}
                          >
                            {t("caregiver.orders.simulate")} →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CareCard>
          <div className="cg-note">{t("caregiver.orders.simulationNote")}</div>
        </div>
      )}
    </div>
  );
}