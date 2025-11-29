import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Star, ArrowRight, Volume2, Home, Check, Trophy, Mic, Loader, Lock, X, User, Unlock, Map, Crown, Zap, Scroll, Users, Cloud, Hammer, Sword, Shield } from 'lucide-react';

// ==========================================
// 1. 数据设定 (50关 完整手写精修版)
// ==========================================

const WEST_EPISODES = [
  // --- 第一部分：出世与闹天宫 (1-5) ---
  { id: 1, title: "The Stone Monkey", titleCN: "石猴出世", emoji: "🐵",
    scenes: [ { text: "Long ago, a magic stone sat on a high mountain.", translation: "很久以前，一块神奇的石头坐落在高山上。", imageParams: "bg-stone-200", character: "🪨" }, { text: "The sun and moon shined on it for years.", translation: "日月照耀了它很多年。", imageParams: "bg-sky-200", character: "☀️🌙" }, { text: "One day, the stone cracked open. Boom!", translation: "有一天，石头裂开了。轰！", imageParams: "bg-orange-400", character: "💥" }, { text: "A stone monkey was born from the egg.", translation: "一只石猴从蛋里出生了。", imageParams: "bg-yellow-100", character: "🐵" }, { text: "He bowed to the four directions.", translation: "他向四方行礼。", imageParams: "bg-green-100", character: "🙏" }, { text: "Golden light shot from his eyes.", translation: "金光从他的眼中射出。", imageParams: "bg-blue-200", character: "👀✨" } ],
    vocab: [ { word: "Mountain", cn: "高山", emoji: "⛰️" }, { word: "Stone", cn: "石头", emoji: "🪨" }, { word: "Born", cn: "出生", emoji: "🐣" }, { word: "Light", cn: "光", emoji: "✨" } ],
    quiz: { question: "What came out of the stone?", options: ["A Bird 🐦", "A Monkey 🐵", "A Pig 🐷"], answer: 1 } },
  { id: 2, title: "The Waterfall Cave", titleCN: "发现水帘洞", emoji: "🌊",
    scenes: [ { text: "The monkeys were playing by the river.", translation: "猴子们在河边玩耍。", imageParams: "bg-green-100", character: "🐒" }, { text: "They saw a huge waterfall rushing down.", translation: "他们看到一个巨大的瀑布冲刷下来。", imageParams: "bg-blue-300", character: "🌊" }, { text: "Who dares to jump through it?", translation: "谁敢跳过去？", imageParams: "bg-blue-100", character: "❓" }, { text: "I will go! shouted the Stone Monkey.", translation: "我去！石猴喊道。", imageParams: "bg-yellow-200", character: "🙋‍♂️" }, { text: "He closed his eyes and jumped.", translation: "他闭上眼跳了过去。", imageParams: "bg-blue-400", character: "💨" }, { text: "He found a cave behind the water.", translation: "他在水后发现了一个洞穴。", imageParams: "bg-purple-100", character: "🏰" } ],
    vocab: [ { word: "Waterfall", cn: "瀑布", emoji: "🌊" }, { word: "Jump", cn: "跳", emoji: "🆙" }, { word: "Cave", cn: "洞穴", emoji: "🕳️" }, { word: "Brave", cn: "勇敢", emoji: "🦁" } ],
    quiz: { question: "What is behind the water?", options: ["Fire 🔥", "A Cave 🏰", "Mud 🟤"], answer: 1 } },
  { id: 3, title: "The Golden Stick", titleCN: "龙宫借宝", emoji: "🥖",
    scenes: [ { text: "Monkey King needed a powerful weapon.", translation: "美猴王需要一件强力的兵器。", imageParams: "bg-indigo-900", character: "🤔" }, { text: "He dove deep into the Eastern Sea.", translation: "他潜入深海。", imageParams: "bg-blue-800", character: "🌊" }, { text: "The Dragon King showed him many swords.", translation: "龙王给他看了很多剑。", imageParams: "bg-blue-900", character: "🐉🗡️" }, { text: "They are too light! said Monkey.", translation: "太轻了！猴王说。", imageParams: "bg-gray-200", character: "🙅‍♂️" }, { text: "He saw a giant iron pillar glowing.", translation: "他看到一根巨大的发光铁柱。", imageParams: "bg-yellow-500", character: "🥖✨" }, { text: "It shrank into a small stick.", translation: "它缩小成一根棍子。", imageParams: "bg-orange-100", character: "👌" } ],
    vocab: [ { word: "Weapon", cn: "兵器", emoji: "⚔️" }, { word: "Dragon", cn: "龙", emoji: "🐉" }, { word: "Heavy", cn: "重", emoji: "🏋️" }, { word: "Stick", cn: "棍子", emoji: "🥖" } ],
    quiz: { question: "What weapon did he choose?", options: ["Sword 🗡️", "Golden Stick 🥖", "Shield 🛡️"], answer: 1 } },
  { id: 4, title: "Pigsy Joins", titleCN: "收服八戒", emoji: "🐷",
    scenes: [ { text: "Tang Monk met a pig monster.", translation: "唐僧遇到了一个猪妖。", imageParams: "bg-pink-100", character: "🐷" }, { text: "He was carrying a rake.", translation: "他扛着钉耙。", imageParams: "bg-orange-100", character: "🥘" }, { text: "Monkey King caught him by the ear.", translation: "悟空揪住了他的耳朵。", imageParams: "bg-yellow-100", character: "👂" }, { text: "Please stop! I wait for the Monk.", translation: "停下！我在等取经人。", imageParams: "bg-gray-200", character: "🙏" }, { text: "Guanyin told me to help you.", translation: "观音让我来帮你们。", imageParams:"bg-white", character: "✨" }, { text: "Pigsy became the second disciple.", translation: "八戒成了二徒弟。", imageParams: "bg-green-200", character: "🤝" } ],
    vocab: [ { word: "Pig", cn: "猪", emoji: "🐷" }, { word: "Hungry", cn: "饿", emoji: "🤤" }, { word: "Ear", cn: "耳朵", emoji: "👂" }, { word: "Help", cn: "帮忙", emoji: "🆘" } ],
    quiz: { question: "What does Pigsy like?", options: ["Fighting ⚔️", "Eating 🥘", "Running 🏃"], answer: 1 } },
  { id: 5, title: "River of Sand", titleCN: "流沙河", emoji: "👹",
    scenes: [ { text: "A wide river blocked their path.", translation: "一条宽阔的大河挡住了路。", imageParams: "bg-blue-400", character: "🌊" }, { text: "The water was dark and swirling.", translation: "河水漆黑且湍急。", imageParams: "bg-blue-800", character: "🌀" }, { text: "A monster with a skull necklace jumped out.", translation: "一个戴骷髅项链的妖怪跳了出来。", imageParams: "bg-gray-700", character: "👹" }, { text: "He fought with Monkey and Pigsy.", translation: "他和悟空八戒打了起来。", imageParams: "bg-red-200", character: "⚔️" }, { text: "The gourd helps us float.", translation: "葫芦帮我们漂浮。", imageParams: "bg-yellow-200", character: "🏺" }, { text: "Sandy joined the team.", translation: "沙僧加入了队伍。", imageParams: "bg-green-300", character: "👨‍👨‍👦‍👦" } ],
    vocab: [ { word: "River", cn: "河", emoji: "🏞️" }, { word: "Necklace", cn: "项链", emoji: "📿" }, { word: "Fight", cn: "战斗", emoji: "🥊" }, { word: "Team", cn: "团队", emoji: "🤝" } ],
    quiz: { question: "Who lived in the river?", options: ["Fish 🐟", "Sandy 👹", "Bird 🐦"], answer: 1 } },

  // --- 6-20: 取经磨难 ---
  { id: 6, title: "Ginseng Fruit", titleCN: "偷吃人参果", emoji: "🍑",
    scenes: [{text:"They arrived at a beautiful temple.", translation:"他们来到一座美丽的道观。", imageParams:"bg-green-100", character:"⛩️"}, {text:"There was a tree with baby-shaped fruit.", translation:"有一棵树长着婴儿形状的果子。", imageParams:"bg-green-300", character:"🌳"}, {text:"It is Ginseng Fruit. Very rare.", translation:"那是人参果。非常稀有。", imageParams:"bg-pink-100", character:"👶"}, {text:"Pigsy wanted to taste one.", translation:"八戒想尝一个。", imageParams:"bg-orange-100", character:"😋"}, {text:"Monkey knocked three down.", translation:"悟空打下了三个。", imageParams:"bg-yellow-100", character:"🥢"}, {text:"Oh no! The tree fell over!", translation:"糟了！树倒了！", imageParams:"bg-brown-400", character:"🪵"}], vocab:[{word:"Fruit", cn:"水果", emoji:"🍎"}, {word:"Tree", cn:"树", emoji:"🌳"}, {word:"Baby", cn:"婴儿", emoji:"👶"}, {word:"Taste", cn:"尝", emoji:"😋"}], quiz:{question:"What did the fruit look like?", options:["Babies 👶", "Apples 🍎"], answer:0} },
  { id: 7, title: "White Bone Demon", titleCN: "三打白骨精", emoji: "💀", scenes: [{text:"A pretty girl gave them food.", translation:"一个漂亮的女孩给他们送饭。", imageParams:"bg-pink-50", character:"👩"}, {text:"Monkey saw she was a demon.", translation:"悟空看出她是妖怪。", imageParams:"bg-red-100", character:"👁️"}, {text:"He hit her with his stick.", translation:"他用棒子打了她。", imageParams:"bg-gray-200", character:"🥖"}, {text:"She turned into an old lady.", translation:"她变成了一个老奶奶。", imageParams:"bg-gray-300", character:"👵"}, {text:"Monkey hit her again.", translation:"悟空又打了她。", imageParams:"bg-red-200", character:"💥"}, {text:"The monk was very angry.", translation:"唐僧非常生气。", imageParams:"bg-red-500", character:"😡"}], vocab:[{word:"Demon", cn:"妖怪", emoji:"👹"}, {word:"Angry", cn:"生气", emoji:"😠"}, {word:"Bone", cn:"骨头", emoji:"🦴"}, {word:"Lady", cn:"女士", emoji:"👩"}], quiz:{question:"Who was the girl?", options:["A Villager", "White Bone Demon"], answer:1} },
  { id: 8, title: "Yellow Robe", titleCN: "黄袍怪", emoji: "🧥", scenes: [{text:"The monk was captured.", translation:"唐僧被抓走了。", imageParams:"bg-gray-800", character:"🕸️"}, {text:"A monster in a yellow robe lived here.", translation:"一个穿黄袍的妖怪住在这里。", imageParams:"bg-yellow-600", character:"🧥"}, {text:"He turned the monk into a tiger!", translation:"他把唐僧变成了老虎！", imageParams:"bg-orange-400", character:"🐅"}, {text:"Pigsy went to find Monkey.", translation:"八戒去找悟空。", imageParams:"bg-green-100", character:"🏃"}, {text:"Monkey came back to help.", translation:"悟空回来帮忙了。", imageParams:"bg-yellow-200", character:"🐵"}, {text:"He defeated the monster.", translation:"他打败了妖怪。", imageParams:"bg-blue-200", character:"🏆"}], vocab:[{word:"Robe", cn:"长袍", emoji:"🧥"}, {word:"Tiger", cn:"老虎", emoji:"🐅"}, {word:"Yellow", cn:"黄色", emoji:"🟨"}, {word:"Find", cn:"寻找", emoji:"🔍"}], quiz:{question:"What did the monk become?", options:["A Tiger 🐅", "A Rabbit 🐇"], answer:0} },
  { id: 9, title: "Gold & Silver Horn", titleCN: "金角银角", emoji: "🦄", scenes: [{text:"Two monsters blocked the mountain.", translation:"两个妖怪挡住了山路。", imageParams:"bg-purple-800", character:"😈😈"}, {text:"They had a magic gourd.", translation:"他们有一个紫金葫芦。", imageParams:"bg-purple-400", character:"🏺"}, {text:"Call your name, do you dare answer?", translation:"叫你名字，你敢应吗？", imageParams:"bg-red-100", character:"🗣️"}, {text:"Monkey used a fake name.", translation:"悟空用了个假名字。", imageParams:"bg-blue-100", character:"🤥"}, {text:"He stole the gourd.", translation:"他偷走了葫芦。", imageParams:"bg-green-200", character:"🤏"}, {text:"The monsters were trapped inside.", translation:"妖怪被吸进去了。", imageParams:"bg-black", character:"📥"}], vocab:[{word:"Name", cn:"名字", emoji:"📛"}, {word:"Answer", cn:"回答", emoji:"🙋"}, {word:"Gourd", cn:"葫芦", emoji:"🏺"}, {word:"Trap", cn:"困住", emoji:"🥅"}], quiz:{question:"What happens if you answer?", options:["You get trapped", "You get gold"], answer:0} },
  { id: 10, title: "Red Boy", titleCN: "大战红孩儿", emoji: "🔥", scenes: [{text:"A boy was tied to a tree.", translation:"一个男孩被绑在树上。", imageParams:"bg-green-700", character:"👦"}, {text:"Help me! he cried.", translation:"救救我！他哭喊着。", imageParams:"bg-blue-100", character:"😭"}, {text:"It was a trick. He is Red Boy.", translation:"这是个诡计。他是红孩儿。", imageParams:"bg-red-500", character:"😈"}, {text:"He breathed Samadhi Fire.", translation:"他喷出了三昧真火。", imageParams:"bg-orange-600", character:"🔥🔥"}, {text:"Water could not stop it.", translation:"水灭不了这个火。", imageParams:"bg-blue-400", character:"💧❌"}, {text:"Guanyin used her vase to help.", translation:"观音用玉净瓶收服了他。", imageParams:"bg-white", character:"🏺"}], vocab:[{word:"Boy", cn:"男孩", emoji:"👦"}, {word:"Fire", cn:"火", emoji:"🔥"}, {word:"Tree", cn:"树", emoji:"🌳"}, {word:"Help", cn:"帮助", emoji:"🆘"}], quiz:{question:"Could water stop the fire?", options:["Yes", "No"], answer:1} },
  { id: 11, title: "Blackwater River", titleCN: "黑水河", emoji: "🌊", scenes: [{text:"The boat sank in the river.", translation:"船在河里沉了。", imageParams:"bg-blue-800", character:"🛶⬇️"}, {text:"The Dragon Prince captured the monk.", translation:"鼍龙太子抓走了唐僧。", imageParams:"bg-green-800", character:"🐉"}, {text:"Monkey called the West Sea Dragon.", translation:"悟空叫来了西海龙王。", imageParams:"bg-blue-200", character:"📞"}, {text:"It was the Dragon's nephew.", translation:"那是龙王的侄子。", imageParams:"bg-yellow-100", character:"👦"}, {text:"Go home now! said the King.", translation:"快回家！龙王说。", imageParams:"bg-red-200", character:"👉"}, {text:"The monk was saved again.", translation:"唐僧又得救了。", imageParams:"bg-green-200", character:"😌"}], vocab:[{word:"Sink", cn:"下沉", emoji:"⚓"}, {word:"Uncle", cn:"叔叔/舅舅", emoji:"👨"}, {word:"Boat", cn:"船", emoji:"🛶"}, {word:"Black", cn:"黑色", emoji:"⬛"}], quiz:{question:"Who helped Monkey?", options:["Dragon King", "A Fish"], answer:0} },
  { id: 12, title: "Contest of Strength", titleCN: "车迟国斗法", emoji: "⚡", scenes: [{text:"Three wizard monsters ruled the city.", translation:"三个妖道统治着城市。", imageParams:"bg-purple-700", character:"🧙‍♂️"}, {text:"They wanted a contest.", translation:"他们想要比试法力。", imageParams:"bg-yellow-400", character:"⚡"}, {text:"First, pray for rain.", translation:"第一，求雨。", imageParams:"bg-gray-400", character:"🌧️"}, {text:"Monkey summoned the Rain God.", translation:"悟空召唤了雨神。", imageParams:"bg-blue-500", character:"🐲"}, {text:"Then they guessed items in a box.", translation:"然后他们猜柜子里的东西。", imageParams:"bg-brown-500", character:"📦"}, {text:"Monkey King won every time.", translation:"美猴王每次都赢了。", imageParams:"bg-yellow-200", character:"🏆"}], vocab:[{word:"Rain", cn:"雨", emoji:"🌧️"}, {word:"Win", cn:"赢", emoji:"🥇"}, {word:"Box", cn:"盒子", emoji:"📦"}, {word:"City", cn:"城市", emoji:"🏙️"}], quiz:{question:"Who won the contest?", options:["The Monsters", "Monkey King"], answer:1} },
  { id: 13, title: "Women's Kingdom", titleCN: "女儿国", emoji: "👸", scenes: [{text:"They drank water from a river.", translation:"他们喝了河里的水。", imageParams:"bg-blue-300", character:"🥤"}, {text:"Their bellies started to hurt.", translation:"他们的肚子开始疼了。", imageParams:"bg-red-100", character:"🤰"}, {text:"This is the Women's Kingdom.", translation:"这里是女儿国。", imageParams:"bg-pink-200", character:"👸"}, {text:"The Queen wanted to marry the monk.", translation:"女王想嫁给唐僧。", imageParams:"bg-purple-100", character:"💍"}, {text:"A scorpion monster attacked.", translation:"一个蝎子精发动了袭击。", imageParams:"bg-brown-800", character:"🦂"}, {text:"The rooster star god helped them.", translation:"昴日星官公鸡神帮助了他们。", imageParams:"bg-orange-200", character:"🐓"}], vocab:[{word:"Water", cn:"水", emoji:"💧"}, {word:"Queen", cn:"女王", emoji:"👸"}, {word:"Drink", cn:"喝", emoji:"🥤"}, {word:"Hurt", cn:"疼", emoji:"🤕"}], quiz:{question:"Who helped fight the scorpion?", options:["A Rooster", "A Dog"], answer:0} },
  { id: 14, title: "Real & Fake Monkey", titleCN: "真假美猴王", emoji: "🎭", scenes: [{text:"Monkey hit some bad men.", translation:"悟空打死了一些坏人。", imageParams:"bg-gray-600", character:"👊"}, {text:"The monk sent him away.", translation:"唐僧把他赶走了。", imageParams:"bg-gray-200", character:"👋"}, {text:"Suddenly, another Monkey appeared.", translation:"突然，另一个悟空出现了。", imageParams:"bg-yellow-300", character:"🐵🐵"}, {text:"They looked exactly the same.", translation:"他们长得一模一样。", imageParams:"bg-yellow-100", character:"🪞"}, {text:"They fought to see who is real.", translation:"他们打起来比谁是真的。", imageParams:"bg-red-500", character:"⚔️"}, {text:"Buddha identified the Six-Eared Macaque.", translation:"如来佛认出了六耳猕猴。", imageParams:"bg-gold-100", character:"🧘"}], vocab:[{word:"Fake", cn:"假的", emoji:"🎭"}, {word:"Same", cn:"一样", emoji:"="}, {word:"Bad", cn:"坏", emoji:"👎"}, {word:"Real", cn:"真的", emoji:"✅"}], quiz:{question:"How many monkeys were there?", options:["One", "Two"], answer:1} },
  { id: 15, title: "Flaming Mountain", titleCN: "火焰山", emoji: "🌋", scenes: [{text:"It was too hot to walk.", translation:"太热了，走不动。", imageParams:"bg-orange-500", character:"🥵"}, {text:"A mountain of fire blocked the way.", translation:"一座火焰山挡住了路。", imageParams:"bg-red-600", character:"🔥⛰️"}, {text:"Monkey needed the Palm Leaf Fan.", translation:"悟空需要芭蕉扇。", imageParams:"bg-green-200", character:"🍃"}, {text:"Princess Iron Fan said no.", translation:"铁扇公主说不。", imageParams:"bg-purple-700", character:"🙅‍♀️"}, {text:"Monkey turned into a bug.", translation:"悟空变成了一只虫子。", imageParams:"bg-green-500", character:"🪰"}, {text:"He borrowed the fan and stopped the fire.", translation:"他借来了扇子，灭了火。", imageParams:"bg-blue-200", character:"🌬️"}], vocab:[{word:"Hot", cn:"热", emoji:"🔥"}, {word:"Fan", cn:"扇子", emoji:"🪭"}, {word:"Stop", cn:"停止", emoji:"🛑"}, {word:"Bug", cn:"虫子", emoji:"🪰"}], quiz:{question:"What stopped the fire?", options:["Water", "Magic Fan"], answer:1} },
  
  // --- 第三部分：艰难的旅程 (16-20 精修) ---
  { id: 16, title: "Bull Demon King", titleCN: "牛魔王", emoji: "🐂", scenes: [{text:"Bull Demon King was angry.", translation:"牛魔王很生气。", imageParams:"bg-red-800", character:"🐂"}, {text:"He turned into a giant white bull.", translation:"他变成了一头巨大的白牛。", imageParams:"bg-white", character:"🐂"}, {text:"He fought with Monkey King.", translation:"他和悟空打了起来。", imageParams:"bg-orange-500", character:"⚔️"}, {text:"Pigsy helped to fight.", translation:"八戒也来帮忙。", imageParams:"bg-pink-200", character:"🐷"}, {text:"Nezha came from the sky.", translation:"哪吒从天而降。", imageParams:"bg-red-200", character:"🧒"}, {text:"They caught the Bull King.", translation:"他们抓住了牛魔王。", imageParams:"bg-yellow-400", character:"⛓️"}], vocab:[{word:"Bull", cn:"公牛", emoji:"🐂"}, {word:"Fight", cn:"打架", emoji:"🥊"}, {word:"White", cn:"白色", emoji:"⚪"}, {word:"Sky", cn:"天空", emoji:"☁️"}], quiz:{question:"What animal is the Demon King?", options:["Bull", "Tiger"], answer:0} },
  { id: 17, title: "The Magic Fan", titleCN: "芭蕉扇", emoji: "🍃", scenes: [{text:"The fire was still burning.", translation:"火还在烧。", imageParams:"bg-orange-600", character:"🔥"}, {text:"Monkey waved the fan 49 times.", translation:"悟空扇了49下扇子。", imageParams:"bg-green-200", character:"👋"}, {text:"Heavy rain started to fall.", translation:"开始下大雨了。", imageParams:"bg-blue-400", character:"🌧️"}, {text:"The fire went out.", translation:"火熄灭了。", imageParams:"bg-gray-300", character:"💨"}, {text:"They returned the fan.", translation:"他们还回了扇子。", imageParams:"bg-purple-200", character:"🤝"}, {text:"They continued the journey.", translation:"他们继续赶路。", imageParams:"bg-yellow-100", character:"🚶"}], vocab:[{word:"Rain", cn:"雨", emoji:"🌧️"}, {word:"Stop", cn:"停止", emoji:"🛑"}, {word:"Fire", cn:"火", emoji:"🔥"}, {word:"Wave", cn:"挥动", emoji:"👋"}], quiz:{question:"Did the rain start?", options:["Yes", "No"], answer:0} },
  { id: 18, title: "Nine-Headed Bird", titleCN: "九头虫", emoji: "🦅", scenes: [{text:"The King lost a treasure.", translation:"国王丢了宝贝。", imageParams:"bg-yellow-100", character:"👑"}, {text:"It was stolen by a monster.", translation:"被妖怪偷走了。", imageParams:"bg-gray-800", character:"👺"}, {text:"The monster had nine heads.", translation:"妖怪有九个头。", imageParams:"bg-red-700", character:"🦅"}, {text:"It lived underwater.", translation:"它住在水下。", imageParams:"bg-blue-800", character:"🌊"}, {text:"Monkey and the dog god fought it.", translation:"悟空和哮天犬打了它。", imageParams:"bg-brown-500", character:"🐕"}, {text:"One head was bitten off.", translation:"一个头被咬掉了。", imageParams:"bg-red-500", character:"🩸"}], vocab:[{word:"Head", cn:"头", emoji:"🗣️"}, {word:"Steal", cn:"偷", emoji:"🤏"}, {word:"Nine", cn:"九", emoji:"9️⃣"}, {word:"Dog", cn:"狗", emoji:"🐕"}], quiz:{question:"How many heads did it have?", options:["One", "Nine"], answer:1} },
  { id: 19, title: "Little Thunder", titleCN: "小雷音寺", emoji: "🏯", scenes: [{text:"They saw a temple ahead.", translation:"他们看到前面有座庙。", imageParams:"bg-yellow-200", character:"🏯"}, {text:"It looked like the Buddha's home.", translation:"看起来像佛祖的家。", imageParams:"bg-gold-100", character:"✨"}, {text:"Monkey said it was fake.", translation:"悟空说是假的。", imageParams:"bg-red-100", character:"🤥"}, {text:"The monk went inside anyway.", translation:"唐僧还是进去了。", imageParams:"bg-gray-200", character:"🚶"}, {text:"A giant cymbal trapped Monkey.", translation:"一个大钹把悟空扣住了。", imageParams:"bg-gold-600", character:"📀"}, {text:"It was the Yellow Brow Monster.", translation:"那是黄眉怪。", imageParams:"bg-yellow-800", character:"🤨"}], vocab:[{word:"Temple", cn:"寺庙", emoji:"🏯"}, {word:"Fake", cn:"假的", emoji:"🎭"}, {word:"Look", cn:"看", emoji:"👀"}, {word:"Trap", cn:"困住", emoji:"🕸️"}], quiz:{question:"Was the temple real?", options:["Yes", "No"], answer:1} },
  { id: 20, title: "Yellow Brows", titleCN: "黄眉老祖", emoji: "🤨", scenes: [{text:"Monkey could not get out.", translation:"悟空出不去。", imageParams:"bg-black", character:"🔒"}, {text:"The gods tried to help.", translation:"神仙们来帮忙。", imageParams:"bg-blue-200", character:"☁️"}, {text:"The monster had a magic sack.", translation:"妖怪有个魔法袋子。", imageParams:"bg-brown-400", character:"💰"}, {text:"He sucked everyone inside.", translation:"他把大家都吸进去了。", imageParams:"bg-gray-600", character:"🌪️"}, {text:"Maitreya Buddha arrived.", translation:"弥勒佛来了。", imageParams:"bg-yellow-100", character:"🧘"}, {text:"The monster was his servant.", translation:"妖怪是他的童子。", imageParams:"bg-orange-200", character:"👦"}], vocab:[{word:"Bag", cn:"袋子", emoji:"🛍️"}, {word:"Help", cn:"帮忙", emoji:"🆘"}, {word:"God", cn:"神", emoji:"👼"}, {word:"Out", cn:"出去", emoji:"🚪"}], quiz:{question:"Who saved them?", options:["Maitreya Buddha", "Jade Emperor"], answer:0} },
  { id: 21, title: "The Python", titleCN: "蟒蛇精", emoji: "🐍", scenes: [{text:"They walked into a dark forest.", translation:"他们走进了一片黑森林。", imageParams:"bg-green-900", character:"🌲"}, {text:"An old lady was crying.", translation:"一个老奶奶在哭。", imageParams:"bg-gray-200", character:"👵"}, {text:"A giant python ate her son.", translation:"一条大蟒蛇吃了她儿子。", imageParams:"bg-red-900", character:"🐍"}, {text:"It had glowing red eyes.", translation:"它有发光的红眼睛。", imageParams:"bg-black", character:"👀"}, {text:"Monkey hit it with his stick.", translation:"悟空用棒子打它。", imageParams:"bg-yellow-500", character:"🥖"}, {text:"Pigsy pulled its tail.", translation:"八戒拉它的尾巴。", imageParams:"bg-pink-300", character:"🐖"}], vocab:[{word:"Forest", cn:"森林", emoji:"🌲"}, {word:"Snake", cn:"蛇", emoji:"🐍"}, {word:"Cry", cn:"哭", emoji:"😭"}, {word:"Eye", cn:"眼睛", emoji:"👀"}], quiz:{question:"What animal was the monster?", options:["A Python 🐍", "A Tiger 🐅"], answer:0} },
  { id: 22, title: "Purple Bamboo", titleCN: "紫竹林", emoji: "🎋", scenes: [{text:"Monkey went to see Guanyin.", translation:"悟空去见观音。", imageParams:"bg-purple-200", character:"🧘‍♀️"}, {text:"She was weaving a basket.", translation:"她在编篮子。", imageParams:"bg-brown-200", character:"🧺"}, {text:"She did not dress up.", translation:"她没有梳妆打扮。", imageParams:"bg-white", character:"👗"}, {text:"They went to the river.", translation:"他们去了河边。", imageParams:"bg-blue-300", character:"🌊"}, {text:"She dropped the basket.", translation:"她扔下了篮子。", imageParams:"bg-blue-500", character:"⬇️"}, {text:"A goldfish was caught.", translation:"一条金鱼被抓住了。", imageParams:"bg-orange-300", character:"🐟"}], vocab:[{word:"Basket", cn:"篮子", emoji:"🧺"}, {word:"Fish", cn:"鱼", emoji:"🐟"}, {word:"River", cn:"河", emoji:"🌊"}, {word:"Catch", cn:"抓住", emoji:"🎣"}], quiz:{question:"What did Guanyin use?", options:["A Basket 🧺", "A Net 🕸️"], answer:0} },
  { id: 23, title: "Spider Cave", titleCN: "盘丝洞", emoji: "🕸️", scenes: [{text:"Tang Monk saw a house.", translation:"唐僧看到一座房子。", imageParams:"bg-gray-300", character:"🏠"}, {text:"Seven women lived there.", translation:"七个女人住在那里。", imageParams:"bg-pink-200", character:"👩‍🦰"}, {text:"They were spider monsters.", translation:"她们是蜘蛛精。", imageParams:"bg-black", character:"🕷️"}, {text:"They shot webs from bellies.", translation:"她们从肚脐吐丝。", imageParams:"bg-white", character:"🕸️"}, {text:"The house was covered.", translation:"房子被罩住了。", imageParams:"bg-gray-100", character:"🏚️"}, {text:"Monkey turned into a bird.", translation:"悟空变成了一只鸟。", imageParams:"bg-blue-200", character:"🐦"}], vocab:[{word:"Spider", cn:"蜘蛛", emoji:"🕷️"}, {word:"Web", cn:"网", emoji:"🕸️"}, {word:"House", cn:"房子", emoji:"🏠"}, {word:"Bird", cn:"鸟", emoji:"🐦"}], quiz:{question:"How many spiders?", options:["Seven 7️⃣", "One 1️⃣"], answer:0} },
  { id: 24, title: "Hundred Eyes", titleCN: "百眼魔君", emoji: "👁️", scenes: [{text:"The spiders ran to their brother.", translation:"蜘蛛们跑去找师兄。", imageParams:"bg-yellow-200", character:"🏃‍♀️"}, {text:"He was a Taoist master.", translation:"他是一个道士。", imageParams:"bg-blue-700", character:"🧙‍♂️"}, {text:"He gave the team poisoned tea.", translation:"他给队伍喝了毒茶。", imageParams:"bg-green-900", character:"🍵"}, {text:"He took off his shirt.", translation:"他脱掉了上衣。", imageParams:"bg-orange-100", character:"👕"}, {text:"He had a hundred eyes.", translation:"他有一百只眼睛。", imageParams:"bg-yellow-400", character:"👀"}, {text:"Golden light blinded Monkey.", translation:"金光闪瞎了悟空。", imageParams:"bg-yellow-200", character:"✨"}], vocab:[{word:"Eye", cn:"眼睛", emoji:"👁️"}, {word:"Tea", cn:"茶", emoji:"🍵"}, {word:"Run", cn:"跑", emoji:"🏃"}, {word:"Light", cn:"光", emoji:"💡"}], quiz:{question:"What did he have on his body?", options:["Eyes 👀", "Ears 👂"], answer:0} },
  { id: 25, title: "Lion Ridge", titleCN: "狮驼岭", emoji: "🦁", scenes: [{text:"A mountain of skeletons.", translation:"一座骷髅山。", imageParams:"bg-gray-800", character:"💀"}, {text:"Three demon kings lived here.", translation:"三个魔王住在这里。", imageParams:"bg-black", character:"👹👹👹"}, {text:"The first was a blue lion.", translation:"第一个是青狮。", imageParams:"bg-blue-600", character:"🦁"}, {text:"He could swallow an army.", translation:"他能吞下一支军队。", imageParams:"bg-red-300", character:"👄"}, {text:"Monkey jumped into his mouth.", translation:"悟空跳进了他嘴里。", imageParams:"bg-pink-800", character:"👅"}, {text:"He tickled the lion's tummy.", translation:"他在狮子肚子里挠痒痒。", imageParams:"bg-pink-400", character:"🤣"}], vocab:[{word:"Lion", cn:"狮子", emoji:"🦁"}, {word:"Mouth", cn:"嘴巴", emoji:"👄"}, {word:"Jump", cn:"跳", emoji:"🆙"}, {word:"King", cn:"大王", emoji:"👑"}], quiz:{question:"Where did Monkey go?", options:["Inside the Lion", "On the mountain"], answer:0} },
  { id: 26, title: "White Elephant", titleCN: "白象精", emoji: "🐘", scenes: [{text:"The second king was an elephant.", translation:"第二个大王是大象。", imageParams:"bg-gray-200", character:"🐘"}, {text:"He had a long nose.", translation:"他有长长的鼻子。", imageParams:"bg-gray-300", character:"👃"}, {text:"He caught Pigsy easily.", translation:"他轻松抓住了八戒。", imageParams:"bg-pink-200", character:"🐖"}, {text:"Monkey fought him with the stick.", translation:"悟空用棒子和他打。", imageParams:"bg-yellow-500", character:"🥖"}, {text:"The elephant used his trunk.", translation:"大象用了他的象鼻。", imageParams:"bg-gray-400", character:"➰"}, {text:"Pigsy cried for help.", translation:"八戒大喊救命。", imageParams:"bg-blue-100", character:"😭"}], vocab:[{word:"Elephant", cn:"大象", emoji:"🐘"}, {word:"Nose", cn:"鼻子", emoji:"👃"}, {word:"Long", cn:"长", emoji:"📏"}, {word:"Help", cn:"救命", emoji:"🆘"}], quiz:{question:"What animal is the second king?", options:["Elephant 🐘", "Lion 🦁"], answer:0} },
  { id: 27, title: "Golden Eagle", titleCN: "大鹏鸟", emoji: "🦅", scenes: [{text:"The third king was an eagle.", translation:"第三个大王是只大鹏。", imageParams:"bg-yellow-600", character:"🦅"}, {text:"He had a magic bottle.", translation:"他有个魔法瓶子。", imageParams:"bg-white", character:"🍾"}, {text:"He flew very fast.", translation:"他飞得非常快。", imageParams:"bg-blue-300", character:"💨"}, {text:"Even Monkey could not escape.", translation:"连悟空都逃不掉。", imageParams:"bg-red-200", character:"🚫"}, {text:"They were put in a steamer.", translation:"他们被放进了蒸笼。", imageParams:"bg-gray-500", character:"♨️"}, {text:"Monkey went to see Buddha.", translation:"悟空去找了如来。", imageParams:"bg-gold-200", character:"☁️"}], vocab:[{word:"Eagle", cn:"鹰/大鹏", emoji:"🦅"}, {word:"Fast", cn:"快", emoji:"⚡"}, {word:"Fly", cn:"飞", emoji:"🕊️"}, {word:"Bottle", cn:"瓶子", emoji:"🍾"}], quiz:{question:"Could Monkey fly faster?", options:["No", "Yes"], answer:0} },
  { id: 28, title: "Kid Kingdom", titleCN: "比丘国", emoji: "👶", scenes: [{text:"The King was sick.", translation:"国王病了。", imageParams:"bg-purple-200", character:"🤒"}, {text:"A wizard gave him medicine.", translation:"国师给他药。", imageParams:"bg-green-800", character:"💊"}, {text:"He needed hearts of 1000 kids.", translation:"他需要一千个孩子的心。", imageParams:"bg-red-300", character:"💔"}, {text:"Monkey hid the children.", translation:"悟空把孩子藏了起来。", imageParams:"bg-blue-100", character:"🦢"}, {text:"The wizard was a white deer.", translation:"国师是一头白鹿。", imageParams:"bg-white", character:"🦌"}, {text:"The God of Longevity came.", translation:"寿星来了。", imageParams:"bg-yellow-100", character:"👴"}], vocab:[{word:"Kid", cn:"小孩", emoji:"👶"}, {word:"Deer", cn:"鹿", emoji:"🦌"}, {word:"Sick", cn:"生病", emoji:"🤒"}, {word:"Heart", cn:"心", emoji:"❤️"}], quiz:{question:"Who was the wizard?", options:["A Deer 🦌", "A Fox 🦊"], answer:0} },
  { id: 29, title: "Bottomless Pit", titleCN: "无底洞", emoji: "🕳️", scenes: [{text:"They heard a voice in the forest.", translation:"他们在林子里听到声音。", imageParams:"bg-green-900", character:"🌲"}, {text:"A lady was tied up.", translation:"一个女士被绑着。", imageParams:"bg-pink-100", character:"🎀"}, {text:"She was a mouse demon.", translation:"她是个老鼠精。", imageParams:"bg-gray-400", character:"🐭"}, {text:"She took the monk down a pit.", translation:"她把唐僧带进了深坑。", imageParams:"bg-black", character:"⬇️"}, {text:"The pit had no bottom.", translation:"坑没有底。", imageParams:"bg-gray-800", character:"🕳️"}, {text:"Monkey found her shoe.", translation:"悟空发现了她的鞋。", imageParams:"bg-red-200", character:"👠"}], vocab:[{word:"Mouse", cn:"老鼠", emoji:"🐭"}, {word:"Pit", cn:"坑", emoji:"🕳️"}, {word:"Voice", cn:"声音", emoji:"🗣️"}, {word:"Shoe", cn:"鞋", emoji:"👠"}], quiz:{question:"What animal was the lady?", options:["Mouse 🐭", "Cat 🐱"], answer:0} },
  { id: 30, title: "Bald Kingdom", titleCN: "灭法国", emoji: "🚫", scenes: [{text:"The King hated monks.", translation:"国王讨厌和尚。", imageParams:"bg-red-700", character:"😠"}, {text:"He killed 9996 monks.", translation:"他杀了9996个和尚。", imageParams:"bg-black", character:"💀"}, {text:"Monkey wanted to teach him a lesson.", translation:"悟空想教训他。", imageParams:"bg-yellow-300", character:"💡"}, {text:"At night, Monkey shaved everyone.", translation:"晚上，悟空把大家都剃了头。", imageParams:"bg-blue-900", character:"🪒"}, {text:"The King woke up bald.", translation:"国王醒来变成了光头。", imageParams:"bg-orange-100", character:"👨‍🦲"}, {text:"He promised to be good.", translation:"他保证以后做好人。", imageParams:"bg-green-200", character:"🤝"}], vocab:[{word:"King", cn:"国王", emoji:"🤴"}, {word:"Hair", cn:"头发", emoji:"💇"}, {word:"Hate", cn:"讨厌", emoji:"😡"}, {word:"Good", cn:"好", emoji:"👍"}], quiz:{question:"What happened to the King?", options:["Lost hair 👨‍🦲", "Lost money 💸"], answer:0} },
  { id: 31, title: "Leopard Demon", titleCN: "隐雾山", emoji: "🐆", scenes: [{text:"Fog covered the mountain.", translation:"大雾笼罩了山。", imageParams:"bg-gray-400", character:"🌫️"}, {text:"A leopard demon lived here.", translation:"一个豹子精住在这里。", imageParams:"bg-yellow-600", character:"🐆"}, {text:"He made a fake head.", translation:"他做了一个假头。", imageParams:"bg-orange-200", character:"🗣️"}, {text:"He threw it to Monkey.", translation:"他把它扔给悟空。", imageParams:"bg-red-300", character:"🧶"}, {text:"Pigsy cried for the master.", translation:"八戒为师父哭泣。", imageParams:"bg-blue-100", character:"😭"}, {text:"But the master was safe.", translation:"但师父是安全的。", imageParams:"bg-green-200", character:"🧘"}], vocab:[{word:"Fog", cn:"雾", emoji:"🌫️"}, {word:"Leopard", cn:"豹子", emoji:"🐆"}, {word:"Safe", cn:"安全", emoji:"🛡️"}, {word:"Cry", cn:"哭", emoji:"😢"}], quiz:{question:"Was the head real?", options:["No", "Yes"], answer:0} },
  { id: 32, title: "Pray for Rain", titleCN: "凤仙郡", emoji: "🌧️", scenes: [{text:"The land was very dry.", translation:"土地非常干旱。", imageParams:"bg-yellow-100", character:"☀️"}, {text:"No rain for three years.", translation:"三年没下雨了。", imageParams:"bg-orange-100", character:"🌵"}, {text:"The Jade Emperor was angry.", translation:"玉帝很生气。", imageParams:"bg-blue-900", character:"😠"}, {text:"A chicken must eat a mountain of rice.", translation:"一只鸡必须吃完米山。", imageParams:"bg-white", character:"🐓🍚"}, {text:"A dog must eat a mountain of flour.", translation:"一只狗必须吃完面山。", imageParams:"bg-brown-100", character:"🐕🍜"}, {text:"Monkey helped them apologize.", translation:"悟空帮他们道歉。", imageParams:"bg-green-200", character:"🙏"}], vocab:[{word:"Rain", cn:"雨", emoji:"🌧️"}, {word:"Dry", cn:"干", emoji:"🏜️"}, {word:"Angry", cn:"生气", emoji:"😤"}, {word:"Eat", cn:"吃", emoji:"🍽️"}], quiz:{question:"What did the chicken eat?", options:["Rice 🍚", "Corn 🌽"], answer:0} },
  { id: 33, title: "Nine Lions", titleCN: "九灵元圣", emoji: "🦁", scenes: [{text:"The princes wanted to learn kung fu.", translation:"王子们想学功夫。", imageParams:"bg-red-100", character:"🥋"}, {text:"Monkey taught them.", translation:"悟空教了他们。", imageParams:"bg-yellow-200", character:"👨‍🏫"}, {text:"Their weapons were stolen.", translation:"他们的兵器被偷了。", imageParams:"bg-gray-800", character:"🕵️"}, {text:"A yellow lion took them.", translation:"一只黄狮子拿走了。", imageParams:"bg-yellow-600", character:"🦁"}, {text:"His grandpa had nine heads.", translation:"他的爷爷有九个头。", imageParams:"bg-orange-700", character:"👹"}, {text:"He caught Monkey easily.", translation:"他轻松抓住了悟空。", imageParams:"bg-black", character:"🕸️"}], vocab:[{word:"Lion", cn:"狮子", emoji:"🦁"}, {word:"Teach", cn:"教", emoji:"🏫"}, {word:"Steal", cn:"偷", emoji:"🤏"}, {word:"Nine", cn:"九", emoji:"9️⃣"}], quiz:{question:"How many heads did the grandpa have?", options:["Nine 9️⃣", "One 1️⃣"], answer:0} },
  { id: 34, title: "Rhino Kings", titleCN: "犀牛精", emoji: "🦏", scenes: [{text:"It was the lantern festival.", translation:"那是元宵节。", imageParams:"bg-red-900", character:"🏮"}, {text:"Three Buddhas came to eat oil.", translation:"三个佛祖来吃油。", imageParams:"bg-gold-100", character:"🏺"}, {text:"Monkey saw they were fake.", translation:"悟空看出他们是假的。", imageParams:"bg-blue-200", character:"👀"}, {text:"They were Rhino monsters.", translation:"他们是犀牛精。", imageParams:"bg-gray-500", character:"🦏"}, {text:"They ran into the ocean.", translation:"他们跑进了海里。", imageParams:"bg-blue-600", character:"🌊"}, {text:"The Dragon King helped catch them.", translation:"龙王帮忙抓住了他们。", imageParams:"bg-green-600", character:"🐉"}], vocab:[{word:"Oil", cn:"油", emoji:"🛢️"}, {word:"Rhino", cn:"犀牛", emoji:"🦏"}, {word:"Ocean", cn:"海洋", emoji:"🌊"}, {word:"Fake", cn:"假的", emoji:"🎭"}], quiz:{question:"What did they steal?", options:["Oil 🛢️", "Gold 💰"], answer:0} },
  { id: 35, title: "Moon Rabbit", titleCN: "玉兔精", emoji: "🐰", scenes: [{text:"The Princess threw a ball.", translation:"公主抛了一个绣球。", imageParams:"bg-pink-200", character:"🧶"}, {text:"It hit Tang Monk.", translation:"它砸中了唐僧。", imageParams:"bg-yellow-100", character:"🤕"}, {text:"She wanted to marry him.", translation:"她想嫁给他。", imageParams:"bg-red-100", character:"💒"}, {text:"Monkey saw she was a rabbit.", translation:"悟空看出她是兔子。", imageParams:"bg-white", character:"🐰"}, {text:"She used a pestle to fight.", translation:"她用捣药杵打架。", imageParams:"bg-gray-300", character:"💪"}, {text:"Chang'e came to take her home.", translation:"嫦娥来带她回家。", imageParams:"bg-blue-900", character:"🌙"}], vocab:[{word:"Rabbit", cn:"兔子", emoji:"🐰"}, {word:"Moon", cn:"月亮", emoji:"🌕"}, {word:"Ball", cn:"球", emoji:"⚽"}, {word:"Home", cn:"家", emoji:"🏡"}], quiz:{question:"Who was the princess?", options:["A Rabbit 🐰", "A Cat 🐱"], answer:0} },

  // --- 第四部分：终极之旅 (36-50) ---
  { id: 36, title: "Kind Man", titleCN: "寇员外", emoji: "👴", scenes: [{text:"They stayed at a rich man's house.", translation:"他们住在一个富人家。", imageParams:"bg-yellow-100", character:"🏡"}, {text:"He liked to feed monks.", translation:"他喜欢斋僧。", imageParams:"bg-orange-50", character:"🍚"}, {text:"Bad men robbed the house.", translation:"坏人抢劫了房子。", imageParams:"bg-black", character:"🥷"}, {text:"The rich man died.", translation:"富人死了。", imageParams:"bg-gray-600", character:"⚰️"}, {text:"Monkey went to hell.", translation:"悟空去了地府。", imageParams:"bg-purple-900", character:"👻"}, {text:"He brought the man back to life.", translation:"他把那人救活了。", imageParams:"bg-green-200", character:"✨"}], vocab:[{word:"Rich", cn:"富有", emoji:"💰"}, {word:"Life", cn:"生命", emoji:"❤️"}, {word:"House", cn:"房子", emoji:"🏠"}, {word:"Man", cn:"男人", emoji:"👨"}], quiz:{question:"Did the man live?", options:["Yes", "No"], answer:0} },
  { id: 37, title: "Iron Bridge", titleCN: "凌云渡", emoji: "🌉", scenes: [{text:"They reached a big mountain.", translation:"他们到了一座大山。", imageParams:"bg-stone-300", character:"⛰️"}, {text:"There was a thin log bridge.", translation:"有一座细细的独木桥。", imageParams:"bg-brown-600", character:"🪵"}, {text:"Pigsy was too scared.", translation:"八戒太害怕了。", imageParams:"bg-pink-100", character:"😱"}, {text:"Monkey ran across easily.", translation:"悟空轻松跑了过去。", imageParams:"bg-yellow-200", character:"🏃"}, {text:"A boatman came.", translation:"一个船夫来了。", imageParams:"bg-blue-400", character:"🛶"}, {text:"The boat had no bottom.", translation:"船没有底。", imageParams:"bg-blue-800", character:"🕳️"}], vocab:[{word:"Bridge", cn:"桥", emoji:"🌉"}, {word:"Boat", cn:"船", emoji:"🛶"}, {word:"Scared", cn:"害怕", emoji:"😨"}, {word:"Run", cn:"跑", emoji:"🏃"}], quiz:{question:"Was the boat normal?", options:["No, bottomless", "Yes"], answer:0} },
  { id: 38, title: "Thunder Temple", titleCN: "雷音寺", emoji: "🏯", scenes: [{text:"They saw the real temple.", translation:"他们看到了真正的雷音寺。", imageParams:"bg-gold-200", character:"🏯"}, {text:"Golden light was everywhere.", translation:"到处都是金光。", imageParams:"bg-yellow-100", character:"✨"}, {text:"They met the Buddha.", translation:"他们见到了如来佛。", imageParams:"bg-orange-100", character:"🙏"}, {text:"The journey is done!", translation:"旅程结束了！", imageParams:"bg-green-200", character:"🎉"}, {text:"Please give us the scriptures.", translation:"请给我们经书。", imageParams:"bg-blue-100", character:"📘"}, {text:"Two monks asked for a gift.", translation:"两个罗汉索要礼物。", imageParams:"bg-gray-200", character:"🎁"}], vocab:[{word:"Gold", cn:"金子", emoji:"🥇"}, {word:"Meet", cn:"遇见", emoji:"🤝"}, {word:"Light", cn:"光", emoji:"💡"}, {word:"Gift", cn:"礼物", emoji:"🎁"}], quiz:{question:"Who did they meet?", options:["Buddha", "Jade Emperor"], answer:0} },
  { id: 39, title: "Blank Books", titleCN: "无字天书", emoji: "📘", scenes: [{text:"They got the books.", translation:"他们拿到了书。", imageParams:"bg-blue-500", character:"📚"}, {text:"They flew back home.", translation:"他们飞回了家。", imageParams:"bg-sky-300", character:"☁️"}, {text:"An eagle tore a book.", translation:"一只老鹰撕了一本书。", imageParams:"bg-brown-400", character:"🦅"}, {text:"They looked inside.", translation:"他们往里看。", imageParams:"bg-white", character:"👀"}, {text:"The pages were white!", translation:"书页是白的！", imageParams:"bg-gray-100", character:"⬜"}, {text:"No words inside!", translation:"里面没有字！", imageParams:"bg-red-100", character:"🚫"}], vocab:[{word:"Book", cn:"书", emoji:"📖"}, {word:"White", cn:"白色", emoji:"⚪"}, {word:"Fly", cn:"飞", emoji:"✈️"}, {word:"Look", cn:"看", emoji:"👀"}], quiz:{question:"Were there words?", options:["No", "Yes"], answer:0} },
  { id: 40, title: "Old Turtle", titleCN: "通天河老龟", emoji: "🐢", scenes: [{text:"They went back to Buddha.", translation:"他们回去找如来。", imageParams:"bg-gold-100", character:"🔙"}, {text:"They gave the bowl.", translation:"他们交出了紫金钵。", imageParams:"bg-purple-200", character:"🥣"}, {text:"They got real books.", translation:"他们拿到了真书。", imageParams:"bg-green-200", character:"📜"}, {text:"On the way back, they fell.", translation:"在回去路上，他们掉下来了。", imageParams:"bg-blue-400", character:"⬇️"}, {text:"The old turtle carried them.", translation:"老龟驮着他们。", imageParams:"bg-green-800", character:"🐢"}, {text:"He threw them in the water!", translation:"他把他们扔进了水里！", imageParams:"bg-blue-600", character:"💦"}], vocab:[{word:"Turtle", cn:"乌龟", emoji:"🐢"}, {word:"Wet", cn:"湿", emoji:"💧"}, {word:"Water", cn:"水", emoji:"🌊"}, {word:"Fall", cn:"掉落", emoji:"📉"}], quiz:{question:"Did they get wet?", options:["Yes", "No"], answer:0} },
  { id: 41, title: "Drying Books", titleCN: "晒经石", emoji: "📜", scenes: [{text:"The books were wet.", translation:"经书湿了。", imageParams:"bg-blue-200", character:"💧📘"}, {text:"They put them on a rock.", translation:"他们把书放在石头上。", imageParams:"bg-stone-400", character:"🪨"}, {text:"The sun dried them.", translation:"太阳晒干了它们。", imageParams:"bg-yellow-100", character:"☀️"}, {text:"Pigsy tried to peel a page.", translation:"八戒试着揭下一页。", imageParams:"bg-pink-100", character:"📄"}, {text:"A corner ripped off.", translation:"一个角被撕掉了。", imageParams:"bg-gray-200", character:"💔"}, {text:"Nothing is perfect.", translation:"没有什么事完美的。", imageParams:"bg-green-100", character:"😌"}], vocab:[{word:"Dry", cn:"干", emoji:"🏜️"}, {word:"Rock", cn:"岩石", emoji:"🪨"}, {word:"Sun", cn:"太阳", emoji:"☀️"}, {word:"Page", cn:"页", emoji:"📄"}], quiz:{question:"Did a page rip?", options:["Yes", "No"], answer:0} },
  { id: 42, title: "Flying Back", titleCN: "八大金刚", emoji: "☁️", scenes: [{text:"Eight gods came to help.", translation:"八大金刚来帮忙。", imageParams:"bg-yellow-200", character:"👼"}, {text:"They made a magic wind.", translation:"他们刮起一阵神风。", imageParams:"bg-blue-100", character:"🌬️"}, {text:"The team flew in the sky.", translation:"队伍在天上飞。", imageParams:"bg-sky-400", character:"🚀"}, {text:"They saw the ground below.", translation:"他们看到了下面的地面。", imageParams:"bg-green-500", character:"🌍"}, {text:"It was very fast.", translation:"速度非常快。", imageParams:"bg-orange-300", character:"⏩"}, {text:"Chang'an is near.", translation:"长安近了。", imageParams:"bg-red-100", character:"📍"}], vocab:[{word:"Fly", cn:"飞", emoji:"✈️"}, {word:"Wind", cn:"风", emoji:"💨"}, {word:"Fast", cn:"快", emoji:"⚡"}, {word:"Sky", cn:"天空", emoji:"☁️"}], quiz:{question:"How did they travel?", options:["Flying", "Walking"], answer:0} },
  { id: 43, title: "Chang'an City", titleCN: "长安城", emoji: "🏰", scenes: [{text:"They landed in the city.", translation:"他们降落在城里。", imageParams:"bg-red-800", character:"🛬"}, {text:"People were surprised.", translation:"人们很惊讶。", imageParams:"bg-yellow-200", character:"😲"}, {text:"The Emperor was waiting.", translation:"皇帝在等待。", imageParams:"bg-yellow-500", character:"🤴"}, {text:"My brother is back!", translation:"御弟回来了！", imageParams:"bg-orange-200", character:"👋"}, {text:"They had a big feast.", translation:"他们举行了盛大的宴会。", imageParams:"bg-purple-200", character:"🍖"}, {text:"Everyone was happy.", translation:"每个人都很开心。", imageParams:"bg-pink-200", character:"😄"}], vocab:[{word:"City", cn:"城市", emoji:"🏙️"}, {word:"King", cn:"国王/皇帝", emoji:"🤴"}, {word:"Happy", cn:"开心", emoji:"😊"}, {word:"Wait", cn:"等待", emoji:"⏳"}], quiz:{question:"Who waited for them?", options:["The Emperor", "A Farmer"], answer:0} },
  { id: 44, title: "Big Pagoda", titleCN: "大雁塔", emoji: "🏗️", scenes: [{text:"The Emperor built a tower.", translation:"皇帝建了一座塔。", imageParams:"bg-stone-300", character:"🏗️"}, {text:"It was for the books.", translation:"它是为了放经书。", imageParams:"bg-blue-200", character:"📚"}, {text:"It is called Big Goose Pagoda.", translation:"它叫大雁塔。", imageParams:"bg-gray-200", character:"🦆"}, {text:"Tang Monk read the books.", translation:"唐僧读了经书。", imageParams:"bg-yellow-100", character:"📖"}, {text:"He taught the people.", translation:"他教导了人们。", imageParams:"bg-green-200", character:"👨‍🏫"}, {text:"Peace came to the land.", translation:"和平降临了大地。", imageParams:"bg-blue-100", character:"🕊️"}], vocab:[{word:"Tower", cn:"塔", emoji:"🗼"}, {word:"Read", cn:"读", emoji:"👓"}, {word:"Build", cn:"建造", emoji:"🔨"}, {word:"Book", cn:"书", emoji:"📚"}], quiz:{question:"What is the tower for?", options:["Books", "Sleeping"], answer:0} },
  { id: 45, title: "Becoming Gods", titleCN: "受封", emoji: "✨", scenes: [{text:"They went back to Buddha.", translation:"他们回到了如来那里。", imageParams:"bg-gold-300", character:"🔙"}, {text:"Buddha smiled at them.", translation:"如来对他们微笑。", imageParams:"bg-yellow-100", character:"🙂"}, {text:"You did a good job.", translation:"你们做得很好。", imageParams:"bg-green-100", character:"👍"}, {text:"I will give you titles.", translation:"我要封赏你们。", imageParams:"bg-purple-200", character:"🎖️"}, {text:"You are now gods.", translation:"你们现在是神了。", imageParams:"bg-blue-200", character:"✨"}, {text:"They glowed with light.", translation:"他们发出了光芒。", imageParams:"bg-yellow-200", character:"🌟"}], vocab:[{word:"God", cn:"神", emoji:"👼"}, {word:"Job", cn:"工作/任务", emoji:"💼"}, {word:"Smile", cn:"微笑", emoji:"😊"}, {word:"Light", cn:"光", emoji:"✨"}], quiz:{question:"Did they become gods?", options:["Yes", "No"], answer:0} },
  { id: 46, title: "Victorious Buddha", titleCN: "斗战胜佛", emoji: "🐵", scenes: [{text:"Monkey King stepped up.", translation:"美猴王上前。", imageParams:"bg-yellow-300", character:"🐵"}, {text:"You fought many monsters.", translation:"你打了很多妖怪。", imageParams:"bg-red-200", character:"⚔️"}, {text:"You are Victorious Buddha.", translation:"你是斗战胜佛。", imageParams:"bg-gold-500", character:"🧘‍♂️"}, {text:"The golden band fell off.", translation:"金箍掉下来了。", imageParams:"bg-gray-200", character:"⭕⬇️"}, {text:"He is free now.", translation:"他现在自由了。", imageParams:"bg-blue-200", character:"🕊️"}, {text:"Monkey was very happy.", translation:"悟空非常开心。", imageParams:"bg-green-200", character:"😆"}], vocab:[{word:"Free", cn:"自由", emoji:"🦋"}, {word:"Win", cn:"胜利", emoji:"✌️"}, {word:"Happy", cn:"开心", emoji:"😄"}, {word:"Fight", cn:"战斗", emoji:"⚔️"}], quiz:{question:"What fell off Monkey?", options:["Golden Band", "His Hair"], answer:0} },
  { id: 47, title: "Altar Cleanser", titleCN: "净坛使者", emoji: "🐷", scenes: [{text:"Pigsy stepped up.", translation:"八戒上前。", imageParams:"bg-pink-200", character:"🐷"}, {text:"You still like to eat.", translation:"你还是喜欢吃。", imageParams:"bg-orange-100", character:"😋"}, {text:"You are Altar Cleanser.", translation:"你是净坛使者。", imageParams:"bg-purple-200", character:"🍽️"}, {text:"You can eat all offerings.", translation:"你可以吃所有供品。", imageParams:"bg-yellow-100", character:"🍱"}, {text:"Pigsy liked this job.", translation:"八戒喜欢这个工作。", imageParams:"bg-green-200", character:"😍"}, {text:"He rubbed his belly.", translation:"他摸了摸肚子。", imageParams:"bg-pink-300", character:"🤰"}], vocab:[{word:"Eat", cn:"吃", emoji:"🍴"}, {word:"Belly", cn:"肚子", emoji:"🤰"}, {word:"Job", cn:"工作", emoji:"💼"}, {word:"Like", cn:"喜欢", emoji:"❤️"}], quiz:{question:"Does Pigsy like eating?", options:["Yes", "No"], answer:0} },
  { id: 48, title: "Golden Arhat", titleCN: "金身罗汉", emoji: "🧔", scenes: [{text:"Sandy stepped up.", translation:"沙僧上前。", imageParams:"bg-blue-700", character:"🧔"}, {text:"You carried the luggage.", translation:"你挑了行李。", imageParams:"bg-brown-300", character:"🎒"}, {text:"You are Golden Arhat.", translation:"你是金身罗汉。", imageParams:"bg-gold-400", character:"💪"}, {text:"Sandy bowed low.", translation:"沙僧深深鞠躬。", imageParams:"bg-gray-200", character:"🙇"}, {text:"He was quiet and good.", translation:"他又安静又乖。", imageParams:"bg-blue-100", character:"🤫"}, {text:"His hard work paid off.", translation:"他的努力有了回报。", imageParams:"bg-green-300", character:"💰"}], vocab:[{word:"Carry", cn:"搬运", emoji:"📦"}, {word:"Quiet", cn:"安静", emoji:"🔇"}, {word:"Work", cn:"工作", emoji:"🔨"}, {word:"Good", cn:"好/乖", emoji:"👍"}], quiz:{question:"Was Sandy lazy?", options:["No", "Yes"], answer:0} },
  { id: 49, title: "Dragon God", titleCN: "八部天龙", emoji: "🐉", scenes: [{text:"The White Horse came.", translation:"白龙马来了。", imageParams:"bg-white", character:"🐎"}, {text:"He turned into a dragon.", translation:"他变回了龙。", imageParams:"bg-blue-500", character:"🐉"}, {text:"You carried the master.", translation:"你驮了师父。", imageParams:"bg-yellow-100", character:"🏇"}, {text:"You are a Dragon God.", translation:"你是八部天龙。", imageParams:"bg-purple-600", character:"🐲"}, {text:"He flew into a pool.", translation:"他飞进了一个水池。", imageParams:"bg-cyan-200", character:"💦"}, {text:"He guards the temple.", translation:"他守护着寺庙。", imageParams:"bg-red-800", character:"🛡️"}], vocab:[{word:"Horse", cn:"马", emoji:"🐎"}, {word:"Turn", cn:"变", emoji:"🔄"}, {word:"Dragon", cn:"龙", emoji:"🐉"}, {word:"Fly", cn:"飞", emoji:"✈️"}], quiz:{question:"What is the horse really?", options:["A Dragon", "A Donkey"], answer:0} },
  { id: 50, title: "The Legend", titleCN: "传奇永恒", emoji: "🏆", scenes: [{text:"Tang Monk became a Buddha.", translation:"唐僧成了佛。", imageParams:"bg-gold-100", character:"🧘"}, {text:"The five of them smiled.", translation:"师徒五人笑了。", imageParams:"bg-green-100", character:"😄"}, {text:"Their story is famous.", translation:"他们的故事很有名。", imageParams:"bg-blue-200", character:"📖"}, {text:"Children love Monkey King.", translation:"孩子们喜欢美猴王。", imageParams:"bg-yellow-200", character:"❤️"}, {text:"Be brave and kind.", translation:"要勇敢善良。", imageParams:"bg-purple-100", character:"🦁"}, {text:"The legend never ends.", translation:"传奇永不落幕。", imageParams:"bg-red-100", character:"♾️"}], vocab:[{word:"Story", cn:"故事", emoji:"📚"}, {word:"Love", cn:"爱", emoji:"❤️"}, {word:"Smile", cn:"微笑", emoji:"😄"}, {word:"End", cn:"结束", emoji:"🏁"}], quiz:{question:"Who became a Buddha?", options:["Tang Monk", "The Horse"], answer:0} }
];

