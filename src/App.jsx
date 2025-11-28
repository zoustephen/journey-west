import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Star, ArrowRight, Volume2, Home, Check, Trophy, Mic, Loader, Lock, X, User, Unlock } from 'lucide-react';

// --- Data Generator ---
const BASE_EPISODES = [
  {
    id: 1,
    title: "The Stone Monkey",
    titleCN: "石猴出世",
    scenes: [
      { text: "Long long ago, there was a magic stone.", translation: "很久很久以前，有一块神奇的石头。", imageParams: "bg-gradient-to-b from-gray-300 to-gray-500", character: "🪨" },
      { text: "Boom! The stone broke.", translation: "崩！石头裂开了。", imageParams: "bg-gradient-to-r from-orange-300 to-red-400", character: "💥" },
      { text: "A stone monkey was born!", translation: "一只石猴出生了！", imageParams: "bg-yellow-100", character: "🐵" },
      { text: "He looked at the sky. Hello World!", translation: "他看着天空。你好世界！", imageParams: "bg-blue-200", character: "👀" }
    ],
    vocab: [ { word: "Stone", cn: "石头", emoji: "🪨" }, { word: "Monkey", cn: "猴子", emoji: "🐵" }, { word: "Sky", cn: "天空", emoji: "☁️" }, { word: "Born", cn: "出生", emoji: "🐣" } ],
    quiz: { question: "What came out of the stone?", options: ["A Bird 🐦", "A Monkey 🐵", "A Pig 🐷"], answer: 1 }
  },
  {
    id: 2,
    title: "The Waterfall Cave",
    titleCN: "发现水帘洞",
    scenes: [
      { text: "The monkeys were playing.", translation: "猴子们在玩耍。", imageParams: "bg-green-100", character: "🐒" },
      { text: "Look! A big waterfall!", translation: "看！一个大瀑布！", imageParams: "bg-blue-300", character: "🌊" },
      { text: "Who can jump in?", translation: "谁敢跳进去？", imageParams: "bg-blue-100", character: "❓" },
      { text: "I can! I am brave!", translation: "我敢！我很勇敢！", imageParams: "bg-yellow-200", character: "🦸‍♂️" }
    ],
    vocab: [ { word: "Play", cn: "玩耍", emoji: "⚽" }, { word: "Water", cn: "水", emoji: "💧" }, { word: "Jump", cn: "跳", emoji: "🆙" }, { word: "Brave", cn: "勇敢", emoji: "🦁" } ],
    quiz: { question: "What did the monkey jump into?", options: ["Fire 🔥", "Water 🌊", "Mud 🟤"], answer: 1 }
  },
  {
    id: 3,
    title: "The Golden Stick",
    titleCN: "龙宫借宝",
    scenes: [
      { text: "Monkey King wanted a weapon.", translation: "美猴王想要一件兵器。", imageParams: "bg-indigo-900", character: "🤔" },
      { text: "He went to the Dragon Palace.", translation: "他去了东海龙宫。", imageParams: "bg-blue-800", character: "🏰" },
      { text: "He found the Golden Stick!", translation: "他发现了如意金箍棒！", imageParams: "bg-yellow-500", character: "🥖" }
    ],
    vocab: [ { word: "Weapon", cn: "兵器", emoji: "⚔️" }, { word: "Dragon", cn: "龙", emoji: "🐉" }, { word: "Stick", cn: "棒子", emoji: "🥖" } ],
    quiz: { question: "Where did he find the stick?", options: ["Sky ☁️", "Sea 🌊", "Forest 🌲"], answer: 1 }
  },
  {
    id: 4,
    title: "Pigsy Joins",
    titleCN: "收服八戒",
    scenes: [
      { text: "Tang Monk met a pig.", translation: "唐僧遇见了一头猪。", imageParams: "bg-pink-100", character: "🐷" },
      { text: "He was hungry and strong.", translation: "他又饿又壮。", imageParams: "bg-orange-100", character: "🍚" },
      { text: "Pigsy became a helper.", translation: "八戒成了帮手。", imageParams: "bg-green-200", character: "🤝" }
    ],
    vocab: [ { word: "Pig", cn: "猪", emoji: "🐷" }, { word: "Hungry", cn: "饿", emoji: "🤤" }, { word: "Helper", cn: "帮手", emoji: "🙋‍♂️" } ],
    quiz: { question: "Who joined the team?", options: ["Tiger 🐯", "Pig 🐷", "Dragon 🐉"], answer: 1 }
  },
  {
    id: 5,
    title: "River of Sand",
    titleCN: "流沙河",
    scenes: [
      { text: "They saw a wide river.", translation: "他们看到一条宽宽的河。", imageParams: "bg-yellow-700", character: "🌫️" },
      { text: "A monster Sandy lived there.", translation: "沙僧住在这里。", imageParams: "bg-blue-600", character: "🧔" },
      { text: "He joined the team too.", translation: "他也加入了队伍。", imageParams: "bg-green-100", character: "🛶" }
    ],
    vocab: [ { word: "River", cn: "河", emoji: "🏞️" }, { word: "Monster", cn: "妖怪", emoji: "👹" }, { word: "Sand", cn: "沙子", emoji: "🏜️" } ],
    quiz: { question: "Who lived in the river?", options: ["Fish 🐟", "Sandy 🧔", "Bird 🐦"], answer: 1 }
  },
  // --- Chapters 6-15 ---
  { id: 6, title: "Ginseng Fruit", titleCN: "偷吃人参果", emoji: "🍑", quiz: { question: "What did they eat?", options: ["Apple 🍎", "Magic Fruit 👶", "Banana 🍌"], answer: 1 } },
  { id: 7, title: "White Bone Demon", titleCN: "三打白骨精", emoji: "💀", quiz: { question: "Who was the bad guy?", options: ["Skeleton 💀", "Pig 🐷", "Horse 🐴"], answer: 0 } },
  { id: 8, title: "Yellow Robe", titleCN: "黄袍怪", emoji: "🧥", quiz: { question: "What color was the robe?", options: ["Red 🔴", "Yellow 🟡", "Blue 🔵"], answer: 1 } },
  { id: 9, title: "Gold & Silver Horn", titleCN: "金角银角", emoji: "🦄", quiz: { question: "How many monsters?", options: ["One 1️⃣", "Two 2️⃣", "Ten 🔟"], answer: 1 } },
  { id: 10, title: "Red Boy", titleCN: "大战红孩儿", emoji: "🔥", quiz: { question: "What can Red Boy use?", options: ["Water 💧", "Fire 🔥", "Wind 💨"], answer: 1 } },
  { id: 11, title: "Blackwater River", titleCN: "黑水河", emoji: "🌊", quiz: { question: "Is the water clean?", options: ["Yes ✅", "No ❌", "Maybe 🤷"], answer: 1 } },
  { id: 12, title: "Contest of Strength", titleCN: "车迟国斗法", emoji: "⚡", quiz: { question: "Who won?", options: ["Monk 🧘", "Monkey 🐵", "Tiger 🐯"], answer: 1 } },
  { id: 13, title: "Women's Kingdom", titleCN: "女儿国", emoji: "👸", quiz: { question: "Who lived there?", options: ["Only Men 👨", "Only Women 👩", "Robots 🤖"], answer: 1 } },
  { id: 14, title: "Real & Fake Monkey", titleCN: "真假美猴王", emoji: "🎭", quiz: { question: "How many monkeys?", options: ["One 1️⃣", "Two 2️⃣", "Three 3️⃣"], answer: 1 } },
  { id: 15, title: "Flaming Mountain", titleCN: "火焰山", emoji: "🌋", quiz: { question: "It was very...", options: ["Cold ❄️", "Hot 🔥", "Wet 💧"], answer: 1 } },
];

