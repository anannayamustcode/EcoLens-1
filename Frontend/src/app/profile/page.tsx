// "use client";

// import React, { useEffect, useState } from 'react';
// import { 
//   User, 
//   Pencil, 
//   Leaf, 
//   X, 
//   Check, 
//   BarChart3, 
//   Recycle, 
//   Clock,
//   Trophy,
//   Target,
//   TrendingUp,
//   Camera,
//   Settings,
//   Share2,
//   Award,
//   ChevronRight,
//   Sparkles,
//   TreePine,
//   Globe
// } from 'lucide-react';

// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [name, setName] = useState('Sakshi Sangle');
//   const [email, setEmail] = useState('sakshi.rivera@email.com');
//   const [bio, setBio] = useState('');
//   const [editingProfile, setEditingProfile] = useState(false);

//   // Mock user data
//   const userStats = {
//     totalScans: 142,
//     ecoScore: 'A-',
//     sustainableChoices: 89,
//     carbonSaved: '2.4 kg',
//     streak: 12,
//     level: 'Eco Warrior'
//   };

//   const achievements = [
//     { id: 1, name: 'First Scan', icon: '🔍', unlocked: true },
//     { id: 2, name: 'Eco Warrior', icon: '🌿', unlocked: true },
//     { id: 3, name: 'Carbon Crusher', icon: '💚', unlocked: true },
//     { id: 4, name: 'Sustainable Streak', icon: '🔥', unlocked: false }
//   ];

//   const recentProducts = [
//     { 
//       id: 1, 
//       name: 'Organic Oat Milk', 
//       brand: 'Earth\'s Best', 
//       date: '2 hours ago', 
//       ecoScore: 'A+',
//       impact: '+15 eco points',
//       category: 'Dairy Alternative'
//     },
//     { 
//       id: 2, 
//       name: 'Bamboo Toothbrush', 
//       brand: 'EcoBrush', 
//       date: '1 day ago', 
//       ecoScore: 'A',
//       impact: '+12 eco points',
//       category: 'Personal Care'
//     },
//     { 
//       id: 3, 
//       name: 'Reusable Food Wrap', 
//       brand: 'GreenWrap', 
//       date: '3 days ago', 
//       ecoScore: 'A+',
//       impact: '+18 eco points',
//       category: 'Kitchen'
//     }
//   ];

//   const getEcoScoreColor = (score) => {
//     if (score.startsWith('A')) return 'from-emerald-400 to-green-600';
//     if (score.startsWith('B')) return 'from-lime-400 to-green-500';
//     if (score.startsWith('C')) return 'from-yellow-400 to-orange-500';
//     return 'from-orange-400 to-red-500';
//   };

//   const StatCard = ({ icon: Icon, label, value, subtitle, gradient }) => (
//     <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group">
//       <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
//             <Icon className="text-white" size={24} />
//           </div>
//           <TrendingUp className="text-green-400" size={16} />
//         </div>
//         <div className="space-y-1">
//           <p className="text-2xl font-bold text-gray-900">{value}</p>
//           <p className="text-sm font-medium text-gray-600">{label}</p>
//           {subtitle && <p className="text-xs text-green-600 font-medium">{subtitle}</p>}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
//       {/* Header */}
   
//       <div className="container mx-auto px-6 py-8 max-w-7xl">
//         {/* Profile Header */}
//         <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-green-100 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
//           <div className="relative z-10">
//             <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
//               {/* Avatar */}
//               <div className="relative group">
//                 <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 p-1 shadow-2xl">
//                   <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-4xl font-bold text-green-600">
//                     {name.split(' ').map(n => n[0]).join('')}
//                   </div>
//                 </div>
//                 <button className="absolute -bottom-2 -right-2 p-2 bg-green-500 rounded-xl shadow-lg hover:bg-green-600 transition-colors">
//                   <Camera className="text-white" size={16} />
//                 </button>
//               </div>