// --- MINECRAFT DATA (史诗终章版 - 保持不变) ---
const MC_EPISODES = [
  ...Array.from({ length: 47 }, (_, i) => ({
    id: i + 1,
    title: `MC Level ${i + 1}`,
    titleCN: `MC关卡 ${i + 1}`,
    emoji: ["💎","🚨","🏠","⚔️","🧨","🌀","🏰","🌋","💀","🔥","👁️","📚","🌌","🐲","🥚"][i % 15] || "🧱",
    scenes: [{ text: "Steve is mining.", translation: "Steve在挖矿。", imageParams: "bg-stone-800", character: "⛏️" }],
    vocab: [{ word: "Mine", cn: "挖", emoji: "⛏️" }, { word: "Run", cn: "跑", emoji: "🏃" }, { word: "Sleep", cn: "睡", emoji: "🛌" }, { word: "Eat", cn: "吃", emoji: "🍖" }],
    quiz: { question: "What is he doing?", options: ["Mining", "Sleeping"], answer: 0 }
  })),
  { id: 48, title: "The Final Strike", titleCN: "最后一击", emoji: "🗡️", scenes: [ { text: "The Wither Storm was huge.", translation: "凋零风暴太大了。", imageParams: "bg-purple-900", character: "👾" }, { text: "Crack! The block broke.", translation: "咔嚓！方块碎了。", imageParams: "bg-white animate-pulse", character: "💔" } ], vocab: [ { word: "Huge", cn: "巨大的", emoji: "🦖" } ], quiz: { question: "What broke?", options: ["Bed", "Block"], answer: 1 } },
  { id: 49, title: "The Storm Clears", titleCN: "风暴消散", emoji: "🌤️", scenes: [ { text: "The sun came out again.", translation: "太阳又出来了。", imageParams: "bg-blue-300", character: "☀️" } ], vocab: [ { word: "Sun", cn: "太阳", emoji: "☀️" } ], quiz: { question: "Is it sunny?", options: ["Yes", "No"], answer: 0 } },
  { id: 50, title: "Ultimate Victory", titleCN: "终极胜利", emoji: "👑", scenes: [ { text: "You saved Minecraft!", translation: "你们拯救了Minecraft！", imageParams: "bg-green-500", character: "🟩" } ], vocab: [ { word: "Hero", cn: "英雄", emoji: "🦸" } ], quiz: { question: "Who is the hero?", options: ["You", "Zombie"], answer: 0 } }
];

