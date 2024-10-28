import React from 'react';
import { Calendar } from 'lucide-react';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

const scheduleData: ScheduleItem[] = [
  {
    time: '19:00',
    title: '空弦十分钟',
    description: '注意节奏、全弓、弓毛、换弓'
  },
  {
    time: '19:10',
    title: '换把五分钟',
    description: '注意按指、音准、换把的时机'
  },
  {
    time: '19:15',
    title: '施拉迪克十分钟',
    description: '注意拍子、节奏、速度'
  },
  {
    time: '19:25',
    title: '音阶和琶音二十分钟',
    description: '注意按指升降调；拍子、一拍两音（10遍）、一拍三音（10遍）'
  },
  {
    time: '19:45',
    title: '练习曲十五分钟',
    description: '注意按指升降调；弓法（连弓、分弓）；节奏、慢练、一拍半、两拍等的拉法'
  },
  {
    time: '20:00',
    title: '结束',
    description: '松弓毛，收琴'
  }
];

function HomePage() {
  return (
    <div className="p-2 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">每日流程</h1>
        <Calendar className="text-blue-600" size={24} />
      </div>

      <div className="space-y-2">
        {scheduleData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-2 border border-gray-100 hover:border-blue-200 transition-colors"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-lg font-semibold text-blue-600">{item.time}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;