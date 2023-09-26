"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
} from "@material-tailwind/react";
import General from "@/components/profileComponents/General";
import UserBookings from "@/components/profileComponents/UserBookings";
import Cars from "@/components/profileComponents/Cars";
import Users from "@/components/profileComponents/Users";
import AllBookings from "@/components/profileComponents/AllBookings";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);

  const [activeTab, setActiveTab] = React.useState("general");

  const tabComponents = {
    general: <General />,
    bookings: <UserBookings />,
    cars: <Cars />,
    users: <Users />,
    allbookings: <AllBookings />,
    // Add more tab values
  };

  const regularUserData = [
    {
      label: "General",
      value: "general",
     
    },
    {
      label: "Your Bookings",
      value: "bookings",
      
    },
  ];

  const adminUserData = [
    {
      label: "General",
      value: "general",
      
    },

    {
      label: "Cars",
      value: "cars",
      
    },

    {
      label: "Users",
      value: "users",
      
    },

    {
      label: "All Bookings",
      value: "allbookings",
      
    },
  ];
  
  const isAdmin = currentUser && currentUser.isAdmin;

  
  return (
    currentUser && (
      <div className="p-10 mt-4">
        {isAdmin ? (
          // Admin Tabs
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {adminUserData.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? "text-gray-900" : ""}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabComponents[activeTab]}
              {/* Render the selected component based on the activeTab */}
            </TabsBody>
          </Tabs>
        ) : (
          // Regular User Tabs
          <Tabs value={activeTab}>
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              {regularUserData.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={activeTab === value ? "text-gray-900" : ""}
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {tabComponents[activeTab]}
              {/* Render the selected component based on the activeTab */}
            </TabsBody>
          </Tabs>
        )}
      </div>
    )
  );
}

export default Profile;