// ==========================================
// 2. 共享组件
// ==========================================

const TTSButton = ({ text, onSpeak, styleType = "rounded" }) => {
  const speak = (e) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; 
    window.speechSynthesis.speak(utterance);
    if (onSpeak) onSpeak();
  };
  
  const styles = {
      rounded: "w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-full text-white shadow-md transition-transform active:scale-95 flex items-center justify-center",
      pixel: "p-3 bg-yellow-400 border-b-4 border-yellow-700 rounded text-yellow-900 hover:bg-yellow-300 active:border-b-0 active:mt-1 flex items-center justify-center"
  };

  return (
    <button onClick={speak} className={styles[styleType]}>
      <Volume2 size={20} />
    </button>
  );
};

const InteractiveMicButton = ({ onFinish, styleType = "rounded" }) => {
  const [status, setStatus] = useState('idle');
  const handleRecord = (e) => {
    e.stopPropagation();
    if (status !== 'idle') return;
    setStatus('listening');
    setTimeout(() => {
      setStatus('success');
      if (onFinish) onFinish();
      setTimeout(() => setStatus('idle'), 1500);
    }, 2000);
  };

  const styles = {
    rounded: `h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 overflow-hidden ${status === 'idle' ? 'w-10 bg-gray-200 text-gray-500 hover:bg-gray-300' : status === 'listening' ? 'w-32 bg-blue-400 text-white animate-pulse' : 'w-28 bg-green-400 text-white font-bold'}`,
    pixel: `p-2 rounded border-2 transition-all active:mt-1 active:border-b-2 border-b-4 flex items-center justify-center ${status === 'idle' ? 'w-12 bg-gray-200 text-gray-600 border-gray-400' : status === 'listening' ? 'w-36 bg-blue-400 text-white border-blue-600 animate-pulse' : 'w-36 bg-green-400 text-white border-green-600'}`
  };

  if (styleType === 'rounded' && status !== 'idle') {
      return (
        <button onClick={handleRecord} className={`h-10 px-4 rounded-full shadow-md flex items-center justify-center gap-2 transition-all ${status === 'listening' ? 'bg-blue-400 text-white w-32' : 'bg-green-400 text-white w-28'}`}>
           {status === 'listening' ? <><Loader size={16} className="animate-spin"/> <span className="text-xs font-bold">Listening</span></> : <><Star size={16} className="text-yellow-300 fill-yellow-300"/> <span className="text-xs font-bold">Great!</span></>}
        </button>
      );
  }

  return (
    <button onClick={handleRecord} className={styles[styleType]}>
      {status === 'idle' && <Mic size={20} />}
      {status === 'listening' && <Loader size={20} className="animate-spin" />}
      {status === 'success' && <Check size={20} />}
    </button>
  );
};