// --- Chapters 16-50 (REAL DATA) ---
const EXTENDED_TITLES = [
    { id: 16, title: "Bull Demon King", titleCN: "牛魔王", emoji: "🐂" },
    { id: 17, title: "The Magic Fan", titleCN: "芭蕉扇", emoji: "🍃" },
    { id: 18, title: "Nine-Headed Bird", titleCN: "九头虫", emoji: "🦅" },
    { id: 19, title: "Little Thunder", titleCN: "小雷音寺", emoji: "🏯" },
    { id: 20, title: "Yellow Brows", titleCN: "黄眉老祖", emoji: "🤨" },
    { id: 21, title: "The Python", titleCN: "蟒蛇精", emoji: "🐍" },
    { id: 22, title: "Purple Bamboo", titleCN: "紫竹林", emoji: "🎋" },
    { id: 23, title: "Spider Cave", titleCN: "盘丝洞", emoji: "🕸️" },
    { id: 24, title: "Spider Women", titleCN: "七只蜘蛛", emoji: "🕷️" },
    { id: 25, title: "The Hundred Eyes", titleCN: "百眼魔君", emoji: "👁️" },
    { id: 26, title: "Lion Ridge", titleCN: "狮驼岭", emoji: "🦁" },
    { id: 27, title: "White Elephant", titleCN: "白象精", emoji: "🐘" },
    { id: 28, title: "Golden Eagle", titleCN: "大鹏鸟", emoji: "🦅" },
    { id: 29, title: "Kidnapped Kids", titleCN: "比丘国救婴", emoji: "👶" },
    { id: 30, title: "White Deer", titleCN: "白鹿精", emoji: "🦌" },
    { id: 31, title: "Bottomless Pit", titleCN: "无底洞", emoji: "🕳️" },
    { id: 32, title: "Lady Rat", titleCN: "老鼠精", emoji: "🐭" },
    { id: 33, title: "No Monks Allowed", titleCN: "灭法国", emoji: "🚫" },
    { id: 34, title: "Leopard Demon", titleCN: "隐雾山豹子", emoji: "🐆" },
    { id: 35, title: "Pray for Rain", titleCN: "凤仙郡求雨", emoji: "🌧️" },
    { id: 36, title: "Lion Monster", titleCN: "九灵元圣", emoji: "🦁" },
    { id: 37, title: "Teaching Princes", titleCN: "传艺玉华州", emoji: "🥋" },
    { id: 38, title: "Rhino Monsters", titleCN: "犀牛精", emoji: "🦏" },
    { id: 39, title: "Moon Rabbit", titleCN: "玉兔精", emoji: "🐰" },
    { id: 40, title: "Iron Bridge", titleCN: "凌云渡", emoji: "🌉" },
    { id: 41, title: "Bottomless Boat", titleCN: "无底船", emoji: "🛶" },
    { id: 42, title: "Western Heaven", titleCN: "西天雷音寺", emoji: "✨" },
    { id: 43, title: "Meeting Buddha", titleCN: "面见如来", emoji: "🙏" },
    { id: 44, title: "Blank Books", titleCN: "无字经书", emoji: "📘" },
    { id: 45, title: "Old Turtle", titleCN: "通天河老龟", emoji: "🐢" },
    { id: 46, title: "Real Scriptures", titleCN: "取得真经", emoji: "📜" },
    { id: 47, title: "Flying Home", titleCN: "八大金刚送行", emoji: "☁️" },
    { id: 48, title: "Back to Chang'an", titleCN: "回到长安", emoji: "🏰" },
    { id: 49, title: "Big Pagoda", titleCN: "大雁塔", emoji: "🏗️" },
    { id: 50, title: "Mission Complete", titleCN: "功德圆满", emoji: "🏆" }
];

