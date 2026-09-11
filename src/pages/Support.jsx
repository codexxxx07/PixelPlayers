import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { PixelCard, PixelButton } from '../components/';

const relationshipOptions = [
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧', color: 'bg-amber-400', active: 'border-amber-500 bg-amber-50 text-amber-800' },
  { id: 'friend', label: 'Friend', icon: '🤝', color: 'bg-sky-400', active: 'border-sky-500 bg-sky-50 text-sky-800' },
  { id: 'caregiver', label: 'Caregiver', icon: '🏥', color: 'bg-rose-400', active: 'border-rose-500 bg-rose-50 text-rose-800' },
  { id: 'neighbour', label: 'Neighbour', icon: '🏘️', color: 'bg-emerald-400', active: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
  { id: 'community', label: 'Community Worker', icon: '👥', color: 'bg-violet-400', active: 'border-violet-500 bg-violet-50 text-violet-800' },
];

const permissionOptions = [
  { id: 'progress', label: 'View Progress Only', description: 'They can see your game progress' },
  { id: 'routine', label: 'View Routine', description: 'They can see your daily routine' },
  { id: 'full', label: 'Full Access', description: 'They can see progress, routine, and memories' },
];

const permissionLabels = {
  progress: 'Can view progress',
  routine: 'Can view routine',
  full: 'Full access',
};

const checkInFallbacks = ['Today, 8:45 AM', 'Yesterday', '3 days ago'];

function getRelationshipLabel(relationship) {
  const r = (relationship || '').toLowerCase();
  if (
    r.includes('family') ||
    r.includes('son') ||
    r.includes('daughter') ||
    r.includes('husband') ||
    r.includes('wife') ||
    r.includes('grand')
  ) {
    return 'Family';
  }
  if (r.includes('friend')) return 'Friend';
  if (r.includes('care') || r.includes('nurse') || r.includes('doctor')) return 'Caregiver';
  if (r.includes('neighbour') || r.includes('neighbor')) return 'Neighbour';
  if (r.includes('commun')) return 'Community Worker';
  return 'Family';
}

function getRelationshipOption(relationship) {
  const label = getRelationshipLabel(relationship).toLowerCase();
  return (
    relationshipOptions.find((option) => option.label.toLowerCase() === label) ||
    relationshipOptions[0]
  );
}

function getPermissionLabel(permission) {
  return permissionLabels[permission] || permissionLabels.full;
}

function maskPhone(phone) {
  if (!phone) return '•••• ••••';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 6) return '•••• ••••';
  const country = digits.length > 10 ? digits.slice(0, 2) : '';
  const local = digits.length > 10 ? digits.slice(2) : digits;
  const first = local.slice(0, 2);
  const last = local.slice(-4);
  if (country) return `+${country} ${first}••••• ${last}`;
  return `${first}••••• ${last}`;
}