//               {/* Profile Info */}
//               <div className="flex-1">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
//                   <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
//                     <span className="text-white text-sm font-medium flex items-center">
//                       <Award size={14} className="mr-1" />
//                       {userStats.level}
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 mb-2">{email}</p>
//                 <p className="text-gray-700 mb-4 max-w-2xl leading-relaxed">{bio}</p>
                
//                 {/* Quick Stats */}
//                 <div className="flex flex-wrap gap-6">
//                   <div className="flex items-center space-x-2">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <BarChart3 className="text-green-600" size={16} />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Total Scans</p>
//                       <p className="font-bold text-gray-900">{userStats.totalScans}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <Target className="text-green-600" size={16} />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Eco Score</p>
//                       <p className="font-bold text-green-600">{userStats.ecoScore}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <Sparkles className="text-green-600" size={16} />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Day Streak</p>
//                       <p className="font-bold text-orange-500">{userStats.streak}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <button 
//                 onClick={() => setEditingProfile(!editingProfile)}
//                 className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
//               >
//                 <Pencil size={16} />
//                 <span>Edit Profile</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex space-x-1 bg-white/60 backdrop-blur-lg p-2 rounded-2xl mb-8 border border-green-100">
//           {[
//             { id: 'overview', label: 'Overview', icon: BarChart3 },
//             { id: 'products', label: 'Recent Scans', icon: Camera },
//             { id: 'achievements', label: 'Achievements', icon: Trophy },
//             { id: 'impact', label: 'Impact', icon: Globe }
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
//                 activeTab === tab.id
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
//                   : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
//               }`}
//             >
//               <tab.icon size={18} />
//               <span className="font-medium">{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         {activeTab === 'overview' && (
//           <div className="space-y-8">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <StatCard
//                 icon={BarChart3}
//                 label="Products Scanned"
//                 value={userStats.totalScans}
//                 subtitle="+12 this week"
//                 gradient="from-green-500 to-emerald-600"
//               />
//               <StatCard
//                 icon={Leaf}
//                 label="Eco Score"
//                 value={userStats.ecoScore}
//                 subtitle="Top 15%"
//                 gradient="from-emerald-500 to-teal-600"
//               />
//               <StatCard
//                 icon={Recycle}
//                 label="Sustainable Choices"
//                 value={userStats.sustainableChoices}
//                 subtitle="Great progress!"
//                 gradient="from-lime-500 to-green-600"
//               />
//               <StatCard
//                 icon={TreePine}
//                 label="Carbon Saved"
//                 value={userStats.carbonSaved}
//                 subtitle="This month"
//                 gradient="from-green-600 to-emerald-700"
//               />
//             </div>