const ScoreBadge = ({ score, theme }) => (
  <div className={`fixed top-4 right-4 backdrop-blur border-4 rounded-full px-5 py-2 flex items-center shadow-xl z-50 transform hover:scale-105 transition-transform cursor-default ${theme === 'mc' ? 'bg-gray-900/90 border-green-600' : 'bg-white/95 border-pink-300'}`}>
    <span className="text-2xl mr-2 animate-bounce">{theme === 'mc' ? '❇️' : '🍑'}</span>
    <span className={`font-extrabold text-2xl ${theme === 'mc' ? 'text-green-400' : 'text-pink-500'}`}>{score}</span>
  </div>
);

// SHARED BUTTON DEFINITIONS
const WestButton = ({ children, onClick, color }) => {
    const colors = {
        blue: "bg-blue-500 hover:bg-blue-600",
        green: "bg-green-500 hover:bg-green-600",
        orange: "bg-orange-500 hover:bg-orange-600"
    };
    return (
        <button onClick={onClick} className={`${colors[color]} w-full px-6 py-4 rounded-2xl font-bold text-white text-lg shadow-lg active:scale-95 flex items-center justify-between group transition-all`}>
            <div className="flex items-center gap-4">{children}</div>
            <ArrowRight className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
    );
};

const MCButton = ({ children, onClick, color='gray' }) => (
    <button onClick={onClick} className={`w-full border-2 px-4 py-3 font-bold uppercase text-white bg-${color}-600 border-${color}-800 shadow-[2px_2px_0_#000] flex items-center justify-between`}>
        <div className="flex items-center gap-3">{children}</div>
        <ArrowRight />
    </button>
);

