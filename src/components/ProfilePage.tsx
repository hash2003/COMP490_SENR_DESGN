import React from "react";

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Profile</h1>
      <p className="text-center text-gray-600 mb-6">
        Welcome to your profile. Here you can manage your account settings.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">User Information</h2>
        <p className="text-gray-600">Name: <strong>John Doe</strong></p>
        <p className="text-gray-600">Email: <strong>johndoe@csun.edu</strong></p>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