function getLastCheckIn(person, index) {
  if (person.lastCheckIn) return person.lastCheckIn;
  return checkInFallbacks[index % checkInFallbacks.length];
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full gap-4 rounded-2xl border-2 border-warm-200 bg-white px-5 py-4 text-left transition-all duration-200 hover:border-teal-300"
    >
      <span className="text-lg text-warm-800 font-semibold leading-snug">{label}</span>
      <span
        className={`relative inline-flex h-12 w-20 flex-shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${
          checked ? 'bg-teal-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-9 w-9 rounded-full bg-white shadow-md transition-transform duration-200 ${
            checked ? 'translate-x-9' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}

export default function Support() {
  const {
    user,
    supportNetwork,
    deleteSupportPerson,
    addSupportPerson,
    settings,
    updateSettings,
  } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('family');
  const [phone, setPhone] = useState('');
  const [permission, setPermission] = useState('progress');

  const [sosHolding, setSosHolding] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);
  const [sosAlert, setSosAlert] = useState(false);
  const holdRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(holdRef.current);
  }, []);

  const emergencyContacts = supportNetwork.filter((person) => person.sos);

  const startHold = () => {
    setSosHolding(true);
    setSosAlert(false);
    holdRef.current = setInterval(() => {
      setSosProgress((previous) => {
        if (previous >= 100) {
          clearInterval(holdRef.current);
          setSosHolding(false);
          setSosAlert(true);
          return 100;
        }
        return previous + 10;
      });
    }, 300);
  };

  const cancelHold = () => {
    clearInterval(holdRef.current);
    setSosHolding(false);
    setSosProgress(0);
  };

  const handleAddPerson = () => {
    if (!name.trim()) return;
    const selectedRelationship = relationshipOptions.find(
      (option) => option.id === relationship
    );
    addSupportPerson({
      name: name.trim(),
      relationship: selectedRelationship.label,
      phone: phone.trim() || 'No phone number',
      permission,
      role: `${selectedRelationship.icon} Trusted person`,
      sos: true,
    });
    setName('');
    setPhone('');
    setPermission('progress');
    setRelationship('family');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 via-warm-50 to-white pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-4xl text-teal-700 mb-3 tracking-wide">
            Trusted Support Network
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Stay connected with people who care about you
          </p>
          <p className="text-gray-400 text-sm mt-2 max-w-lg mx-auto italic">
            Add trusted people who can check in on your progress and help when needed.
          </p>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm tracking-wide">
              Current Network
            </h2>
            <PixelButton
              onClick={() => setShowForm((visible) => !visible)}
              variant="primary"
              size="lg"
            >
              {showForm ? 'Close Form' : 'Add a Trusted Person'}
            </PixelButton>
          </div>

          {supportNetwork.length === 0 ? (
            <PixelCard className="p-10 text-center">
              <span className="text-4xl block mb-4">👥</span>
              <p className="text-gray-500 text-lg">
                Your support network is empty. Add a trusted person to get started.
              </p>
            </PixelCard>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {supportNetwork.map((person, index) => {
                const option = getRelationshipOption(person.relationship);
                const relationshipLabel = getRelationshipLabel(person.relationship);
                const permissionLabel = getPermissionLabel(person.permission);
                return (
                  <PixelCard key={person.id} pixel hover className="p-6 flex flex-col">
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full border-4 border-white shadow-inner text-3xl font-extrabold text-white ${option.color}`}
                      >
                        {person.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 leading-relaxed">
                          {person.name}
                        </h3>
                        <p className="text-warm-600 text-sm mt-1.5">
                          {relationshipLabel}
                        </p>
                        {person.role && (
                          <p className="text-gray-400 text-xs mt-0.5">{person.role}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex items-center gap-3 rounded-xl bg-warm-100 px-4 py-3">
                        <span className="text-xl">📞</span>
                        <span className="text-warm-800 text-base tracking-wide">
                          {maskPhone(person.phone)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-warm-100 px-4 py-3">
                        <span className="text-xl">💚</span>
                        <span className="text-warm-800 text-base">
                          Last check-in: {getLastCheckIn(person, index)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-teal-50 border border-teal-100 px-4 py-3">
                        <span className="text-xl">🔐</span>
                        <span className="text-teal-800 text-base font-semibold">
                          {permissionLabel}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-auto">
                      <PixelButton variant="secondary" size="md">
                        Message
                      </PixelButton>
                      <PixelButton variant="primary" size="md">
                        Call
                      </PixelButton>
                      <button
                        type="button"
                        onClick={() => deleteSupportPerson(person.id)}
                        className="font-[family-name:var(--font-pixel)] uppercase rounded-xl bg-red-500 text-white text-[0.72rem] tracking-wide px-3 py-3 border-2 border-red-700 shadow-[0_4px_0_#991b1b] transition-transform duration-100 hover:bg-red-600 active:translate-y-1 active:shadow-none"
                      >
                        Remove
                      </button>
                    </div>
                  </PixelCard>
                );
              })}
            </div>
          )}
        </section>

        {showForm && (
          <PixelCard className="p-6 md:p-8 mb-12 animate-slide-up">
            <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-2 tracking-wide">
              Add a Trusted Person
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              They will receive an invitation and can only see what you allow.
            </p>

            <label className="block text-warm-800 text-base font-bold mb-2" htmlFor="support-name">
              Name
            </label>
            <input
              id="support-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter their full name"
              className="w-full border-2 border-warm-200 rounded-xl bg-white px-5 py-4 text-lg text-gray-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all placeholder:text-gray-300 mb-6"
            />

            <label className="block text-warm-800 text-base font-bold mb-3">
              Relationship
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {relationshipOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRelationship(option.id)}
                  aria-pressed={relationship === option.id}
                  className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 min-h-[96px] transition-all duration-200 ${
                    relationship === option.id
                      ? option.active
                      : 'border-warm-200 bg-white text-warm-700 hover:border-warm-300'
                  }`}
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="text-sm font-semibold leading-tight text-center">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            <label className="block text-warm-800 text-base font-bold mb-2" htmlFor="support-phone">
              Phone Number
            </label>
            <input
              id="support-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter phone number"
              className="w-full border-2 border-warm-200 rounded-xl bg-white px-5 py-4 text-lg text-gray-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all placeholder:text-gray-300 mb-6"
            />

            <label className="block text-warm-800 text-base font-bold mb-3">
              What can they see?
            </label>
            <div className="grid md:grid-cols-3 gap-3 mb-8">
              {permissionOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPermission(option.id)}
                  aria-pressed={permission === option.id}
                  className={`flex items-start gap-3 rounded-2xl border-2 px-5 py-5 min-h-[112px] text-left transition-all duration-200 ${
                    permission === option.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-warm-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <span
                    className={`mt-1 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border-2 ${
                      permission === option.id
                        ? 'border-teal-600 text-teal-700'
                        : 'border-warm-300'
                    }`}
                  >
                    {permission === option.id && (
                      <span className="text-sm leading-none">✓</span>
                    )}
                  </span>
                  <span>
                    <span
                      className={`block text-base font-bold leading-snug ${
                        permission === option.id ? 'text-teal-800' : 'text-warm-800'
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`block text-sm mt-1 leading-relaxed ${
                        permission === option.id ? 'text-teal-600' : 'text-gray-500'
                      }`}
                    >
                      {option.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PixelButton onClick={handleAddPerson} variant="primary" size="lg" block>
                Send Invitation
              </PixelButton>
              <PixelButton onClick={() => setShowForm(false)} variant="secondary" size="lg" block>
                Cancel
              </PixelButton>
            </div>
          </PixelCard>
        )}

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-2 tracking-wide">
            Privacy Settings
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            You decide exactly what your trusted people can see.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Toggle
              checked={settings.shareProgress ?? true}
              onChange={(value) => updateSettings({ shareProgress: value })}
              label="Share my progress with trusted people"
            />
            <Toggle
              checked={settings.shareRoutine ?? true}
              onChange={(value) => updateSettings({ shareRoutine: value })}
              label="Share my routine"
            />
            <Toggle
              checked={settings.shareMemories ?? false}
              onChange={(value) => updateSettings({ shareMemories: value })}
              label="Share my memories"
            />
            <Toggle
              checked={settings.allowEmergencySOS ?? true}
              onChange={(value) => updateSettings({ allowEmergencySOS: value })}
              label="Allow emergency SOS contacts"
            />
          </div>
          <p className="text-gray-400 text-sm mt-4 italic">
            Your information stays private and is never shared without your permission. View our{' '}
            <Link to="/settings" className="text-teal-600 underline hover:text-teal-700">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-2 tracking-wide">
            Emergency SOS
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            Quick access to emergency contacts
          </p>

          <PixelCard className="p-8 text-center">
            <p className="text-gray-500 text-base mb-6">
              Press and hold the button for 3 seconds to alert your trusted contacts
            </p>
            <div className="flex justify-center mb-6">
              {sosAlert ? (
                <div className="rounded-2xl border-2 border-red-300 bg-red-50 px-8 py-8 w-56">
                  <span className="text-5xl block mb-3">🚨</span>
                  <p className="text-red-700 text-base font-bold">
                    This would alert your trusted contacts now.
                  </p>
                  <p className="text-red-500 text-sm mt-2">
                    This is a demonstration only — no message was sent.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSosAlert(false)}
                    className="mt-4 font-[family-name:var(--font-pixel)] uppercase text-[0.62rem] rounded-lg border-2 border-red-300 bg-white text-red-600 px-4 py-2 hover:bg-red-100"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onPointerDown={startHold}
                  onPointerUp={cancelHold}
                  onPointerLeave={cancelHold}
                  onPointerCancel={cancelHold}
                  onContextMenu={(event) => event.preventDefault()}
                  className={`relative select-none touch-none flex items-center justify-center w-56 h-56 rounded-full border-[6px] border-red-700 text-white font-[family-name:var(--font-pixel)] shadow-[0_8px_0_#7f1d1d] transition-transform duration-100 ${
                    sosHolding ? 'scale-95' : 'hover:scale-105'
                  }`}
                  style={{
                    background: 'linear-gradient(180deg, #f87171, #dc2626)',
                  }}
                >
                  <span className="sr-only">Emergency SOS button</span>
                  <span className="text-6xl block mb-2">🆘</span>
                  <span className="absolute bottom-8 text-xl tracking-widest">
                    SOS
                  </span>
                  <span className="absolute bottom-0 left-0 h-2 bg-red-900/60 transition-all duration-100 rounded-b-full"
                    style={{ width: `${sosProgress}%` }}
                  />
                </button>
              )}
            </div>

            <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs mb-4 tracking-wide">
              Your emergency contacts
            </h3>
            {!settings.allowEmergencySOS && (
              <p className="text-gray-500 text-base mb-4">
                SOS is turned off in your privacy settings.
              </p>
            )}
            {settings.allowEmergencySOS && emergencyContacts.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                {emergencyContacts.map((person) => {
                  const option = getRelationshipOption(person.relationship);
                  return (
                    <div
                      key={person.id}
                      className="flex items-center gap-4 rounded-2xl border-2 border-warm-200 bg-white px-5 py-4"
                    >
                      <div
                        className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full text-xl font-extrabold text-white ${option.color}`}
                      >
                        {person.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-warm-800 text-base font-bold">{person.name}</p>
                        <p className="text-gray-500 text-sm">
                          {maskPhone(person.phone)}
                        </p>
                      </div>
                      <span className="text-2xl">📳</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              settings.allowEmergencySOS && (
                <p className="text-gray-400 text-base">
                  No emergency contacts yet. Add trusted people to enable SOS.
                </p>
              )
            )}
          </PixelCard>
        </section>

        <section className="mb-12">
          <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-5 tracking-wide">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            <PixelCard className="p-8 text-center flex flex-col items-center justify-center">
              <span className="text-4xl block mb-3">🔔</span>
              <p className="text-warm-800 text-base leading-relaxed">
                Your trusted people are notified when you need help
              </p>
            </PixelCard>
            <PixelCard className="p-8 text-center flex flex-col items-center justify-center">
              <span className="text-4xl block mb-3">🛡️</span>
              <p className="text-warm-800 text-base leading-relaxed">
                You control what they can see
              </p>
            </PixelCard>
            <PixelCard className="p-8 text-center flex flex-col items-center justify-center">
              <span className="text-4xl block mb-3">🤫</span>
              <p className="text-warm-800 text-base leading-relaxed">
                Nothing is shared without your permission
              </p>
            </PixelCard>
          </div>
          <p className="text-gray-400 text-sm mt-6 text-center italic">
            Welcome, {user.name}. Your network of {supportNetwork.length} trusted people is here for you.
          </p>
        </section>
      </div>
    </div>
  );
}