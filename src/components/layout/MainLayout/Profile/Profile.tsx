import { IUser } from "@/lib/Interfaces";
import React from "react";

interface ProfileProps {
  userData: IUser;
}

export const Profile: React.FC<ProfileProps> = ({ userData }) => {
  const renderOnboardingSteps = () => {
    // Placeholder for onboarding steps - you would replace these with real data
    const steps = [
      { name: "Office Tour", completed: 100 },
      { name: "Management Introductory", completed: 20 },
      // Add other steps here...
    ];

    return steps.map((step, index) => (
      <div key={index} className="my-2 flex items-center justify-between">
        <label className="text-gray-700">{step.name}</label>
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{ width: `${step.completed}%` }}
          ></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex">
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <h2 className="font-roboto-slab text-xl font-semibold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="font-roboto-slab text-gray-400">iOS Developer</p>
          </div>
          <button className="rounded px-4 py-2 font-bold text-red-500 hover:text-red-600">
            Delete
          </button>
        </div>
        <div className="flex items-center space-x-6 border-b py-6">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src="/path/to/profile-image.jpg"
            alt={`${userData.firstName} ${userData.lastName}`}
          />
          <div className="font-roboto-slab">
            <p className="text-xl text-gray-800">{userData.email}</p>
            <p className="text-lg text-gray-400">{userData.phoneNumber}</p>
            <p className="text-gray-600">{userData.role}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="mb-4 font-roboto-slab font-semibold text-gray-800">
            Onboarding Progress
          </h3>
          {renderOnboardingSteps()}
        </div>
      </div>
    </div>
  );
};
