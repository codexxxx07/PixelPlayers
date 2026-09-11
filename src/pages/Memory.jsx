import { useState } from 'react';
import { useApp } from '../context/AppContext';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import MemoryCard from '../components/MemoryCard';

const categories = [
  { id: 'hobbies', label: 'My Hobbies', icon: '🎨' },
  { id: 'food', label: 'My Favourite Food', icon: '🍛' },
  { id: 'places', label: 'Places I Love', icon: '🏞️' },
  { id: 'occupation', label: 'My Occupation', icon: '💼' },
  { id: 'childhood', label: 'My Childhood', icon: '🧒' },
  { id: 'people', label: 'Important People', icon: '👨‍👩‍👧' },
  { id: 'songs', label: 'Favourite Songs', icon: '🎵' },
  { id: 'memories', label: 'Important Memories', icon: '💭' },
  { id: 'preferences', label: 'Daily Preferences', icon: '⚙️' },
];

const categoryPrompts = {
  hobbies: 'What hobbies did you enjoy when you were younger?',
  food: 'What is your favourite food? Tell us about meals that remind you of home.',
  places: 'What is a place that holds special memories for you?',
  occupation: 'What did you do for work? What are you most proud of?',
  childhood: 'What is your favourite childhood memory?',
  people: 'Who are the most important people in your life?',
  songs: 'What songs make you feel happy or bring back memories?',
  memories: 'What is an event or moment you will never forget?',
  preferences: 'What does your perfect day look like? Morning routines, tea time, anything!',
};