// ==========================================
// 3. 页面组件
// ==========================================

const LoginView = ({ username, setUsername, handleLogin }) => (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-10 left-10 text-gray-200 opacity-80">☁️</div>
        <div className="bg-white rounded-[2rem] border-4 border-yellow-300 p-10 w-full max-w-sm text-center shadow-xl z-10">
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4 text-5xl border-2 border-orange-200">🐵</div>
            <h1 className="text-3xl font-extrabold text-blue-900 mb-1">Welcome!</h1>
            <p className="text-gray-400 text-sm mb-8">What is your name, little hero?</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your name" className="w-full p-4 rounded-xl border-2 border-gray-200 text-center text-lg text-gray-700 focus:outline-none focus:border-yellow-400 mb-4 placeholder-gray-300" />
            <button onClick={handleLogin} disabled={!username.trim()} className="w-full py-4 bg-yellow-300 hover:bg-yellow-400 text-white text-xl font-bold rounded-xl shadow-sm disabled:opacity-50 transition-all active:scale-95">Start Adventure</button>
        </div>
    </div>
);

const WorldSelectView = ({ username, visitorCounts, onSelectWorld }) => (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center pt-20 font-sans">
         <div className="w-full max-w-4xl mb-12 text-center">
             <h2 className="text-4xl font-extrabold text-slate-800 mb-2">Choose a World</h2>
             <p className="text-slate-400">Ready to explore, {username}?</p>
         </div>
         <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
             <button onClick={() => onSelectWorld('west')} className="group bg-white rounded-3xl p-6 shadow-xl border-4 border-transparent hover:border-yellow-300 transition-all hover:-translate-y-2 relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 text-9xl opacity-10 group-hover:opacity-20 transition-opacity">☁️</div>
                 <div className="flex flex-col items-center">
                     <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🐵</div>
                     <h3 className="text-2xl font-bold text-slate-800 mb-2">Journey to the West</h3>
                     <p className="text-slate-400 text-sm mb-6">Classic adventures with Monkey King</p>
                     <div className="flex items-center gap-2 text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full"><Users size={14} /> {visitorCounts.west.toLocaleString()} Explorers</div>
                 </div>
             </button>
             <button onClick={() => onSelectWorld('mc')} className="group bg-gray-800 rounded-3xl p-6 shadow-xl border-4 border-transparent hover:border-green-500 transition-all hover:-translate-y-2 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                 <div className="flex flex-col items-center relative z-10">
                     <div className="text-8xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🧟</div>
                     <h3 className="text-2xl font-bold text-white mb-2 font-mono tracking-wider">BLOCK WORLD</h3>
                     <p className="text-gray-400 text-sm mb-6 font-mono">Epic battles & crafting</p>
                     <div className="flex items-center gap-2 text-xs font-bold text-green-400 bg-green-900/50 px-3 py-1 rounded-full font-mono"><Users size={14} /> {visitorCounts.mc.toLocaleString()} Players</div>
                 </div>
             </button>
         </div>
    </div>
);

