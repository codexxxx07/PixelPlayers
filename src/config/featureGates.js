export const featureGates = {
  memory: {
    to: "/memory",
    icon: "💾",
    titleKey: "featurePreview.memory.title",
    descKey: "featurePreview.memory.desc",
    benefitKeys: [
      "featurePreview.memory.benefit1",
      "featurePreview.memory.benefit2",
      "featurePreview.memory.benefit3",
      "featurePreview.memory.benefit4",
    ],
  },
  reminders: {
    to: "/reminders",
    icon: "⏰",
    titleKey: "featurePreview.reminders.title",
    descKey: "featurePreview.reminders.desc",
    benefitKeys: [
      "featurePreview.reminders.benefit1",
      "featurePreview.reminders.benefit2",
      "featurePreview.reminders.benefit3",
      "featurePreview.reminders.benefit4",
    ],
  },
  assistant: {
    to: "/assistant",
    icon: "🤖",
    titleKey: "featurePreview.assistant.title",
    descKey: "featurePreview.assistant.desc",
    benefitKeys: [
      "featurePreview.assistant.benefit1",
      "featurePreview.assistant.benefit2",
      "featurePreview.assistant.benefit3",
      "featurePreview.assistant.benefit4",
      "featurePreview.assistant.benefit5",
    ],
  },
};

export function getFeatureGate(feature) {
  return featureGates[feature] || null;
}