function VoiceButton({ onClick, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-95 transition-all duration-200 ${sizes[size]} ${className}`}
      aria-label="Voice input"
    >
      🎤
    </button>
  );
}

export default function Memory() {
  const { memories, addMemory, deleteMemory, updateMemory } = useApp();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [newMemoryTitle, setNewMemoryTitle] = useState('');
  const [newMemoryDescription, setNewMemoryDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: 'ai', text: 'Hello! I am your Memory Companion. Tell me something about yourself and I will help you remember it forever.' },
    { id: 2, role: 'ai', text: 'What is your favourite food?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const filteredMemories = memories.filter((m) => m.category === activeCategory);
  const activeCat = categories.find((c) => c.id === activeCategory);

  const handleSaveMemory = () => {
    if (!newMemoryTitle.trim()) return;
    const data = {
      title: newMemoryTitle.trim(),
      description: newMemoryDescription.trim(),
      category: activeCategory,
      icon: activeCat.icon,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
    if (editingId) {
      updateMemory(editingId, data);
    } else {
      addMemory(data);
    }
    setNewMemoryTitle('');
    setNewMemoryDescription('');
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewMemoryTitle('');
    setNewMemoryDescription('');
  };

  const handleChatSend = () => {
    if (!chatInput.trim() || isTyping) return;
    const userMsg = { id: Date.now(), role: 'user', text: chatInput.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    const savedText = chatInput.trim();
    setChatInput('');
    setIsTyping(true);

    addMemory({
      title: savedText,
      description: savedText,
      category: activeCategory,
      icon: activeCat.icon,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    });

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: 'That is wonderful! I have saved that to your Memory Vault. Would you like to tell me anything else?',
      };
      setChatMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleEdit = (memory) => {
    setNewMemoryTitle(memory.title);
    setNewMemoryDescription(memory.description || '');
    setEditingId(memory.id);
    if (memory.category) setActiveCategory(memory.category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-4xl text-amber-700 mb-3 tracking-wide">
            My Memory Vault
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Your personal collection of meaningful moments
          </p>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto italic">
            Tell us about yourself and we will build your personal memory profile.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border-2 min-h-[48px] ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white border-amber-200 text-amber-700 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="font-[family-name:var(--font-pixel)] text-[10px]">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column: Memory List + Add Memory */}
          <div className="lg:col-span-3 space-y-8">
            {/* Memory List */}
            <div>
              <h2 className="font-[family-name:var(--font-pixel)] text-amber-700 text-sm mb-4 tracking-wide">
                {activeCat.icon} {activeCat.label}
              </h2>
              {filteredMemories.length === 0 ? (
                <PixelCard className="p-8 text-center">
                  <span className="text-4xl block mb-4">📝</span>
                  <p className="text-gray-500 text-lg">
                    No memories in this category yet. Tap &apos;Add Memory&apos; to start!
                  </p>
                </PixelCard>
              ) : (
                <div className="space-y-4">
                  {filteredMemories.map((memory) => (
                    <MemoryCard
                      key={memory.id}
                      memory={memory}
                      onEdit={handleEdit}
                      onDelete={(m) => deleteMemory(m.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Add Memory Section */}
            <PixelCard className="p-6 md:p-8">
              <h2 className="font-[family-name:var(--font-pixel)] text-amber-700 text-sm mb-2 tracking-wide">
                {editingId ? 'Edit This Memory' : 'Tell Me About You'}
              </h2>
              <p className="text-gray-500 text-sm mb-4 italic">
                {categoryPrompts[activeCategory]}
              </p>
              <input
                type="text"
                value={newMemoryTitle}
                onChange={(e) => setNewMemoryTitle(e.target.value)}
                placeholder="Give this memory a title..."
                className="w-full border-2 border-amber-200 rounded-xl p-4 text-lg text-gray-700 bg-amber-50/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all placeholder:text-gray-300 mb-3"
              />
              <textarea
                value={newMemoryDescription}
                onChange={(e) => setNewMemoryDescription(e.target.value)}
                placeholder="Tell us more about this memory..."
                rows={4}
                className="w-full border-2 border-amber-200 rounded-xl p-4 text-lg text-gray-700 bg-amber-50/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all resize-none placeholder:text-gray-300"
              />
              <div className="flex items-center gap-4 mt-4">
                <VoiceButton onClick={() => {}} size="md" />
                <PixelButton
                  onClick={handleSaveMemory}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  icon={editingId ? "✏️" : "💾"}
                >
                  {editingId ? "Update Memory" : "Save Memory"}
                </PixelButton>
                {editingId && (
                  <PixelButton
                    onClick={handleCancelEdit}
                    variant="secondary"
                    size="lg"
                    icon="✕"
                  >
                    Cancel
                  </PixelButton>
                )}
              </div>
            </PixelCard>
          </div>

          {/* Right Column: Voice Conversation Panel */}
          <div className="lg:col-span-2">
            <PixelCard className="p-6 md:p-8 lg:sticky lg:top-8">
              <h2 className="font-[family-name:var(--font-pixel)] text-amber-700 text-sm mb-4 tracking-wide">
                Talk to Your Companion
              </h2>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-1">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'ai'
                          ? 'bg-amber-100 text-amber-800 rounded-bl-sm'
                          : 'bg-teal-600 text-white rounded-br-sm'
                      }`}
                    >
                      {msg.role === 'ai' && (
                        <span className="text-lg mr-1">🤖</span>
                      )}
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-amber-100 text-amber-800 rounded-2xl rounded-bl-sm px-4 py-3 text-sm">
                      <span className="text-lg mr-1">🤖</span>
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-3">
                <VoiceButton onClick={() => {}} size="sm" />
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Type or speak..."
                  className="flex-1 border-2 border-amber-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-amber-50/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all placeholder:text-gray-300 min-h-[48px]"
                />
                <PixelButton onClick={handleChatSend} variant="primary" size="md" icon="➤">
                  Send
                </PixelButton>
              </div>
            </PixelCard>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 text-center">
          <PixelCard variant="inset" className="px-8 py-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🔒</span>
              <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs tracking-wide">
                Privacy Notice
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your memories are private. You control what is stored and shared.
            </p>
            <p className="text-gray-400 text-xs mt-2 italic">
              No photos required &mdash; just tell us about yourself.
            </p>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
