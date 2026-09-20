/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useUser } from '@clerk/react';
import { getUserDisplayName } from '../utils/displayName';
import { GAMES } from '../games/games';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { isLoaded: userLoaded, user: clerkUser } = useUser();

  const user = useMemo(() => ({
    name: userLoaded && clerkUser ? getUserDisplayName(clerkUser) : "",
    greeting: "Good Morning",
    age: 72,
  }), [userLoaded, clerkUser]);

  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(interval);
  }, []);

  const [memories, setMemories] = useState([
    {
      id: "mem-hobby-knitting",
      category: "hobbies",
      title: "Knitting shawls",
      description: "Used to knit sweaters and shawls for the whole family every winter. Best remembered the 'V' pattern stitch.",
      date: "Winter evenings, 2008",
      icon: "🧶",
      favorite: true,
    },
    {
      id: "mem-hobby-gardening",
      category: "hobbies",
      title: "Rose garden",
      description: "Grew roses and marigolds in the courtyard. The 'Gulab' bush near the window always bloomed first.",
      date: "Every monsoon",
      icon: "🌹",
      favorite: true,
    },
    {
      id: "mem-hobby-bhajans",
      category: "hobbies",
      title: "Evening bhajans",
      description: "Led bhajan singing at the local temple every Thursday. Knew every verse of 'Raghupati Raghava'.",
      date: "Thursdays",
      icon: "🎵",
      favorite: false,
    },
    {
      id: "mem-food-biryani",
      category: "food",
      title: "Hyderabadi biryani",
      description: "My daughter's favourite. Always cooked it for her birthday with extra saffron and fried onions.",
      date: "Every birthday",
      icon: "🍛",
      favorite: true,
    },
    {
      id: "mem-food-dal-chawal",
      category: "food",
      title: "Dal chawal",
      description: "Simple dal chawal with a spoon of ghee and achar — my comfort food. Made it every Tuesday.",
      date: "Most days",
      icon: "🍚",
      favorite: false,
    },
    {
      id: "mem-food-chai",
      category: "food",
      title: "Cutting chai",
      description: "The cutting chai from the stall near the station, half a glass, ready by 4 PM sharp.",
      date: "Every evening",
      icon: "☕",
      favorite: true,
    },
    {
      id: "mem-places-ladakh",
      category: "places",
      title: "Ladakh trip",
      description: "Drove through the mountains in 1995 with my husband. Remembered the prayer flags at every pass.",
      date: "Summer 1995",
      icon: "🏔️",
      favorite: true,
    },
    {
      id: "mem-places-bangalore",
      category: "places",
      title: "Basavanagudi market",
      description: "Saturday mornings spent buying fresh vegetables from Aunty Shanti's corner stall.",
      date: "Weekends",
      icon: "🛒",
      favorite: false,
    },
    {
      id: "mem-occupation-teacher",
      category: "occupation",
      title: "School teacher",
      description: "Taught mathematics at the government girls' high school for 32 years. My students called me 'Ma'am Maya'.",
      date: "1969 - 2001",
      icon: "📚",
      favorite: true,
    },
    {
      id: "mem-occupation-account",
      category: "occupation",
      title: "Household accounts",
      description: "Kept the household account book with fountain pen. Still remember the month we saved 500 rupees.",
      date: "Most of my life",
      icon: "📒",
      favorite: false,
    },
    {
      id: "mem-childhood-well",
      category: "childhood",
      title: "The village well",
      description: "Grew up near the village well. We would fetch water before sunrise and play hopscotch in the shade.",
      date: "Childhood, 1955 - 1965",
      icon: "🪣",
      favorite: true,
    },
    {
      id: "mem-childhood-mango",
      category: "childhood",
      title: "Mango tree",
      description: "The mango tree behind the house where I learned to climb. Papa said I was as quick as a squirrel.",
      date: "Every summer",
      icon: "🥭",
      favorite: false,
    },
    {
      id: "mem-people-husband",
      category: "people",
      title: "My husband, Ramesh",
      description: "Met him at a wedding in 1968. He always bought me jasmine flowers on payday.",
      date: "1968",
      icon: "💐",
      favorite: true,
    },
    {
      id: "mem-people-son",
      category: "people",
      title: "My son, Arjun",
      description: "Born on a rainy July day. He cried so loudly the whole maternity ward knew his name.",
      date: "July 1972",
      icon: "👶",
      favorite: true,
    },
    {
      id: "mem-songs-film",
      category: "songs",
      title: "Film songs",
      description: "Could hum every Kishore Kumar melody. 'Zindagi Ek Safar' is still my morning mood-lifter.",
      date: "1970s onwards",
      icon: "🎶",
      favorite: true,
    },
    {
      id: "mem-songs-cradle",
      category: "songs",
      title: "Cradle song",
      description: "The lullaby my mother sang to me — I sang it to both my children, and now to my granddaughter.",
      date: "Forever",
      icon: "🛏️",
      favorite: false,
    },
    {
      id: "mem-memories-wedding",
      category: "memories",
      title: "Wedding day",
      description: "Wore a rose-pink silk saree, walked seven steps around the fire with the chooda jingling.",
      date: "May 1968",
      icon: "💍",
      favorite: true,
    },
    {
      id: "mem-memories-diwaliday",
      category: "memories",
      title: "Diwali night",
      description: "The year the whole street lit lamps together — the glow reached our balcony like golden daylight.",
      date: "One special Diwali",
      icon: "🪔",
      favorite: false,
    },
    {
      id: "mem-prefs-chai",
      category: "preferences",
      title: "Strong, milky chai",
      description: "Two spoons of sugar, simmered long, with cardamom. Never coffee — 'coffee is for the railway station'.",
      date: "Always",
      icon: "🫖",
      favorite: true,
    },
    {
      id: "mem-prefs-walks",
      category: "preferences",
      title: "Morning walks",
      description: "Prefer a slow, early morning walk over the park ground before the heat — with the sparrows for company.",
      date: "Daily",
      icon: "🐦",
      favorite: true,
    },
  ]);

  const [routine, setRoutine] = useState([
    {
      id: "routine-breakfast",
      time: "08:30",
      title: "Breakfast",
      description: "Comforting breakfast with chai",
      icon: "🥣",
      completed: true,
    },
    {
      id: "routine-game",
      time: "09:30",
      title: "Cognitive game",
      description: "Daily brain exercise",
      icon: "🧠",
      completed: false,
    },
    {
      id: "routine-lunch",
      time: "12:30",
      title: "Lunch",
      description: "Main meal of the day",
      icon: "🍲",
      completed: false,
    },
    {
      id: "routine-rest",
      time: "14:00",
      title: "Afternoon rest",
      description: "Quiet nap and relaxation",
      icon: "😴",
      completed: false,
    },
    {
      id: "routine-walk",
      time: "17:00",
      title: "Evening walk",
      description: "Gentle stroll in the park",
      icon: "🚶‍♀️",
      completed: false,
    },
    {
      id: "routine-dinner",
      time: "19:30",
      title: "Dinner",
      description: "Light dinner before night",
      icon: "🍛",
      completed: false,
    },
    {
      id: "routine-evening",
      time: "20:30",
      title: "Evening activity",
      description: "Family time and stories",
      icon: "🪑",
      completed: false,
    },
  ]);

  const [reminders, setReminders] = useState([
    {
      id: "rem-med-morning",
      type: "medication",
      title: "Morning medication",
      description: "Take heart + vitamins tablets",
      time: "08:00",
      icon: "💊",
      important: true,
      completed: false,
      recurring: true,
    },
    {
      id: "rem-med-night",
      type: "medication",
      title: "Night medication",
      description: "Take blood pressure tablet",
      time: "20:00",
      icon: "💊",
      important: true,
      completed: false,
      recurring: true,
    },
    {
      id: "rem-water",
      type: "hydration",
      title: "Drink water",
      description: "Time for a glass of water",
      time: "11:00",
      icon: "💧",
      important: false,
      completed: false,
      recurring: true,
    },
    {
      id: "rem-appointment",
      type: "appointment",
      title: "Doctor appointment",
      description: "Dr. Mehta — general checkup",
      time: "11:30",
      date: "Tomorrow",
      icon: "🩺",
      important: true,
      completed: false,
      recurring: false,
    },
    {
      id: "rem-call",
      type: "activity",
      title: "Video call with Arjun",
      description: "Weekly call with your son",
      time: "18:00",
      date: "Today",
      icon: "📞",
      important: false,
      completed: false,
      recurring: false,
    },
  ]);

  const [games] = useState(() =>
    GAMES.map((game) => ({
      ...game,
      name: game.title,
      href: `/games/${game.id}`,
      duration: "A few minutes",
      skillTarget: game.category,
    }))
  );

  const [progressData] = useState({
    gamesCompleted: 128,
    accuracy: 86,
    avgResponseTime: "12.4s",
    streak: 9,
    weeklyData: [
      { day: "Mon", games: 4, accuracy: 88 },
      { day: "Tue", games: 3, accuracy: 82 },
      { day: "Wed", games: 5, accuracy: 91 },
      { day: "Thu", games: 2, accuracy: 78 },
      { day: "Fri", games: 4, accuracy: 84 },
      { day: "Sat", games: 3, accuracy: 89 },
      { day: "Sun", games: 5, accuracy: 92 },
    ],
  });

  const [supportNetwork, setSupportNetwork] = useState([
    {
      id: "support-arjun",
      name: "Arjun",
      relationship: "Son",
      phone: "+91 98765 43210",
      role: "Primary caregiver",
      icon: "👨‍👩‍👧",
      trusted: true,
      sos: true,
      permission: "full",
      lastCheckIn: "Today, 8:45 AM",
    },
    {
      id: "support-meera",
      name: "Meera",
      relationship: "Friend",
      phone: "+91 91234 56780",
      role: "Neighbour & friend",
      icon: "👭",
      trusted: true,
      sos: false,
      permission: "progress",
      lastCheckIn: "Yesterday",
    },
    {
      id: "support-lakshmi",
      name: "Lakshmi",
      relationship: "Caregiver",
      phone: "+91 99887 76655",
      role: "Daily caregiver",
      icon: "🩷",
      trusted: true,
      sos: true,
      permission: "full",
      lastCheckIn: "3 days ago",
    },
  ]);

  const [activityLog, setActivityLog] = useState([
    {
      id: "activity-1",
      type: "game",
      title: "Completed Picture Recall",
      detail: "Scored 90% accuracy",
      timestamp: "Today, 9:45 AM",
      icon: "🖼️",
    },
    {
      id: "activity-2",
      type: "memory",
      title: "Added a memory",
      detail: "\"The village well\" was saved",
      timestamp: "Yesterday",
      icon: "📝",
    },
    {
      id: "activity-3",
      type: "routine",
      title: "Finished morning walk",
      detail: "Walked for 20 minutes",
      timestamp: "Yesterday",
      icon: "🚶‍♀️",
    },
    {
      id: "activity-4",
      type: "support",
      title: "Video call with Arjun",
      detail: "Talked for 25 minutes",
      timestamp: "2 days ago",
      icon: "📞",
    },
  ]);

  const [settings, setSettings] = useState({
    language: "en",
    textSize: "large",
    voiceEnabled: true,
    voiceInput: true,
    readAloud: false,
    notifications: true,
    highContrast: false,
    reduceAnimations: false,
    largeIcons: true,
    activityReminders: true,
    medicationReminders: true,
    routineNotifications: true,
    progressUpdates: true,
    supportNetworkUpdates: true,
    shareProgress: true,
    shareRoutine: true,
    shareMemories: false,
    allowEmergencySOS: true,
    shareAnonymousData: false,
  });

  const addMemory = useCallback((memory) => {
    setMemories((prev) => [
      ...prev,
      {
        id: generateId("mem"),
        ...memory,
        favorite: memory.favorite ?? false,
      },
    ]);
  }, []);

  const deleteMemory = useCallback((id) => {
    setMemories((prev) => prev.filter((memory) => memory.id !== id));
  }, []);

  const updateMemory = useCallback((id, data) => {
    setMemories((prev) =>
      prev.map((memory) => (memory.id === id ? { ...memory, ...data } : memory))
    );
  }, []);

  const addReminder = useCallback((reminder) => {
    setReminders((prev) => [
      ...prev,
      {
        id: generateId("rem"),
        completed: false,
        important: reminder.important ?? false,
        recurring: reminder.recurring ?? false,
        ...reminder,
      },
    ]);
  }, []);

  const deleteReminder = useCallback((id) => {
    setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
  }, []);

  const toggleReminder = useCallback((id) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }, []);

  const addSupportPerson = useCallback((person) => {
    setSupportNetwork((prev) => [
      ...prev,
      {
        id: generateId("support"),
        trusted: person.trusted ?? true,
        ...person,
      },
    ]);
  }, []);

  const deleteSupportPerson = useCallback((id) => {
    setSupportNetwork((prev) => prev.filter((person) => person.id !== id));
  }, []);

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateRoutine = useCallback((id, data) => {
    setRoutine((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  }, []);

  const toggleRoutine = useCallback((id) => {
    setRoutine((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }, []);

  const logActivity = useCallback((activity) => {
    setActivityLog((prev) => [
      {
        id: generateId("activity"),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        ...activity,
      },
      ...prev,
    ]);
  }, []);

  const value = useMemo(
    () => ({
      user,
      currentTime,
      memories,
      routine,
      reminders,
      games,
      progressData,
      supportNetwork,
      activityLog,
      settings,
      language: settings.language,
      addMemory,
      deleteMemory,
      updateMemory,
      addReminder,
      deleteReminder,
      toggleReminder,
      addSupportPerson,
      deleteSupportPerson,
      updateSettings,
      updateRoutine,
      toggleRoutine,
      logActivity,
    }),
    [
      user,
      currentTime,
      memories,
      routine,
      reminders,
      games,
      progressData,
      supportNetwork,
      activityLog,
      settings,
      addMemory,
      deleteMemory,
      updateMemory,
      addReminder,
      deleteReminder,
      toggleReminder,
      addSupportPerson,
      deleteSupportPerson,
      updateSettings,
      updateRoutine,
      toggleRoutine,
      logActivity,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function generateId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}