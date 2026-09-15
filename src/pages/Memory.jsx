import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import MemoryCard from '../components/MemoryCard';

const categories = [
  { id: 'hobbies', labelKey: 'memory.catHobbies', icon: '🎨' },
  { id: 'food', labelKey: 'memory.catFood', icon: '🍛' },
  { id: 'places', labelKey: 'memory.catPlaces', icon: '🏞️' },
  { id: 'occupation', labelKey: 'memory.catOccupation', icon: '💼' },
  { id: 'childhood', labelKey: 'memory.catChildhood', icon: '🧒' },
  { id: 'people', labelKey: 'memory.catPeople', icon: '👨‍👩‍👧' },
  { id: 'songs', labelKey: 'memory.catSongs', icon: '🎵' },
  { id: 'memories', labelKey: 'memory.catMemories', icon: '💭' },
  { id: 'preferences', labelKey: 'memory.catPreferences', icon: '⚙️' },
];

const categoryPrompts = {
  hobbies: 'memory.promptHobbies',
  food: 'memory.promptFood',
  places: 'memory.promptPlaces',
  occupation: 'memory.promptOccupation',
  childhood: 'memory.promptChildhood',
  people: 'memory.promptPeople',
  songs: 'memory.promptSongs',
  memories: 'memory.promptMemories',
  preferences: 'memory.promptPreferences',
};

function VoiceButton({ onClick, size = 'md', className = '' }) {
  const { t } = useTranslation();
  const sizes = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-95 transition-all duration-200 ${sizes[size]} ${className}`}
      aria-label={t('memory.voiceInput')}
    >
      🎤
    </button>
  );
}

export default function Memory() {
  const { memories, addMemory, deleteMemory, updateMemory } = useApp();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [newMemoryTitle, setNewMemoryTitle] = useState('');
  const [newMemoryDescription, setNewMemoryDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, role: 'ai', textKey: 'memory.chatGreeting' },
    { id: 2, role: 'ai', textKey: 'memory.chatFavouriteFood' },
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
        textKey: 'memory.chatSaved',
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
            {t('memory.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            {t('memory.subtitle')}
          </p>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto italic">
            {t('memory.profileHint')}
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
                <span className="font-[family-name:var(--font-pixel)] text-[10px]">{t(cat.labelKey)}</span>
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
                {activeCat.icon} {t(categories.find((c) => c.id === activeCategory).labelKey)}
              </h2>
              {filteredMemories.length === 0 ? (
                <PixelCard className="p-8 text-center">
                  <span className="text-4xl block mb-4">📝</span>
                  <p className="text-gray-500 text-lg">
                    {t('memory.noMemories')}
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
                {editingId ? t('memory.editMemory') : t('memory.tellMeAboutYou')}
              </h2>
              <p className="text-gray-500 text-sm mb-4 italic">
                {t(categoryPrompts[activeCategory])}
              </p>
              <input
                type="text"
                value={newMemoryTitle}
                onChange={(e) => setNewMemoryTitle(e.target.value)}
                placeholder={t('memory.placeholderTitle')}
                className="w-full border-2 border-amber-200 rounded-xl p-4 text-lg text-gray-700 bg-amber-50/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all placeholder:text-gray-300 mb-3"
              />
              <textarea
                value={newMemoryDescription}
                onChange={(e) => setNewMemoryDescription(e.target.value)}
                placeholder={t('memory.placeholderDescription')}
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
                  {editingId ? t('memory.updateMemory') : t('memory.saveMemory')}
                </PixelButton>
                {editingId && (
                  <PixelButton
                    onClick={handleCancelEdit}
                    variant="secondary"
                    size="lg"
                    icon="✕"
                  >
                    {t('memory.cancel')}
                  </PixelButton>
                )}
              </div>
            </PixelCard>
          </div>

          {/* Right Column: Voice Conversation Panel */}
          <div className="lg:col-span-2">
            <PixelCard className="p-6 md:p-8 lg:sticky lg:top-8">
              <h2 className="font-[family-name:var(--font-pixel)] text-amber-700 text-sm mb-4 tracking-wide">
                {t('memory.talkToCompanion')}
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
                      {msg.textKey ? t(msg.textKey) : msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-amber-100 text-amber-800 rounded-2xl rounded-bl-sm px-4 py-3 text-sm">
                      <span className="text-lg mr-1">🤖</span>
                      <span className="animate-pulse">{t('memory.thinking')}</span>
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
                  placeholder={t('memory.typeOrSpeak')}
                  className="flex-1 border-2 border-amber-200 rounded-xl px-4 py-3 text-sm text-gray-700 bg-amber-50/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all placeholder:text-gray-300 min-h-[48px]"
                />
                <PixelButton onClick={handleChatSend} variant="primary" size="md" icon="➤">
                  {t('memory.send')}
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
                {t('memory.privacyNotice')}
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('memory.privacyDesc')}
            </p>
            <p className="text-gray-400 text-xs mt-2 italic">
              {t('memory.privacyHint')}
            </p>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
