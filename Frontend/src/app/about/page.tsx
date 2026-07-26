"use client";

import React from "react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Loheyta",
      image: "/assets/team/Loheyta.jpg",
      initial: "L"
    },
    {
      name: "Ishita",
      image: "/assets/team/Ishita.jpg",
      initial: "I"
    },
    {
      name: "Anannaya",
      image: "/assets/team/Anannaya.jpg",
      initial: "A"
    },
    {
      name: "Prisha",
      image: "/assets/team/Prisha.jpg",
      initial: "P"
    },
    {
      name: "Sakshi",
      image: "/assets/team/Sakshi.jpg",
      initial: "S"
    }
  ];

  return (
    <main className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a passionate group of innovators dedicated to creating sustainable solutions 
            for a greener future. Each team member brings unique expertise to drive environmental change.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-2 text-center overflow-hidden flex flex-col items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Photo Avatar */}
              <div className="relative mb-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-400 via-teal-500 to-green-400 shadow-xl group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      (e.target as HTMLElement).parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-emerald-600', 'text-white', 'text-3xl', 'font-bold');
                      (e.target as HTMLElement).parentElement!.innerText = member.initial;
                    }}
                  />
                </div>
              </div>

              {/* Member Name */}
              <h2 className="text-xl font-bold text-gray-900 mb-3">{member.name}</h2>

              <div className="w-10 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-auto"></div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Together, we're building innovative solutions that make sustainability accessible, 
            measurable, and impactful. Our diverse expertise in technology, design, and environmental 
            science enables us to tackle complex challenges and create meaningful change for our planet.
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}