const ALL_EPISODES = [...BASE_EPISODES];
EXTENDED_TITLES.forEach(item => {
    ALL_EPISODES.push({
        id: item.id,
        title: item.title,
        titleCN: item.titleCN,
        emoji: item.emoji,
        // Generic content for structure, but with specific character/title injection
        scenes: [
            { text: `They met ${item.title}.`, translation: `他们遇到了${item.titleCN}。`, imageParams: "bg-indigo-100", character: item.emoji },
            { text: "It was a hard challenge.", translation: "这是一个艰难的挑战。", imageParams: "bg-blue-100", character: "🔥" },
            { text: "Monkey King saved the day!", translation: "孙悟空化险为夷！", imageParams: "bg-yellow-100", character: "🐵" }
        ],
        vocab: [
            { word: "Challenge", cn: "挑战", emoji: "⚔️" },
            { word: "Win", cn: "胜利", emoji: "✌️" },
            { word: "Team", cn: "团队", emoji: "🤝" },
            { word: "Happy", cn: "开心", emoji: "😄" }
        ],
        quiz: {
            question: "Who won the fight?",
            options: ["The Monster 👹", "Monkey King 🐵", "Nobody 🤷"],
            answer: 1
        }
    });
});

// --- Helper Components ---

const TTSButton = ({ text, onSpeak, size = "md" }) => {
  const speak = (e) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; 
    window.speechSynthesis.speak(utterance);
    if (onSpeak) onSpeak();
  };
  return (
    <button onClick={speak} className={`${size === 'lg' ? 'p-4' : 'p-2'} bg-yellow-400 hover:bg-yellow-500 rounded-full text-white shadow-md transition-transform active:scale-95 flex items-center justify-center`} aria-label="Speak">
      <Volume2 size={size === 'lg' ? 32 : 20} />
    </button>
  );
};

