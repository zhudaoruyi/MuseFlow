import React from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  Wifi, 
  Database,
  HelpCircle,
  LogOut
} from 'lucide-react';

function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-6">
        <section className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Sun size={20} className="text-gray-600" />
                <span className="text-gray-700">Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-gray-600" />
                <span className="text-gray-700">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Volume2 size={20} className="text-gray-600" />
                <div>
                  <span className="text-gray-700">Sound Volume</span>
                  <p className="text-sm text-gray-500">Adjust system sound level</p>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="80"
                className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Wifi size={20} className="text-gray-600" />
                <div>
                  <span className="text-gray-700">Offline Mode</span>
                  <p className="text-sm text-gray-500">Download music for offline use</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">System</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
              <Database size={20} className="text-gray-600" />
              <span className="text-gray-700">Clear Cache</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors">
              <HelpCircle size={20} className="text-gray-600" />
              <span className="text-gray-700">Help & Support</span>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors text-red-600">
              <LogOut size={20} className="text-red-600" />
              <span>Sign Out</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SettingsPage;