/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { useUser } from "@clerk/react";
import { hasLink, getAuthorizedElders } from "../services/care/links";

const CareContext = createContext(null);

export const DEMO_ELDER_ID = "elder-demo";

function buildDemoGraph(caregiverId) {
  const caregivers = caregiverId
    ? [
        {
          caregiverId,
          profile: { name: "", kind: "primary" },
          linkedElderIds: [DEMO_ELDER_ID],
        },
      ]
    : [];
  const elders = caregiverId
    ? [
        {
          elderId: DEMO_ELDER_ID,
          profile: {
            name: "Maya",
            age: 72,
            relationship: "Mother",
            blurb: "Lives close by and enjoys morning walks, bhajans and her daily games.",
            avatarText: "M",
          },
          linkedCaregiverIds: [caregiverId],
        },
      ]
    : [];
  return { caregivers, elders };
}

export function CareProvider({ children }) {
  const { isLoaded, user } = useUser();
  const caregiverId = isLoaded && user ? user.id : null;

  // Prototype seam: every signed-in caregiver is linked to one demo elder.
  // A real backend would own this graph; nothing here leaks another user's data.
  const graph = useMemo(() => buildDemoGraph(caregiverId), [caregiverId]);

  const authorizedElders = useMemo(
    () => (caregiverId ? getAuthorizedElders(graph, caregiverId) : []),
    [graph, caregiverId]
  );

  const [selectedElderId, setSelectedElderId] = useState(null);

  // Derived safe selection: falls back to the first authorized elder whenever
  // the current pick is no longer authorized (e.g. links change).
  const validElderIds = useMemo(
    () => authorizedElders.map((elder) => elder.elderId),
    [authorizedElders]
  );
  const resolvedSelectedElderId =
    selectedElderId && validElderIds.includes(selectedElderId)
      ? selectedElderId
      : validElderIds[0] ?? null;

  const selectedElder = useMemo(
    () => graph.elders.find((elder) => elder.elderId === resolvedSelectedElderId) ?? null,
    [graph.elders, resolvedSelectedElderId]
  );

  const selectElder = useCallback((elderId) => {
    setSelectedElderId(elderId);
  }, []);

  const checkLink = useCallback(
    (elderId) => hasLink(graph, caregiverId, elderId),
    [graph, caregiverId]
  );

  const [orders, setOrders] = useState([]);

  const addOrder = useCallback((order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrder = useCallback((orderId, updates) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, ...updates } : order))
    );
  }, []);

  const cancelOrder = useCallback((orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  }, []);

  const value = useMemo(
    () => ({
      caregiverId,
      graph,
      authorizedElders,
      selectedElderId: resolvedSelectedElderId,
      selectedElder,
      selectElder,
      checkLink,
      orders,
      addOrder,
      updateOrder,
      cancelOrder,
    }),
    [
      caregiverId,
      graph,
      authorizedElders,
      resolvedSelectedElderId,
      selectedElder,
      selectElder,
      checkLink,
      orders,
      addOrder,
      updateOrder,
      cancelOrder,
    ]
  );

  return <CareContext.Provider value={value}>{children}</CareContext.Provider>;
}

export function useCare() {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error("useCare must be used within a CareProvider");
  }
  return context;
}