const MicButton = ({ onRecord }) => {
  const [status, setStatus] = useState('idle');
  const handleRecord = (e) => {
    e.stopPropagation();
    if (status === 'recording') return;
    if (onRecord) onRecord();
    setStatus('recording');
    setTimeout(() => {
      setStatus('done');
      setTimeout(() => setStatus('idle'), 2000);
    }, 1500);
  };
  return (
    <button onClick={handleRecord} className={`relative p-2 rounded-full transition-all duration-300 flex items-center gap-2 overflow-hidden shadow-sm ${status === 'idle' ? 'bg-blue-100 text-blue-500 hover:bg-blue-200' : ''} ${status === 'recording' ? 'bg-red-100 text-red-500 w-28' : ''} ${status === 'done' ? 'bg-green-100 text-green-600 w-28' : ''}`}>
      {status === 'idle' && <Mic size={20} />}
      {status === 'recording' && <><Loader size={20} className="animate-spin" /><span className="text-xs font-bold animate-pulse whitespace-nowrap">Listening...</span></>}
      {status === 'done' && <><Star size={20} className="fill-green-600" /><span className="text-xs font-bold whitespace-nowrap">Great!</span></>}
    </button>
  );
};

const PeachScore = ({ score }) => (
  <div className="fixed top-4 right-4 bg-white/95 backdrop-blur border-4 border-pink-300 rounded-full px-5 py-2 flex items-center shadow-xl z-50 transform hover:scale-105 transition-transform cursor-default">
    <span className="text-2xl mr-2 animate-bounce">🍑</span>
    <span className="font-extrabold text-2xl text-pink-500">{score}</span>
  </div>
);

// --- VIEW COMPONENTS ---

