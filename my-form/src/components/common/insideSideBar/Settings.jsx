import React from "react";

const Settings = () => {
  return (
    <div className="ml-64 min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">
          Settings
        </h1>

        <p className="text-gray-400 mb-8">
          Manage your account settings and preferences.
        </p>

        {/* Account Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl mb-5">
          <h2 className="text-xl font-semibold p-5 border-b border-gray-800">
            Account
          </h2>

          <div className="p-5 space-y-4">

            <button className="w-full flex justify-between items-center text-left p-4 rounded-lg hover:bg-gray-800 transition">
              <div>
                <h3 className="font-medium">Edit Profile</h3>
                <p className="text-sm text-gray-400">
                  Change your profile information
                </p>
              </div>

              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex justify-between items-center text-left p-4 rounded-lg hover:bg-gray-800 transition">
              <div>
                <h3 className="font-medium">Change Password</h3>
                <p className="text-sm text-gray-400">
                  Update your account password
                </p>
              </div>

              <span className="text-gray-400">›</span>
            </button>

          </div>
        </div>

        {/* Privacy */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl mb-5">
          <h2 className="text-xl font-semibold p-5 border-b border-gray-800">
            Privacy
          </h2>

          <div className="p-5 space-y-4">

            <div className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-medium">Private Account</h3>
                <p className="text-sm text-gray-400">
                  Only approved users can see your posts
                </p>
              </div>

              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-medium">Show Online Status</h3>
                <p className="text-sm text-gray-400">
                  Allow others to see when you are online
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl mb-5">
          <h2 className="text-xl font-semibold p-5 border-b border-gray-800">
            Notifications
          </h2>

          <div className="p-5 space-y-4">

            <div className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-400">
                  Receive notifications about your account
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-medium">Message Notifications</h3>
                <p className="text-sm text-gray-400">
                  Get notified when someone sends you a message
                </p>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-900 border border-red-900 rounded-xl">
          <h2 className="text-xl font-semibold text-red-500 p-5 border-b border-red-900">
            Danger Zone
          </h2>

          <div className="p-5">
            <button className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition">
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;

