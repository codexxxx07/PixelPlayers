// Elder <-> Caregiver linking.
//
// Interface: every function is pure over the in-memory link graph held in
// CareContext (prototype adapter). The graph shape matches the future data
// model:
//   Caregiver { caregiverId, profile, linkedElderIds[] }
//   Elder     { elderId, profile, linkedCaregiverIds[] }
//
// Every caregiver data service calls hasLink() before returning data, which
// simulates the server-side authorization a real backend must perform.

export function hasLink(graph, caregiverId, elderId) {
  if (!graph || !caregiverId || !elderId) return false;
  const caregiver = graph.caregivers.find((c) => c.caregiverId === caregiverId);
  return Boolean(caregiver && caregiver.linkedElderIds.includes(elderId));
}

export function getAuthorizedElders(graph, caregiverId) {
  const caregiver = graph.caregivers.find((c) => c.caregiverId === caregiverId);
  const ids = caregiver ? caregiver.linkedElderIds : [];
  return graph.elders.filter((elder) => ids.includes(elder.elderId));
}

export function getAuthorizedCaregivers(graph, elderId) {
  const elder = graph.elders.find((e) => e.elderId === elderId);
  const ids = elder ? elder.linkedCaregiverIds : [];
  return graph.caregivers.filter((caregiver) => ids.includes(caregiver.caregiverId));
}

// Future-ready API surface. The prototype adapter has no external invite/
// approve flow yet, so these return a resolved "pending" marker instead of a
// promise and never mutate the graph silently.
export function requestLink() {
  return { status: "pending", needsBackend: true };
}

export function approveLink() {
  return { status: "pending", needsBackend: true };
}

export function revokeLink() {
  return { status: "pending", needsBackend: true };
}