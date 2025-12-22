import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Navigation,
  Sun,
  Coffee,
  Camera,
  ArrowRight,
  Star,
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 資料結構（依你的行程）
// -----------------------------------------------------------------------------
const INITIAL_ITINERARY = [
  {
    day: 1,
    date: '2024.05.20', // 可自行修改
    title: '猴硐九份一日遊',
    theme: '山城健行與貓村時光',
    events: [
      {
        time: '09:20',
        location: 'CAAM承德172 (公司出發)',
        description: '集合準時出發，開啟今日旅程。',
        type: 'transport',
      },
      {
        time: '10:20',
        location: '猴硐遊客中心',
        description: '抵達猴硐，整裝準備開始探索。',
        type: 'activity',
      },
      {
        time: '10:40',
        location: '猴硐車站周邊',
        description: '步行抵達。走訪猴硐貓村、煤礦博物園區與休閒園區，感受獨特氛圍。',
        type: 'sightseeing',
        image:
          'https://images.unsplash.com/photo-1588662266571-5492a5c2171b?auto=format&fit=crop&q=80&w=600',
        highlight: '貓奴天堂與礦業歷史',
      },
      {
        time: '12:00',
        location: '離開猴硐',
        description: '開車前往下一站九份。',
        type: 'transport',
      },
      {
        time: '12:15',
        location: '九份星塵景觀餐廳',
        description: '抵達餐廳，享用午餐同時欣賞山海美景。',
        type: 'food',
        image:
          'https://images.unsplash.com/photo-1587566426369-889969e95005?auto=format&fit=crop&q=80&w=600',
        highlight: '景觀午餐時光',
      },
      {
        time: '13:30',
        location: '九份老街 (豎崎路入口)',
        description: '離開餐廳，從派出所旁的豎崎路出發，漫步九份老街。',
        type: 'sightseeing',
        image:
          'https://images.unsplash.com/photo-1508105712359-71738510246f?auto=format&fit=crop&q=80&w=600',
      },
      {
        time: '15:30',
        location: '台陽停車場 (集合點)',
        description: '抵達集合地點，準備開車返程。',
        type: 'transport',
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// 子元件：時間軸卡片
// -----------------------------------------------------------------------------
const TimelineItem = ({ event, isLast }) => {
  // 依地點名稱生成 Google Maps 搜尋/導航連結
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location
  )}`;

  const getTypeColor = (type) => {
    switch (type) {
      case 'food':
        return 'bg-orange-100 text-orange-600';
      case 'transport':
        return 'bg-blue-100 text-blue-600';
      case 'shopping':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-emerald-100 text-emerald-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'food':
        return <Coffee size={14} />;
      case 'transport':
        return <ArrowRight size={14} />;
      case 'shopping':
        return <Star size={14} />;
      default:
        return <Camera size={14} />; // activity / sightseeing
    }
  };

  const typeLabel =
    event.type === 'sightseeing'
      ? '景點'
      : event.type === 'food'
      ? '美食'
      : event.type === 'transport'
      ? '交通'
      : '活動';

  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {!isLast && (
        <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gray-100 group-hover:bg-indigo-100 transition-colors duration-300" />
      )}

      <div
        className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${getTypeColor(
          event.type
        )}`}
      >
        <div className="w-2 h-2 rounded-full bg-current" />
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-full">
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getTypeColor(
              event.type
            )}`}
          >
            {getTypeIcon(event.type)}
            <span className="capitalize">{typeLabel}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-1">
          {event.location}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          {event.description}
        </p>

        {event.highlight && (
          <div className="mb-3 px-3 py-2 bg-yellow-50 text-yellow-700 text-xs rounded-lg flex items-start gap-2">
            <Star size={12} className="mt-0.5 shrink-0" />
            <span>{event.highlight}</span>
          </div>
        )}

        {event.image && (
          <div className="mb-3 rounded-xl overflow-hidden shadow-sm aspect-video relative group/img">
            <img
              src={event.image}
              alt={event.location}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        )}

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 active:scale-95 transition-all"
        >
          <Navigation size={16} />
          <span>Google Map 導航</span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  const [activeDay, setActiveDay] = useState(1);
  const [itinerary] = useState(INITIAL_ITINERARY);

  const currentDay = itinerary.find((d) => d.day === activeDay);

  return (
    <div className="min-h-screen bg-[#F8F9FC] font-sans text-slate-900 pb-10">
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        <header className="relative bg-gradient-to-br from-indigo-600 to-violet-600 text-white pt-12 pb-20 px-6 rounded-b-[2.5rem] shadow-lg z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-10 -mb-5 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                {itinerary[0]?.date}
              </span>
              <button
                type="button"
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label="Map"
              >
                <MapPin size={18} />
              </button>
            </div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">
              員工一日
              <br />
              健行之旅 🥾
            </h1>
            <p className="text-indigo-100 text-sm opacity-90 flex items-center gap-1">
              共 {itinerary.length} 天行程
              <span className="w-1 h-1 rounded-full bg-white mx-1" />
              探索猴硐與九份山城
            </p>
          </div>
        </header>

        <div className="px-4 -mt-12 relative z-20 mb-2">
          <div className="flex gap-3 overflow-x-auto pb-4 pt-2 snap-x hide-scrollbar px-1">
            {itinerary.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`snap-center shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-sm border ${
                  activeDay === day.day
                    ? 'bg-white text-indigo-600 scale-105 shadow-lg border-indigo-100 ring-2 ring-indigo-50'
                    : 'bg-white/90 text-slate-400 border-transparent hover:bg-white'
                }`}
              >
                <span className="text-xs font-medium uppercase tracking-wider opacity-60">
                  Day
                </span>
                <span
                  className={`text-2xl font-bold font-serif ${
                    activeDay === day.day ? 'scale-110' : ''
                  }`}
                >
                  0{day.day}
                </span>
                <div
                  className={`w-1 h-1 rounded-full mt-1 ${
                    activeDay === day.day ? 'bg-indigo-600' : 'bg-transparent'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <main className="px-6 py-2">
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Day {activeDay}
                <span className="text-slate-300">/</span>
                {currentDay?.title}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{currentDay?.theme}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
              {activeDay === 1 ? (
                <Sun size={20} />
              ) : activeDay === 2 ? (
                <Camera size={20} />
              ) : (
                <Coffee size={20} />
              )}
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {currentDay?.events.map((event, index) => (
              <TimelineItem
                key={`${event.time}-${index}`}
                event={event}
                isLast={index === currentDay.events.length - 1}
              />
            ))}

            <div className="pl-8 pt-4 pb-12 opacity-50">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                <span>今日行程結束</span>
              </div>
            </div>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-30" />
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