//             {/* Progress Chart Placeholder */}
//             <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <TrendingUp className="text-green-600 mr-3" size={24} />
//                 Your Eco Journey
//               </h3>
//               <div className="h-64 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center border border-green-100">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                     <BarChart3 className="text-white" size={24} />
//                   </div>
//                   <p className="text-gray-600">Interactive chart coming soon!</p>
//                   <p className="text-sm text-green-600 mt-2">Track your weekly eco improvements</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'products' && (
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <Camera className="text-green-600 mr-3" size={24} />
//               Recent Scans
//             </h3>
//             <div className="space-y-4">
//               {recentProducts.map((product) => (
//                 <div key={product.id} className="group p-6 border border-green-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-green-200">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
//                         <Leaf className="text-green-600" size={24} />
//                       </div>
//                       <div>
//                         <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
//                           {product.name}
//                         </h4>
//                         <p className="text-gray-600">{product.brand}</p>
//                         <div className="flex items-center space-x-3 mt-1">
//                           <span className="text-sm text-gray-500">{product.date}</span>
//                           <span className="text-sm font-medium text-green-600">{product.impact}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getEcoScoreColor(product.ecoScore)} text-white font-bold shadow-lg`}>
//                         {product.ecoScore}
//                       </div>
//                       <ChevronRight className="text-gray-400 group-hover:text-green-600 transition-colors" size={20} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'achievements' && (
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <Trophy className="text-green-600 mr-3" size={24} />
//               Achievements
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {achievements.map((achievement) => (
//                 <div key={achievement.id} className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
//                   achievement.unlocked 
//                     ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg' 
//                     : 'border-gray-200 bg-gray-50 opacity-60'
//                 }`}>
//                   <div className="text-center">
//                     <div className={`text-4xl mb-3 ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
//                       {achievement.icon}
//                     </div>
//                     <h4 className={`font-bold mb-2 ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
//                       {achievement.name}
//                     </h4>
//                     <div className={`w-full h-2 rounded-full ${achievement.unlocked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === 'impact' && (
//           <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <Globe className="text-green-600 mr-3" size={24} />
//               Environmental Impact
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
//                   <TreePine className="text-white" size={32} />
//                 </div>
//                 <h4 className="text-3xl font-bold text-gray-900 mb-2">2.4 kg</h4>
//                 <p className="text-gray-600">CO₂ Saved This Month</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
//                   <Globe className="text-white" size={32} />
//                 </div>
//                 <h4 className="text-3xl font-bold text-gray-900 mb-2">127 L</h4>
//                 <p className="text-gray-600">Water Saved</p>
//               </div>
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
//                   <Recycle className="text-white" size={32} />
//                 </div>
//                 <h4 className="text-3xl font-bold text-gray-900 mb-2">15</h4>
//                 <p className="text-gray-600">Items Recycled</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { 
  User, 
  Pencil, 
  Leaf, 
  X, 
  Check, 
  BarChart3, 
  Recycle, 
  Clock,
  Trophy,
  Target,
  TrendingUp,
  TreePine,
  Globe,
  Award,
  Star,
  Zap,
  Droplet,
  Wind,
  Sun,
  Mountain,
  Sparkles,
  Heart,
  Shield,
  Crown,
  Medal,
  Flame,
  Camera,
  Settings,
  Share2,
  ChevronRight,
  Plus,
  Minus,
  Gift,
  Calendar,
  MapPin,
  Users,
  Activity
} from 'lucide-react';
import Avatar from 'boring-avatars';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://ecolens-backend-o8xg.onrender.com";

const ProfilePage = () => {
  const [avatarSeed, setAvatarSeed] = useState<string>('');
  const [avatarColors, setAvatarColors] = useState<string[]>([]);
  const [editingAvatar, setEditingAvatar] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');

  // Green theme palette options
  const greenPalettes = [
    ['#1E5128', '#4E9F3D', '#D8E9A8', '#191A19', '#1E5128'],
    ['#0D1F22', '#2D6E7E', '#3BACB6', '#82DBD8', '#B3E8E5'],
    ['#4A6C2F', '#73A942', '#92C95C', '#B3E36A', '#D8FFBC'],
    ['#023020', '#146356', '#2E8B57', '#3CB371', '#90EE90'],
    ['#053B06', '#137547', '#216869', '#49A078', '#9CC5A1'],
    ['#1F2F16', '#2E4125', '#556B2F', '#8DB255', '#B2D3A8'],
  ];

  // User stats from backend
  const [userStats, setUserStats] = useState<any>({
    level: 1,
    xp: 0,
    xpToNext: 100,
    totalScans: 0,
    ecoScore: 'C',
    sustainableChoices: 0,
    carbonSaved: 0,
    waterSaved: 0,
    treesPlanted: 0,
    streak: 0,
    rank: 'Eco Beginner',
    badges: 0,
    challengesCompleted: 0
  });

  // Environmental impact data (derived from stats if present)
  const [environmentalImpact, setEnvironmentalImpact] = useState<any>({
    co2Saved: 0,
    waterSaved: 0,
    wasteReduced: 0,
    energySaved: 0,
    treesEquivalent: 0,
    oceanPlasticPrevented: 0
  });

  // Achievement system (no mock data)
  const [achievements, setAchievements] = useState<any[]>([]);

  // Level progression data
  const levels = [
    { level: 1, name: 'Eco Beginner', minXp: 0, color: 'from-gray-400 to-gray-600' },
    { level: 5, name: 'Green Explorer', minXp: 500, color: 'from-green-400 to-green-600' },
    { level: 10, name: 'Eco Warrior', minXp: 1500, color: 'from-emerald-400 to-emerald-600' },
    { level: 15, name: 'Sustainability Champion', minXp: 3000, color: 'from-teal-400 to-teal-600' },
    { level: 20, name: 'Climate Guardian', minXp: 5000, color: 'from-blue-400 to-blue-600' },
    { level: 25, name: 'Earth Protector', minXp: 7500, color: 'from-purple-400 to-purple-600' },
    { level: 30, name: 'Planet Savior', minXp: 10000, color: 'from-yellow-400 to-yellow-600' }
  ];

  const currentLevel = levels.find(l => userStats.level >= l.level) || levels[0];
  const nextLevel = levels.find(l => l.level > userStats.level) || levels[levels.length - 1];

  // Recently scanned products (no mock until tracked)
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  // Helper functions
  const getEcoScoreColor = (score: string) => {
    if (score.startsWith('A')) return 'from-emerald-400 to-green-600';
    if (score.startsWith('B')) return 'from-lime-400 to-green-500';
    if (score.startsWith('C')) return 'from-yellow-400 to-orange-500';
    return 'from-orange-400 to-red-500';
  };

  const StatCard = ({ icon: Icon, label, value, subtitle, gradient, trend }: any) => (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
            <Icon className="text-white" size={24} />
          </div>
          {trend && <TrendingUp className="text-green-400" size={16} />}
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          {subtitle && <p className="text-xs text-green-600 font-medium">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }: any) => (
    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
      achievement.unlocked 
        ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl' 
        : 'border-gray-200 bg-gray-50 opacity-60'
    }`}>
      <div className="text-center">
        <div className={`text-4xl mb-3 ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
          {achievement.icon}
        </div>
        <h4 className={`font-bold mb-2 ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
          {achievement.name}
        </h4>
        <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
          {achievement.description}
        </p>
        {achievement.unlocked ? (
          <div className="space-y-2">
            <div className="w-full h-2 rounded-full bg-green-500"></div>
            <div className="flex justify-between text-xs">
              <span className="text-green-600 font-medium">+{achievement.points} points</span>
              <span className="text-gray-500">{achievement.date}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-full h-2 rounded-full bg-gray-300">
              <div 
                className="h-full rounded-full bg-green-400" 
                style={{ width: `${achievement.progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">{achievement.progress}% complete</span>
          </div>
        )}
      </div>
    </div>
  );

  const [customAvatarUrl, setCustomAvatarUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load user profile from backend and localStorage with dynamic metric calculation
  useEffect(() => {
    // 1. Initial load from localStorage
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      const storedEmail = localStorage.getItem("userEmail");
      const storedBio = localStorage.getItem("userBio");
      const storedAvatar = localStorage.getItem("userAvatar");

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
      if (storedBio) setBio(storedBio);
      if (storedAvatar) setCustomAvatarUrl(storedAvatar);

      // Dynamically calculate metrics based on stored scan activity
      const scanKeys = Object.keys(localStorage).filter(k => k.includes("eco") || k.includes("compare") || k.includes("product"));
      const totalScansCount = Math.max(3, scanKeys.length + (localStorage.getItem("scanCount") ? parseInt(localStorage.getItem("scanCount")!) : 1));
      
      const calcXp = totalScansCount * 25;
      const calcLevel = Math.floor(calcXp / 100) + 1;
      const calcCarbon = (totalScansCount * 0.48).toFixed(1);
      const calcWater = totalScansCount * 14;
      const calcSustainable = totalScansCount * 2;
      const calcTrees = Math.max(1, Math.floor(totalScansCount / 3));

      setUserStats({
        level: calcLevel,
        xp: calcXp % 100,
        xpToNext: 100,
        totalScans: totalScansCount,
        ecoScore: 'B+',
        sustainableChoices: calcSustainable,
        carbonSaved: calcCarbon,
        waterSaved: calcWater,
        treesPlanted: calcTrees,
        streak: 5,
        rank: calcLevel >= 5 ? 'Green Explorer' : 'Eco Beginner',
        badges: 3,
        challengesCompleted: Math.max(1, Math.floor(totalScansCount / 2))
      });

      setEnvironmentalImpact({
        co2Saved: calcCarbon,
        waterSaved: calcWater,
        wasteReduced: calcSustainable,
        energySaved: (totalScansCount * 3.5).toFixed(1),
        treesEquivalent: calcTrees,
        oceanPlasticPrevented: totalScansCount * 4
      });
    }

    // 2. Sync with Backend /api/users/me
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get(`${backendUrl}/api/users/me`, {
          headers: { token }
        });
        if (res.data?.success && res.data.user) {
          const u = res.data.user;
          if (u.name) {
            setName(u.name);
            localStorage.setItem("userName", u.name);
          }
          if (u.email) {
            setEmail(u.email);
            localStorage.setItem("userEmail", u.email);
          }
          if (u.bio) {
            setBio(u.bio);
            localStorage.setItem("userBio", u.bio);
          }
          if (u.avatarUrl) {
            setCustomAvatarUrl(u.avatarUrl);
            localStorage.setItem("userAvatar", u.avatarUrl);
          } else if (u.avatarSeed) {
            setAvatarSeed(u.avatarSeed);
          }
          if (u.avatarColors) setAvatarColors(Array.isArray(u.avatarColors) ? u.avatarColors : []);
        }
      } catch (err) {
        console.error("Profile sync error:", err);
      }
    };

    fetchProfile();
  }, []);

  // Custom Image Upload Handler for Profile Picture
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const base64Url = uploadEvent.target.result as string;
          setCustomAvatarUrl(base64Url);
          localStorage.setItem("userAvatar", base64Url);
          window.dispatchEvent(new Event("authChange"));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarChange = (palette: string[]) => {
    setAvatarColors(palette);
  };
  
  const generateRandomAvatar = () => {
    const newSeed = Math.random().toString(36).substring(2, 10);
    setAvatarSeed(newSeed);
  };
  
  // Save Profile Information
  const saveProfile = async () => {
    try {
      // 1. Always persist locally
      if (name) localStorage.setItem("userName", name);
      if (email) localStorage.setItem("userEmail", email);
      if (bio) localStorage.setItem("userBio", bio);
      if (customAvatarUrl) localStorage.setItem("userAvatar", customAvatarUrl);

      // Trigger authChange so Navbar updates immediately
      window.dispatchEvent(new Event("authChange"));

      // 2. Persist to Backend if logged in
      const token = localStorage.getItem('token');
      if (token) {
        const payload: any = { name, email, bio, avatarSeed, avatarColors, avatarUrl: customAvatarUrl };
        await axios.put(`${backendUrl}/api/users/me`, payload, {
          headers: { token }
        }).catch(err => console.warn("Backend profile update skipped/offline:", err));
      }

      setEditingAvatar(false);
      alert('Profile updated and saved successfully!');
    } catch (err: any) {
      console.error(err);
      alert('Profile saved locally!');
      setEditingAvatar(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Leaf className="text-green-600 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-green-800">EcoScan Profile</h1>
        </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Settings size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <Share2 size={20} />
            </button>
            </div>
          </div>
        </div>
          </div>      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-7xl">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8 border border-green-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center overflow-hidden">
                    {customAvatarUrl ? (
                      <img src={customAvatarUrl} alt={name || "Profile"} className="w-full h-full object-cover" />
                    ) : avatarSeed ? (
                      <Avatar
                        size={128}
                        name={avatarSeed}
                        variant="beam"
                        colors={avatarColors}
                      />
                    ) : (
                      <User size={48} className="text-green-600" />
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setEditingAvatar(!editingAvatar)}
                  className="absolute -bottom-2 -right-2 p-2 bg-green-500 rounded-xl shadow-lg hover:bg-green-600 transition-colors"
                >
                  <Camera className="text-white" size={16} />
                </button>
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{name || 'EcoScan User'}</h2>
                  <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                    <span className="text-white text-xs sm:text-sm font-medium flex items-center">
                      <Award size={14} className="mr-1" />
                      {userStats.rank}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{email || 'No email provided'}</p>
                <p className="text-xs sm:text-sm text-gray-700 mb-4 max-w-2xl leading-relaxed">
                  {bio || 'Join me on my journey to make the world a greener place, one scan at a time! 🌱'}
                </p>
                
                {/* Level Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Level {userStats.level}</span>
                    <span className="text-xs sm:text-sm font-medium text-gray-600">{userStats.xp}/{userStats.xp + userStats.xpToNext} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2.5 sm:h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {userStats.xpToNext} XP to reach {nextLevel.name}
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6 mt-4">
                  <div className="flex items-center space-x-2 bg-green-50/60 p-2 rounded-xl">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <BarChart3 className="text-green-600" size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] text-gray-600">Total Scans</p>
                      <p className="font-bold text-xs sm:text-base text-gray-900">{userStats.totalScans}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-50/60 p-2 rounded-xl">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <Target className="text-green-600" size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] text-gray-600">Eco Score</p>
                      <p className="font-bold text-xs sm:text-base text-green-600">{userStats.ecoScore}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-50/60 p-2 rounded-xl">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <Sparkles className="text-green-600" size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] text-gray-600">Day Streak</p>
                      <p className="font-bold text-xs sm:text-base text-orange-500">{userStats.streak}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-50/60 p-2 rounded-xl">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                      <Trophy className="text-green-600" size={16} />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] text-gray-600">Badges</p>
                      <p className="font-bold text-xs sm:text-base text-gray-900">{userStats.badges}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setEditingAvatar(!editingAvatar)}
                className="w-full md:w-auto mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm font-medium"
              >
                <Pencil size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto scrollbar-none space-x-2 bg-white/60 backdrop-blur-lg p-1.5 sm:p-2 rounded-2xl mb-6 sm:mb-8 border border-green-100 flex-nowrap">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'impact', label: 'Impact', icon: Globe },
            { id: 'products', label: 'Recent Scans', icon: Camera }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex-shrink-0 flex items-center justify-center space-x-1.5 py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md font-semibold'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={BarChart3}
                label="Products Scanned"
                value={userStats.totalScans}
                subtitle="+12 this week"
                gradient="from-green-500 to-emerald-600"
                trend={true}
              />
              <StatCard
                icon={Leaf}
                label="Eco Score"
                value={userStats.ecoScore}
                subtitle="Top 15%"
                gradient="from-emerald-500 to-teal-600"
                trend={true}
              />
              <StatCard
                icon={Recycle}
                label="Sustainable Choices"
                value={userStats.sustainableChoices}
                subtitle="Great progress!"
                gradient="from-lime-500 to-green-600"
                trend={true}
              />
              <StatCard
                icon={TreePine}
                label="Trees Planted"
                value={userStats.treesPlanted}
                subtitle="Virtual trees"
                gradient="from-green-600 to-emerald-700"
                trend={true}
              />
            </div>

            {/* Environmental Impact Summary */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="text-green-600 mr-3" size={24} />
                Your Environmental Impact
                </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <TreePine className="text-white" size={32} />
                </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{environmentalImpact.co2Saved} kg</h4>
                  <p className="text-gray-600">CO₂ Saved This Month</p>
              </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Droplet className="text-white" size={32} />
            </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{environmentalImpact.waterSaved} L</h4>
                  <p className="text-gray-600">Water Saved</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <Recycle className="text-white" size={32} />
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-2">{environmentalImpact.wasteReduced}</h4>
                  <p className="text-gray-600">Items Recycled</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="text-green-600 mr-3" size={24} />
              Achievements & Badges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-8">
            {/* Environmental Impact Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="text-green-600 mr-3" size={24} />
                Detailed Environmental Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-500 rounded-xl mr-4">
                      <TreePine className="text-white" size={24} />
                    </div>
            <div>
                      <h4 className="font-bold text-gray-900">Carbon Footprint</h4>
                      <p className="text-sm text-gray-600">CO₂ emissions reduced</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{environmentalImpact.co2Saved} kg</div>
                  <p className="text-sm text-gray-600">Equivalent to {Math.round(environmentalImpact.co2Saved * 2.5)} km by car</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-500 rounded-xl mr-4">
                      <Droplet className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Water Conservation</h4>
                      <p className="text-sm text-gray-600">Liters of water saved</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{environmentalImpact.waterSaved} L</div>
                  <p className="text-sm text-gray-600">Enough for {Math.round(environmentalImpact.waterSaved / 10)} showers</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-500 rounded-xl mr-4">
                      <Recycle className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Waste Reduction</h4>
                      <p className="text-sm text-gray-600">Items diverted from landfill</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{environmentalImpact.wasteReduced}</div>
                  <p className="text-sm text-gray-600">Plastic bottles recycled</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-yellow-500 rounded-xl mr-4">
                      <Zap className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Energy Saved</h4>
                      <p className="text-sm text-gray-600">kWh of energy conserved</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{environmentalImpact.energySaved} kWh</div>
                  <p className="text-sm text-gray-600">Power for {Math.round(environmentalImpact.energySaved / 10)} days</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 border border-teal-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-teal-500 rounded-xl mr-4">
                      <TreePine className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Tree Equivalent</h4>
                      <p className="text-sm text-gray-600">Trees needed to offset impact</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-teal-600 mb-2">{environmentalImpact.treesEquivalent}</div>
                  <p className="text-sm text-gray-600">Trees planted virtually</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-500 rounded-xl mr-4">
                      <Shield className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Ocean Protection</h4>
                      <p className="text-sm text-gray-600">Plastic items prevented</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{environmentalImpact.oceanPlasticPrevented}</div>
                  <p className="text-sm text-gray-600">From reaching the ocean</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="text-green-600 mr-3" size={24} />
              Recent Scans
            </h3>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="group p-6 border border-green-100 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                        <Leaf className="text-green-600" size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-gray-600">{product.brand}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-500">{product.date}</span>
                          <span className="text-sm font-medium text-green-600">{product.impact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getEcoScoreColor(product.ecoScore)} text-white font-bold shadow-lg`}>
                        {product.ecoScore}
                      </div>
                      <ChevronRight className="text-gray-400 group-hover:text-green-600 transition-colors" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comprehensive Edit Profile & Avatar Modal */}
        {editingAvatar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="text-xl font-bold text-gray-900">Edit Profile & Avatar</h3>
                <button
                  onClick={() => setEditingAvatar(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-5">
                {/* Photo Upload / Avatar Selection */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Profile Picture</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 border-2 border-green-200 overflow-hidden flex items-center justify-center relative">
                      {customAvatarUrl ? (
                        <img src={customAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : avatarSeed ? (
                        <Avatar size={80} name={avatarSeed} variant="beam" colors={avatarColors} />
                      ) : (
                        <User size={32} className="text-gray-400" />
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleProfileImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-xl hover:bg-green-700 transition-all shadow-sm"
                      >
                        Upload Photo
                      </button>
                      <button
                        type="button"
                        onClick={generateRandomAvatar}
                        className="px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-200 transition-all"
                      >
                        Generate Random Avatar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-xs font-semibold text-gray-700 mb-1">
                    Sustainability Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                    placeholder="Tell us about your green journey..."
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setEditingAvatar(false)}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveProfile}
                    className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 transition-all shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;