const RegisterView = ({ username, setUsername, handleRegister }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100 p-6 relative overflow-hidden">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center z-10 border-4 border-yellow-300">
            <div className="text-6xl mb-4">🐵</div>
            <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Welcome!</h1>
            <p className="text-gray-500 mb-8">What is your name, little hero?</p>
            
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full text-xl p-4 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none mb-4 text-center"
            />
            
            <button 
                onClick={handleRegister}
                disabled={!username.trim()}
                className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold text-xl rounded-xl shadow-[0_4px_0_rgb(202,138,4)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Start Adventure
            </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-10 left-10 text-8xl opacity-10">☁️</div>
            <div className="absolute bottom-10 right-10 text-8xl opacity-10">⛰️</div>
        </div>
    </div>
);

const UnlockModal = ({ unlockCode, setUnlockCode, unlockError, handleUnlockCode, onClose }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={20} /></button>
            <div className="text-center mb-4">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 text-orange-500">
                    <Unlock size={24} />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Parent Unlock</h3>
                <p className="text-xs text-gray-500">Enter secret code to unlock all levels.</p>
            </div>
            <input 
               type="password"
               value={unlockCode}
               onChange={(e) => setUnlockCode(e.target.value)}
               className="w-full border-2 border-gray-200 rounded-lg p-2 text-center text-lg mb-2 focus:border-orange-400 outline-none"
               placeholder="Enter Code"
            />
            {unlockError && <div className="text-red-500 text-xs text-center mb-2 font-bold">{unlockError}</div>}
            <button onClick={handleUnlockCode} className="w-full py-2 bg-orange-500 text-white rounded-lg font-bold shadow-md hover:bg-orange-600">
                Unlock All
            </button>
        </div>
    </div>
);

const LeaderboardView = ({ leaderboardData, currentUser, onBack }) => (
    <div className="min-h-screen bg-yellow-50 p-6 flex flex-col items-center pt-20">
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white rounded-full shadow hover:bg-gray-100"><Home className="text-gray-600"/></button>
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border-4 border-yellow-200">
            <div className="bg-yellow-400 p-6 text-center">
                <Trophy size={48} className="mx-auto text-white mb-2 drop-shadow-md" />
                <h2 className="text-2xl font-extrabold text-white">Peach Leaderboard</h2>
            </div>
            <div className="p-4">
                {leaderboardData.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No heroes yet! Be the first!</div>
                ) : (
                    leaderboardData.map((entry, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-4 rounded-xl mb-2 ${entry.isMe ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-blue-200'}`}>
                                    {idx + 1}
                                </div>
                                <div className="font-bold text-gray-700">{entry.username}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-extrabold text-pink-500">{entry.score}</span>
                                <span className="text-xl">🍑</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
);

const HomeView = ({ username, unlocked, completedQuizzes, allEpisodes, onEpisodeSelect, onOpenLeaderboard, onOpenUnlock }) => (
    <div className="flex flex-col items-center min-h-screen bg-sky-50 p-4 pb-20 relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse">☁️</div>
         <div className="absolute bottom-20 right-10 text-8xl opacity-10">⛰️</div>
      </div>
      
      <div className="w-full max-w-6xl flex justify-between items-center z-10 mt-4 mb-6 px-4">
         <div className="flex items-center gap-4">
             {/* User Info */}
             <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                 <User size={20} className="text-blue-500" />
                 <span className="font-bold text-blue-900">{username}</span>
             </div>
             {/* Buttons - Moved to Left to avoid overlap with PeachScore */}
             <div className="flex gap-2">
                 <button onClick={onOpenLeaderboard} className="p-3 bg-white rounded-full shadow hover:bg-yellow-50 text-yellow-500 transition-colors" title="Leaderboard">
                     <Trophy size={24} />
                 </button>
                 <button onClick={onOpenUnlock} className="p-3 bg-white rounded-full shadow hover:bg-gray-100 text-gray-400 transition-colors" title="Parent Settings">
                     <Lock size={24} />
                 </button>
             </div>
         </div>
         {/* Right side empty for PeachScore */}
         <div className="w-20"></div> 
      </div>

      <div className="text-center z-10 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm font-sans mb-2">
          Journey to the West
        </h1>
        <p className="text-lg text-yellow-700 font-bold bg-yellow-100 inline-block px-4 py-1 rounded-full border border-yellow-300">
          50 Levels of Adventure
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-6xl z-10 px-2">
        {allEpisodes.map((ep) => {
          const isUnlocked = unlocked.includes(ep.id);
          const isCompleted = completedQuizzes.includes(ep.id);
          
          return (
            <button
              key={ep.id}
              disabled={!isUnlocked}
              onClick={() => onEpisodeSelect(ep.id)}
              className={`relative group flex flex-col items-center text-center p-4 rounded-2xl border-b-4 transition-all duration-300 h-40 justify-between
                ${isUnlocked 
                  ? 'bg-white border-blue-200 hover:border-blue-400 hover:translate-y-[-2px] hover:shadow-lg cursor-pointer' 
                  : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'}`}
            >
              <div className="absolute top-2 right-2">
                 {isCompleted ? (
                   <div className="bg-green-100 text-green-600 p-0.5 rounded-full"><Check size={14} strokeWidth={4} /></div>
                 ) : !isUnlocked ? (
                   <Lock size={14} className="text-gray-300" />
                 ) : null}
              </div>

              <div className="absolute top-2 left-2 text-xs font-black text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded">
                  {ep.id}
              </div>

              <div className={`text-4xl mt-4 transform transition-transform group-hover:scale-110 ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                {ep.id <= 5 ? (ep.id === 1 ? '🐒' : ep.id === 2 ? '🌊' : ep.id === 3 ? '🥖' : ep.id === 4 ? '🐷' : '👹') : ep.emoji}
              </div>
              
              <div className="w-full">
                <h3 className="text-sm font-bold text-gray-800 leading-tight mb-0.5 line-clamp-1">{ep.title}</h3>
                <p className="text-gray-500 font-medium text-xs line-clamp-1">{ep.titleCN}</p>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 text-gray-400 text-xs">
        {unlocked.length} / {allEpisodes.length} Unlocked
      </div>

      <div className="mt-4 text-gray-400/60 text-[10px] font-medium font-sans pb-4">
        版权所有：Jasper and His Dad
      </div>
    </div>
);

const EpisodeMenu = ({ activeEpisodeId, allEpisodes, onNavigate, onBack }) => {
    const ep = allEpisodes.find(e => e.id === activeEpisodeId);
    if (!ep) return null;
    
    const MenuButton = ({ icon, title, desc, color, onClick }) => (
        <button onClick={onClick} className={`${color} text-white p-4 rounded-2xl shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 transition-all flex items-center w-full`}>
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4 shrink-0">{icon}</div>
            <div className="text-left flex-1">
                <div className="text-xl font-bold leading-none mb-1">{title}</div>
                <div className="text-white/90 text-sm font-medium">{desc}</div>
            </div>
            <ArrowRight className="opacity-80" />
        </button>
    );

    return (
      <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-6 pt-20">
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 text-gray-600 transition-colors">
          <Home size={24} />
        </button>
        
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="text-6xl mb-4">{ep.id <= 5 ? (ep.id === 1 ? '🐒' : ep.id === 2 ? '🌊' : ep.id === 3 ? '🥖' : ep.id === 4 ? '🐷' : '👹') : ep.emoji}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{ep.title}</h2>
          <p className="text-xl text-gray-600 font-medium bg-white/50 px-4 py-1 rounded-full inline-block">{ep.titleCN}</p>
        </div>

        <div className="grid gap-4 w-full max-w-sm">
          <MenuButton icon={<BookOpen size={28} />} title="Story Mode" desc="Listen to the story" color="bg-blue-500 hover:bg-blue-600" onClick={() => onNavigate('story')} />
          <MenuButton icon={<Star size={28} />} title="Magic Words" desc="Learn new words" color="bg-green-500 hover:bg-green-600" onClick={() => onNavigate('vocab')} />
          <MenuButton icon={<Trophy size={28} />} title="Quiz Challenge" desc="Earn Peaches" color="bg-orange-500 hover:bg-orange-600" onClick={() => onNavigate('quiz')} />
        </div>
      </div>
    );
};

const StoryView = ({ activeEpisodeId, allEpisodes, sceneIndex, setSceneIndex, onBack, onFinish }) => {
    const ep = allEpisodes.find(e => e.id === activeEpisodeId);
    const scene = ep.scenes[sceneIndex];

    const nextScene = () => {
      if (sceneIndex < ep.scenes.length - 1) {
        setSceneIndex(sceneIndex + 1);
      } else {
        onFinish();
      }
    };
    const prevScene = () => { if (sceneIndex > 0) setSceneIndex(sceneIndex - 1); };

    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative p-4">
        <div className="absolute top-4 left-4 z-20">
          <button onClick={onBack} className="text-white p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full transition-colors"><Home size={24}/></button>
        </div>
        <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-gray-700">
          <div className={`w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${scene.imageParams}`}>
            <span className="text-[100px] md:text-[180px] animate-bounce filter drop-shadow-2xl cursor-pointer" onClick={() => {
                const u = new SpeechSynthesisUtterance(scene.text);
                window.speechSynthesis.speak(u);
            }}>{scene.character}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 pb-8 px-6 text-center">
             <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-3">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white font-sans drop-shadow-md">{scene.text}</h3>
                  <TTSButton text={scene.text} size="lg" />
                </div>
                <p className="text-yellow-400/90 text-lg md:text-xl font-medium">{scene.translation}</p>
             </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6 w-full max-w-4xl">
          <button onClick={prevScene} disabled={sceneIndex === 0} className="px-6 py-4 rounded-xl bg-gray-700 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors">Prev</button>
          <button onClick={nextScene} className="flex-1 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xl shadow-[0_4px_0_rgb(202,138,4)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-3">{sceneIndex === ep.scenes.length - 1 ? "Finish Story" : "Next Scene"} <ArrowRight strokeWidth={3}/></button>
        </div>
      </div>
    );
};

const VocabView = ({ activeEpisodeId, allEpisodes, onBack }) => {
    const ep = allEpisodes.find(e => e.id === activeEpisodeId);
    const [learnedWords, setLearnedWords] = useState(new Set());
    
    // Check completion status
    const isComplete = learnedWords.size === ep.vocab.length;

    const markLearned = (idx) => {
      const newSet = new Set(learnedWords);
      newSet.add(idx);
      setLearnedWords(newSet);
    };

    return (
      <div className="min-h-screen bg-green-50 p-6 pt-20 pb-32 flex flex-col items-center relative">
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white rounded-full shadow hover:bg-gray-100"><Home className="text-gray-600"/></button>
        <h2 className="text-3xl font-bold text-green-800 mb-2">Magic Words</h2>
        <div className="text-green-600 mb-8 font-medium">Collect all stars: {learnedWords.size} / {ep.vocab.length}</div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
          {ep.vocab.map((v, idx) => {
            const isLearned = learnedWords.has(idx);
            return (
              <div key={idx} className={`relative bg-white rounded-3xl p-6 shadow-sm border-b-4 transition-all duration-300 flex flex-col items-center text-center ${isLearned ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-green-300'}`} onClick={() => markLearned(idx)}>
                <div className={`absolute top-3 right-3 transition-transform duration-500 ${isLearned ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}><Star className="fill-yellow-400 text-yellow-400" size={24} /></div>
                <div className="text-6xl mb-4 transform transition-transform hover:scale-110 cursor-pointer">{v.emoji}</div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{v.word}</div>
                <div className="text-gray-400 mb-6">{v.cn}</div>
                <div className="flex gap-3 mt-auto">
                   <TTSButton text={v.word} onSpeak={() => markLearned(idx)} />
                   <MicButton onRecord={() => markLearned(idx)} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Finish Button (Replaces Auto-Popup) */}
        {isComplete && (
            <div className="fixed bottom-8 left-0 right-0 flex justify-center animate-in slide-in-from-bottom-10 fade-in duration-500 z-50">
                <button 
                    onClick={onBack}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 px-12 rounded-full shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-3"
                >
                    <Check strokeWidth={4} /> Finish Learning
                </button>
            </div>
        )}
      </div>
    );
};

const QuizView = ({ activeEpisodeId, allEpisodes, onBack, score, setScore, unlocked, setUnlocked, completedQuizzes, setCompletedQuizzes, saveProgress }) => {
    const ep = allEpisodes.find(e => e.id === activeEpisodeId);
    const [result, setResult] = useState(null); 
    const alreadyCompleted = completedQuizzes.includes(activeEpisodeId);

    const handleAnswer = async (idx) => {
      if (idx === ep.quiz.answer) {
        setResult('correct');
        let newScore = score;
        let newCompleted = completedQuizzes;
        let newUnlocked = unlocked;

        // 1. Calculate Score
        if (!alreadyCompleted) {
          newScore = score + 5;
          newCompleted = [...completedQuizzes, activeEpisodeId];
          setScore(newScore);
          setCompletedQuizzes(newCompleted);
        }
        
        // 2. Unlock Next Level (Directly)
        const nextLevelId = activeEpisodeId + 1;
        if (activeEpisodeId < allEpisodes.length && !unlocked.includes(nextLevelId)) {
            newUnlocked = [...unlocked, nextLevelId];
            setUnlocked(newUnlocked);
        }

        // 3. Save Progress
        await saveProgress(newScore, newUnlocked, newCompleted);

      } else {
        setResult('wrong');
      }
    };

    return (
      <div className="min-h-screen bg-orange-50 p-6 pt-20 flex flex-col items-center">
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white rounded-full shadow hover:bg-gray-100"><Home className="text-gray-600"/></button>
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-400"></div>
            {result !== 'correct' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="text-orange-500 font-bold tracking-widest uppercase mb-4 text-sm">Quiz Challenge</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{ep.quiz.question}</h2>
                    <div className="space-y-4">
                        {ep.quiz.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleAnswer(idx)} className="w-full p-5 rounded-2xl font-bold text-lg border-2 bg-white border-gray-100 hover:border-orange-300 hover:bg-orange-50 text-gray-700 shadow-sm transition-all text-left flex justify-between items-center group">
                            {opt} <ArrowRight className="opacity-0 group-hover:opacity-100 text-orange-400 transition-opacity" size={20} />
                        </button>
                        ))}
                    </div>
                    {result === 'wrong' && <div className="mt-6 p-3 bg-red-100 text-red-600 rounded-xl font-bold animate-pulse flex items-center justify-center gap-2"><X size={20} /> Oops! Try again.</div>}
                </div>
            )}
            {result === 'correct' && (
                <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-500 py-8">
                    <div className="text-8xl mb-4 animate-bounce">🎉</div>
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Good Job!</h2>
                    {alreadyCompleted ? <div className="text-gray-400 font-medium mb-8 bg-gray-100 px-4 py-1 rounded-full">Peach already collected</div> : <div className="flex items-center gap-2 text-3xl text-green-500 font-extrabold mb-8 bg-green-50 px-6 py-3 rounded-2xl border-2 border-green-200">+5 <span className="text-4xl">🍑</span></div>}
                    <div className="flex gap-4 w-full px-4">
                        <button onClick={onBack} className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-[0_4px_0_rgb(194,65,12)] active:shadow-none active:translate-y-1 transition-all">Back to Map</button>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
};

// --- Main Application ---

export default function JourneyWestApp() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState('register');
  const [activeEpisodeId, setActiveEpisodeId] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState([1]); 
  const [completedQuizzes, setCompletedQuizzes] = useState([]); 
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockCode, setUnlockCode] = useState("");
  const [unlockError, setUnlockError] = useState("");

  // --- Initialize (Local Storage) ---
  useEffect(() => {
    const savedData = localStorage.getItem('journey_west_save');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUsername(parsed.username || "");
        setScore(parsed.score || 0);
        setUnlocked(parsed.unlocked || [1]);
        setCompletedQuizzes(parsed.completedQuizzes || []);
        setCurrentView('home');
      } catch (e) {
        console.error("Load error", e);
      }
    }
    setLoading(false);
  }, []);

  // --- Mock Leaderboard ---
  useEffect(() => {
    // Generate some fake "classmates" for local fun
    const fakeData = [
        { username: "Monkey King", score: 999, isMe: false },
        { username: "Pigsy", score: 50, isMe: false },
        { username: "Ne Zha", score: 200, isMe: false },
        { username: "Red Boy", score: 150, isMe: false },
        { username: username || "You", score: score, isMe: true }
    ];
    const sorted = fakeData.sort((a, b) => b.score - a.score);
    setLeaderboardData(sorted);
  }, [score, username]);

  const saveProgress = async (newScore, newUnlocked, newCompleted) => {
    const data = {
        username,
        score: newScore !== undefined ? newScore : score,
        unlocked: newUnlocked || unlocked,
        completedQuizzes: newCompleted || completedQuizzes,
    };
    
    // Update React State immediately
    if (newScore !== undefined) setScore(newScore);
    if (newUnlocked) setUnlocked(newUnlocked);
    if (newCompleted) setCompletedQuizzes(newCompleted);

    // Save to Local Storage
    localStorage.setItem('journey_west_save', JSON.stringify(data));
  };

  const handleRegister = async () => {
    if (!username.trim()) return;
    await saveProgress(0, [1], []);
    setCurrentView('home');
  };

  const handleUnlockCode = async () => {
      if (unlockCode.toLowerCase() === 'jasper') {
          const allIds = ALL_EPISODES.map(e => e.id);
          await saveProgress(undefined, allIds, undefined); // Score keeps same
          setUnlockCode("");
          setShowUnlockModal(false);
          const u = new SpeechSynthesisUtterance("Magic Code Accepted! All Levels Unlocked!");
          window.speechSynthesis.speak(u);
      } else {
          setUnlockError("Wrong code. Try again.");
      }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader className="animate-spin text-blue-500" size={48}/></div>;

  return (
    <div className="font-sans text-gray-900 select-none">
      {currentView !== 'register' && <PeachScore score={score} />}
      
      {showUnlockModal && (
        <UnlockModal 
            unlockCode={unlockCode}
            setUnlockCode={setUnlockCode}
            unlockError={unlockError}
            handleUnlockCode={handleUnlockCode}
            onClose={() => setShowUnlockModal(false)}
        />
      )}

      {currentView === 'register' && (
        <RegisterView 
            username={username}
            setUsername={setUsername}
            handleRegister={handleRegister}
        />
      )}

      {currentView === 'home' && (
        <HomeView 
            username={username}
            unlocked={unlocked}
            completedQuizzes={completedQuizzes}
            allEpisodes={ALL_EPISODES}
            onEpisodeSelect={(id) => {
                setActiveEpisodeId(id);
                setSceneIndex(0);
                setCurrentView('menu');
            }}
            onOpenLeaderboard={() => setCurrentView('leaderboard')}
            onOpenUnlock={() => setShowUnlockModal(true)}
        />
      )}

      {currentView === 'leaderboard' && (
        <LeaderboardView 
            leaderboardData={leaderboardData}
            currentUser={{ uid: 'me' }} // Mock user ID
            onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'menu' && (
        <EpisodeMenu 
            activeEpisodeId={activeEpisodeId}
            allEpisodes={ALL_EPISODES}
            onNavigate={setCurrentView}
            onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'story' && (
        <StoryView 
            activeEpisodeId={activeEpisodeId}
            allEpisodes={ALL_EPISODES}
            sceneIndex={sceneIndex}
            setSceneIndex={setSceneIndex}
            onBack={() => setCurrentView('menu')}
            onFinish={() => setCurrentView('menu')}
        />
      )}

      {currentView === 'vocab' && (
        <VocabView 
            activeEpisodeId={activeEpisodeId}
            allEpisodes={ALL_EPISODES}
            onBack={() => setCurrentView('menu')}
        />
      )}

      {currentView === 'quiz' && (
        <QuizView 
            activeEpisodeId={activeEpisodeId}
            allEpisodes={ALL_EPISODES}
            onBack={() => setCurrentView('home')}
            score={score}
            setScore={setScore}
            unlocked={unlocked}
            setUnlocked={setUnlocked}
            completedQuizzes={completedQuizzes}
            setCompletedQuizzes={setCompletedQuizzes}
            saveProgress={saveProgress}
        />
      )}
    </div>
  );
}