const LevelSelectView = ({ theme, username, progress, episodes, onBack, onSelectEpisode, onOpenLeaderboard, onOpenUnlock }) => {
    const isMC = theme === 'mc';

    return (
        <div className={`min-h-screen p-4 pb-20 flex flex-col items-center ${isMC ? 'bg-stone-800 font-mono' : 'bg-sky-50 font-sans'}`}>
            <div className="w-full max-w-6xl flex justify-between items-center z-10 mt-4 mb-6 px-2">
                <div className="flex items-center gap-3">
                    {/* 🌟 修复：西游记世界的回到主页按钮 */}
                    {!isMC && (
                        <button onClick={onBack} className="p-3 rounded-full bg-white text-blue-500 hover:bg-blue-50 shadow-sm transition-all hover:scale-105 mr-2" title="Back to World Select">
                            <Home size={20}/>
                        </button>
                    )}
                    {isMC && (
                         <button onClick={onBack} className="p-3 rounded-full bg-gray-700 text-white border-2 border-gray-500 hover:scale-105 mr-2 transition-all" title="Back to World Select">
                            <Home size={20}/>
                        </button>
                    )}

                    {!isMC && <Cloud className="text-white/80 mr-2" size={32} />}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${isMC ? 'bg-gray-700 text-white border-2 border-gray-500' : 'bg-white text-blue-500'}`}>
                        <User size={18} />
                        <span className="font-bold">{username}</span>
                    </div>
                    <button onClick={onOpenLeaderboard} className={`p-2 rounded-full shadow-sm transition-all hover:scale-105 ${isMC ? 'bg-gray-700 text-yellow-400 border-2 border-gray-500' : 'bg-white text-yellow-500'}`}>
                        <Trophy size={18}/>
                    </button>
                    <button onClick={onOpenUnlock} className={`p-2 rounded-full shadow-sm transition-all hover:scale-105 ${isMC ? 'bg-gray-700 text-gray-400 border-2 border-gray-500' : 'bg-white text-gray-400'}`}>
                        <Lock size={18}/>
                    </button>
                </div>
                <ScoreBadge score={progress.score} theme={theme} />
            </div>

            <div className="text-center mb-8 mt-4">
                <h1 className={`text-4xl md:text-5xl font-extrabold mb-2 ${isMC ? 'text-white uppercase tracking-widest' : 'text-blue-900'}`}>
                    {isMC ? 'Adventure Map' : 'Journey to the West'}
                </h1>
                <div className={`inline-block px-6 py-1 rounded-full text-lg font-bold ${isMC ? 'bg-gray-900 text-green-400 border border-green-800' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>
                    50 Levels of Adventure
                </div>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full max-w-6xl z-10 px-2`}>
                {episodes.map((ep) => {
                    const isUnlocked = progress.unlocked.includes(ep.id);
                    return (
                        <button key={ep.id} disabled={!isUnlocked} onClick={() => onSelectEpisode(ep.id)} className={`relative flex flex-col items-center text-center p-2 h-32 justify-center transition-all ${isMC ? `border-4 ${isUnlocked ? 'bg-gray-700 border-gray-500 hover:border-white' : 'bg-stone-900 border-black opacity-50'}` : `rounded-2xl border-b-4 ${isUnlocked ? 'bg-white border-blue-200 hover:-translate-y-1 shadow-sm hover:border-blue-300' : 'bg-gray-100 border-gray-200 opacity-60'}`}`}>
                            {!isUnlocked && <div className="absolute top-1 right-1"><Lock size={14} className="text-gray-400" /></div>}
                            {isMC && <div className="absolute top-1 left-1 text-[10px] font-bold text-gray-500 bg-gray-900 px-1">LV.{ep.id}</div>}
                            {theme==='west' && <div className="absolute top-2 left-2 text-xs font-black text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded-md">{ep.id}</div>}
                            <div className={`text-3xl mb-1 ${!isUnlocked && 'grayscale opacity-50'}`}>{ep.emoji}</div>
                            <div className={`text-xs font-bold leading-tight line-clamp-1 ${isMC ? 'text-white uppercase' : 'text-gray-800'}`}>{ep.title}</div>
                            {!isMC && <div className="text-[10px] text-gray-400 mt-0.5">{ep.titleCN}</div>}
                        </button>
                    );
                })}
            </div>
            <div className="mt-12 text-gray-400/50 text-xs font-sans">© Jasper and His Dad</div>
        </div>
    );
};

const EpisodeMenu = ({ theme, ep, onNavigate, onBack }) => {
    const isMC = theme === 'mc';

    return (
        <div className={`min-h-screen flex flex-col items-center p-6 pt-20 ${isMC ? 'bg-stone-900 font-mono text-white' : 'bg-[#FFFBF0] font-sans'}`}>
            <button onClick={onBack} className={`absolute top-4 left-4 p-3 ${isMC ? 'bg-gray-700 border-2 border-gray-500' : 'bg-white rounded-full shadow hover:bg-gray-50'}`}><Home/></button>
            
            <div className="text-center mb-10">
                <div className={`text-7xl mb-4 inline-block ${isMC ? 'p-4 bg-gray-800 border-4 border-gray-600' : 'drop-shadow-md'}`}>{ep.emoji}</div>
                <h2 className={`text-3xl font-extrabold mb-1 ${isMC ? 'text-white' : 'text-slate-800'}`}>{ep.title}</h2>
                <p className={`${isMC ? 'text-green-400' : 'text-gray-500'} font-medium bg-white/60 px-4 py-1 rounded-full inline-block`}>{ep.titleCN}</p>
            </div>

            <div className="grid gap-4 w-full max-w-sm">
                {isMC ? (
                    <>
                        <MCButton onClick={() => onNavigate('story')} color="blue"><BookOpen/> Story Mode</MCButton>
                        <MCButton onClick={() => onNavigate('vocab')} color="green"><Hammer/> Crafting (Vocab)</MCButton>
                        <MCButton onClick={() => onNavigate('quiz')} color="red"><Sword/> Boss Battle</MCButton>
                    </>
                ) : (
                    <>
                        <WestButton onClick={() => onNavigate('story')} color="blue">
                            <div className="bg-white/20 p-2 rounded-full"><BookOpen size={20}/></div>
                            <div className="text-left"><div className="text-lg font-bold">Story Mode</div><div className="text-xs font-normal opacity-80">Listen to the story</div></div>
                        </WestButton>
                        <WestButton onClick={() => onNavigate('vocab')} color="green">
                            <div className="bg-white/20 p-2 rounded-full"><Star size={20}/></div>
                            <div className="text-left"><div className="text-lg font-bold">Magic Words</div><div className="text-xs font-normal opacity-80">Learn new words</div></div>
                        </WestButton>
                        <WestButton onClick={() => onNavigate('quiz')} color="orange">
                            <div className="bg-white/20 p-2 rounded-full"><Trophy size={20}/></div>
                            <div className="text-left"><div className="text-lg font-bold">Quiz Challenge</div><div className="text-xs font-normal opacity-80">Earn Peaches</div></div>
                        </WestButton>
                    </>
                )}
            </div>
        </div>
    );
};

const StoryView = ({ theme, ep, onBack, onFinish }) => {
    const isMC = theme === 'mc';
    const [sceneIndex, setSceneIndex] = useState(0);
    const scene = ep.scenes[sceneIndex];

    const StoryButtons = ({ text, styleType }) => (
        <div className="flex justify-center gap-3 mt-4">
            <TTSButton text={text} styleType={styleType} />
            <InteractiveMicButton onFinish={() => {}} styleType={styleType} />
        </div>
    );

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isMC ? 'bg-black font-mono' : 'bg-gray-900 font-sans'}`}>
            <button onClick={onBack} className="absolute top-4 left-4 p-2 text-white border border-white/20 rounded-full"><Home/></button>
            <div className={`w-full max-w-4xl aspect-video flex items-center justify-center relative ${isMC ? 'bg-gray-900 border-4 border-gray-600' : 'bg-gray-800 rounded-2xl'}`}>
                <div className={`absolute inset-0 ${scene.imageParams}`}></div>
                <span className="text-[100px] z-10 animate-bounce">{scene.character}</span>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-black/80 text-white text-center">
                    <h3 className="text-xl font-bold">{scene.text}</h3>
                    <p className="text-sm opacity-80">{scene.translation}</p>
                    <StoryButtons text={scene.text} styleType={isMC ? 'pixel' : 'rounded'} />
                </div>
            </div>
            <div className="flex gap-4 mt-4 w-full max-w-4xl">
                <button onClick={() => sceneIndex > 0 && setSceneIndex(s=>s-1)} disabled={sceneIndex===0} className="px-6 py-3 bg-gray-700 text-white font-bold disabled:opacity-30 rounded">Prev</button>
                <button onClick={() => { if(sceneIndex < ep.scenes.length-1) setSceneIndex(s=>s+1); else onFinish(); }} className={`flex-1 py-3 font-bold text-black rounded ${isMC ? 'bg-yellow-600' : 'bg-yellow-400'}`}>Next</button>
            </div>
        </div>
    );
};

const VocabView = ({ theme, ep, onBack }) => {
    const isMC = theme === 'mc';
    const [learned, setLearned] = useState(new Set());
    const isComplete = learned.size === ep.vocab.length;
    
    return (
        <div className={`min-h-screen p-6 pt-20 pb-32 flex flex-col items-center ${isMC ? 'bg-stone-800 font-mono' : 'bg-[#F0FFF4] font-sans'}`}>
             <button onClick={onBack} className={`absolute top-4 left-4 p-3 rounded-full shadow ${isMC ? 'bg-gray-700 border-2 border-gray-500' : 'bg-white hover:bg-gray-100'}`}><Home size={20}/></button>
             <div className="text-center mb-8">
                 <h2 className={`text-3xl font-extrabold mb-1 ${isMC ? 'text-white' : 'text-green-800'}`}>{isMC ? 'Crafting Table' : 'Magic Words'}</h2>
                 <p className={`${isMC ? 'text-gray-400' : 'text-green-600'}`}>Collect all stars: {learned.size} / {ep.vocab.length}</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                 {ep.vocab.map((v, idx) => {
                     const isLearned = learned.has(idx);
                     return (
                         <div key={idx} 
                              className={`relative p-6 flex flex-col items-center text-center transition-all duration-300 
                              ${isMC 
                                ? 'bg-gray-700 border-4 border-gray-900 hover:bg-gray-600' 
                                : 'bg-white border-2 border-[#D1FAE5] rounded-3xl shadow-sm hover:shadow-md hover:border-green-300'}`}
                              onClick={() => setLearned(prev => new Set(prev).add(idx))}
                         >
                             {isLearned && (
                                 <div className="absolute top-4 right-4 animate-bounce">
                                     <Star size={24} className="text-yellow-400 fill-yellow-400" />
                                 </div>
                             )}
                             <div className="text-6xl mb-4 transform transition-transform hover:scale-110 cursor-pointer">{v.emoji}</div>
                             <div className={`text-2xl font-bold mb-1 ${isMC ? 'text-white' : 'text-slate-800'}`}>{v.word}</div>
                             <div className={`text-sm mb-6 ${isMC ? 'text-gray-400' : 'text-gray-400'}`}>{v.cn}</div>
                             <div className="flex gap-3 mt-auto w-full justify-center">
                                 <TTSButton text={v.word} styleType={isMC ? 'pixel' : 'rounded'} onSpeak={() => setLearned(prev => new Set(prev).add(idx))} />
                                 <InteractiveMicButton onFinish={() => setLearned(prev => new Set(prev).add(idx))} styleType={isMC ? 'pixel' : 'rounded'} />
                             </div>
                         </div>
                     );
                 })}
             </div>
             {isComplete && <div className="fixed bottom-10 animate-bounce z-50"><button onClick={onBack} className={`px-12 py-4 rounded-full font-bold text-xl shadow-xl flex items-center gap-2 transition-transform active:scale-95 ${isMC ? 'bg-green-600 text-white border-4 border-green-800' : 'bg-green-500 text-white hover:bg-green-600'}`}><Check strokeWidth={3}/> Finish</button></div>}
        </div>
    );
};

const QuizView = ({ theme, ep, onBack, onComplete }) => {
    const isMC = theme === 'mc';
    const [res, setRes] = useState(null);
    const handleAns = (idx) => {
        if (idx === ep.quiz.answer) {
            setRes('correct');
            onComplete(5);
        } else {
            setRes('wrong');
        }
    };

    const WestQuiz = () => (
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-[#F97316]"></div>
            <div className="p-8 pt-12 text-center">
                <div className="text-[#F97316] font-bold tracking-[0.2em] text-xs uppercase mb-4">QUIZ CHALLENGE</div>
                <h2 className="text-3xl font-extrabold text-[#1E293B] mb-10 leading-tight">{ep.quiz.question}</h2>
                <div className="space-y-4">
                    {ep.quiz.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleAns(idx)} className="w-full p-5 rounded-2xl border-2 border-slate-100 bg-white text-slate-700 font-bold text-lg text-left transition-all hover:border-orange-300 hover:shadow-md active:scale-[0.98]">{opt}</button>
                    ))}
                </div>
                {res === 'wrong' && <div className="mt-6 text-red-500 font-bold bg-red-50 py-2 rounded-lg animate-pulse">Oops! Try Again!</div>}
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen p-6 pt-20 flex flex-col items-center ${isMC ? 'bg-red-900 font-mono' : 'bg-[#FFFBF0] font-sans'}`}>
            <button onClick={onBack} className={`absolute top-4 left-4 p-3 rounded-full shadow ${isMC ? 'bg-gray-700 border-2 border-gray-500 text-white' : 'bg-white hover:bg-gray-100'}`}><Home size={20}/></button>
            
            {res === 'correct' ? (
                <div className={`py-12 px-8 rounded-3xl text-center animate-in zoom-in-95 ${isMC ? 'bg-gray-800 border-4 border-white text-white' : 'bg-white shadow-2xl'}`}>
                    <div className="text-8xl mb-6 animate-bounce">{isMC ? '💎' : '🎉'}</div>
                    <h2 className={`text-4xl font-extrabold mb-2 ${isMC ? 'text-yellow-400 uppercase' : 'text-gray-800'}`}>Correct!</h2>
                    <div className={`text-xl font-bold mb-8 ${isMC ? 'text-green-400' : 'text-green-500'}`}>+5 Peaches</div>
                    <button onClick={() => onComplete(5)} className={`w-full py-4 text-xl font-bold rounded-xl shadow-lg ${isMC ? 'bg-green-600 text-white border-b-4 border-green-800' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                        Continue Exploring
                    </button>
                </div>
            ) : (
                isMC ? (
                    <div className="w-full max-w-lg p-8 text-center bg-gray-800 border-4 border-white text-white shadow-2xl">
                         <h2 className="text-2xl font-bold mb-8">{ep.quiz.question}</h2>
                         <div className="space-y-3">
                             {ep.quiz.options.map((opt, idx) => (
                                 <button key={idx} onClick={() => handleAns(idx)} className="w-full p-4 font-bold text-left bg-gray-700 hover:bg-gray-600 border-b-4 border-black active:border-b-0 active:mt-1 transition-all">{opt}</button>
                             ))}
                         </div>
                         {res === 'wrong' && <div className="mt-6 text-red-400 font-bold animate-pulse">❌ Damage Taken! Try again!</div>}
                    </div>
                ) : (
                    <WestQuiz />
                )
            )}
        </div>
    );
};

const UnlockModal = ({ unlockCode, setUnlockCode, unlockError, handleUnlockCode, onClose, theme }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
        <div className={`p-6 max-w-xs w-full shadow-2xl relative text-center ${theme === 'mc' ? 'bg-stone-800 border-4 border-white font-mono' : 'bg-white rounded-3xl border-4 border-yellow-300 font-sans'}`}>
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><X size={20} /></button>
            <div className={`mb-4 ${theme === 'mc' ? 'text-yellow-400' : 'text-orange-500'}`}>
                <Lock size={32} className="mx-auto mb-2" />
                <h3 className="font-bold text-lg uppercase">Parent Mode</h3>
                <p className="text-xs opacity-70 mt-1">Enter "Jasper" to Unlock</p>
            </div>
            <input type="password" value={unlockCode} onChange={(e) => setUnlockCode(e.target.value)} className={`w-full p-2 text-center text-lg mb-2 outline-none ${theme === 'mc' ? 'bg-stone-900 border-2 border-gray-600 text-white focus:border-yellow-500' : 'bg-gray-100 rounded-xl border-2 border-transparent focus:border-orange-400 text-gray-800'}`} placeholder="CODE" />
            {unlockError && <div className="text-red-500 text-xs mb-2 font-bold">{unlockError}</div>}
            <button onClick={handleUnlockCode} className={`w-full py-2 text-sm font-bold ${theme === 'mc' ? 'bg-yellow-600 text-white border-b-4 border-yellow-800 active:border-b-0 active:mt-1' : 'bg-orange-500 text-white rounded-xl shadow-md active:scale-95'}`}>UNLOCK</button>
        </div>
    </div>
);

const LeaderboardView = ({ leaderboardData, currentUser, onBack }) => (
    <div className="min-h-screen bg-yellow-50 p-6 flex flex-col items-center pt-20">
        <button onClick={onBack} className="absolute top-4 left-4 p-3 bg-white rounded-full shadow hover:bg-gray-100"><Home className="text-gray-600"/></button>
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden border-4 border-yellow-200">
            <div className="bg-yellow-400 p-6 text-center"><Trophy size={48} className="mx-auto text-white mb-2 drop-shadow-md" /><h2 className="text-2xl font-extrabold text-white">Peach Leaderboard</h2></div>
            <div className="p-4">
                {leaderboardData.map((entry, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-4 rounded-xl mb-2 ${entry.isMe ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-4"><div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${idx === 0 ? 'bg-yellow-500' : 'bg-gray-400'}`}>{idx + 1}</div><div className="font-bold text-gray-700">{entry.username}</div></div>
                        <div className="flex items-center gap-1"><span className="font-extrabold text-pink-500">{entry.score}</span><span className="text-xl">🍑</span></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- GAME SESSION CONTAINER ---
const GameSessionWrapper = ({ theme, username, progress, episodes, onBackToHub, onUpdateProgress, onOpenLeaderboard, onOpenUnlock }) => {
    const isMC = theme === 'mc';
    const [view, setView] = useState('level-select');
    const [activeEpisodeId, setActiveEpisodeId] = useState(null);
    const [showVictory, setShowVictory] = useState(false);

    const activeEp = episodes.find(e => e.id === activeEpisodeId);

    const handleLevelSelect = (id) => {
        setActiveEpisodeId(id);
        setView('menu');
    };

    const handleQuizComplete = (scoreToAdd) => {
        const nextId = activeEpisodeId + 1;
        onUpdateProgress(nextId, scoreToAdd);
        
        // Trigger victory if Level 50 is completed
        if (activeEpisodeId === 50) {
            setShowVictory(true);
        } else {
            setView('level-select');
        }
    };

    // VICTORY MODAL
    if (showVictory) {
        return (
            <div className="fixed inset-0 z-[80] bg-black/90 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-1000">
                <div className="absolute inset-0 opacity-50 animate-pulse" style={{backgroundImage: isMC ? 'radial-gradient(#fff 1px, transparent 1px)' : 'radial-gradient(gold 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                {isMC ? <Crown size={80} className="text-yellow-400 mb-6 animate-bounce" /> : <Scroll size={80} className="text-yellow-400 mb-6 animate-bounce" />}
                <h1 className={`text-4xl md:text-6xl font-bold mb-4 uppercase tracking-widest ${isMC ? 'text-white font-mono' : 'text-yellow-200 font-sans'}`}>
                    {isMC ? "Victory!" : "Journey Completed!"}
                </h1>
                <p className={`text-xl mb-8 max-w-md px-4 ${isMC ? 'text-green-400 font-mono' : 'text-white font-sans'}`}>
                    {isMC ? "You defeated the Wither Storm! True Hero!" : "You have obtained the True Scriptures! Amazing!"}
                </p>
                {/* 🌟 修复：点击这里直接返回世界大厅 */}
                <button onClick={() => { onBackToHub(); }} className={`px-10 py-4 text-xl font-bold rounded ${isMC ? 'bg-green-500 text-white font-mono border-b-4 border-green-800' : 'bg-orange-500 text-white font-sans shadow-lg hover:bg-orange-600'}`}>
                    Continue Adventure
                </button>
            </div>
        );
    }

    if (view === 'level-select') {
        return <LevelSelectView theme={theme} username={username} progress={progress} episodes={episodes} onBack={onBackToHub} onSelectEpisode={handleLevelSelect} onOpenLeaderboard={onOpenLeaderboard} onOpenUnlock={onOpenUnlock} />;
    }
    
    if (!activeEp) {
        setView('level-select');
        return null;
    }

    if (view === 'menu') {
        return <EpisodeMenu theme={theme} ep={activeEp} onNavigate={setView} onBack={() => setView('level-select')} />;
    }
    if (view === 'story') {
        return <StoryView theme={theme} ep={activeEp} sceneIndex={0} setSceneIndex={()=>{}} onBack={() => setView('menu')} onFinish={() => setView('menu')} />;
    }
    if (view === 'vocab') {
        return <VocabView theme={theme} ep={activeEp} onBack={() => setView('menu')} />;
    }
    if (view === 'quiz') {
        return <QuizView theme={theme} ep={activeEp} onBack={() => setView('menu')} onComplete={handleQuizComplete} />;
    }
    return null;
};

// ==========================================
// 4. 主程序 (APP ROOT)
// ==========================================

export default function JasperAdventureApp() {
  const [view, setView] = useState('login');
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState('west');
  
  const [data, setData] = useState({
      west: { score: 0, unlocked: [1] },
      mc: { score: 0, unlocked: [1] },
      visitors: { west: 1203, mc: 895 } 
  });

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockCode, setUnlockCode] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
      try {
          const saved = localStorage.getItem('jasper_universe_v2');
          if (saved) setData(JSON.parse(saved));
      } catch(e) { console.error(e); }
  }, []);

  useEffect(() => {
      const totalScore = data.west.score + data.mc.score;
      const fakeData = [
          { username: "Monkey King", score: 8888, isMe: false },
          { username: "Steve", score: 5000, isMe: false },
          { username: "Pigsy", score: 200, isMe: false },
          { username: username || "You", score: totalScore, isMe: true }
      ];
      setLeaderboardData(fakeData.sort((a, b) => b.score - a.score));
  }, [data, username]);

  const save = (newData) => {
      setData(newData);
      localStorage.setItem('jasper_universe_v2', JSON.stringify(newData));
  };

  const handleLogin = () => setView('world-select');
  const handleSelectWorld = (selectedTheme) => {
      const newData = { ...data, visitors: { ...data.visitors, [selectedTheme]: data.visitors[selectedTheme] + 1 } };
      save(newData);
      setTheme(selectedTheme);
      setView('game');
  };
  const handleProgressUpdate = (nextId, scoreAdd) => {
      const currentProg = data[theme];
      const newUnlocked = currentProg.unlocked.includes(nextId) ? currentProg.unlocked : [...currentProg.unlocked, nextId];
      const newScore = currentProg.score + scoreAdd;
      save({ ...data, [theme]: { unlocked: newUnlocked, score: newScore } });
  };
  const handleUnlockGlobal = () => {
      if (unlockCode.toLowerCase() === 'jasper') {
          const allWest = WEST_EPISODES.map(e => e.id);
          const allMC = MC_EPISODES.map(e => e.id);
          save({ ...data, west: { ...data.west, unlocked: allWest }, mc: { ...data.mc, unlocked: allMC } });
          setUnlockCode("");
          setShowUnlockModal(false);
          const u = new SpeechSynthesisUtterance("Super Mode Activated!");
          window.speechSynthesis.speak(u);
      } else {
          setUnlockError("Wrong Code");
      }
  };

  return (
    <div className="select-none">
      {view === 'login' && <LoginView username={username} setUsername={setUsername} handleLogin={handleLogin} />}
      {view === 'world-select' && <WorldSelectView username={username} visitorCounts={data.visitors} onSelectWorld={handleSelectWorld} />}
      {view === 'game' && (
          <GameSessionWrapper 
              theme={theme} 
              username={username} 
              progress={data[theme]} 
              episodes={theme === 'west' ? WEST_EPISODES : MC_EPISODES} 
              onBackToHub={() => setView('world-select')} 
              onUpdateProgress={handleProgressUpdate}
              onOpenLeaderboard={() => setView('leaderboard')}
              onOpenUnlock={() => setShowUnlockModal(true)}
          />
      )}
      {view === 'leaderboard' && <LeaderboardView leaderboardData={leaderboardData} onBack={() => setView('game')} />}
      
      {showUnlockModal && <UnlockModal unlockCode={unlockCode} setUnlockCode={setUnlockCode} unlockError={unlockError} handleUnlockCode={handleUnlockGlobal} onClose={() => setShowUnlockModal(false)} theme={theme} />}
    </div>
  );
}
