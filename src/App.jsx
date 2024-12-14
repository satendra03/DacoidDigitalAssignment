import React, { useEffect } from "react";
import CalenderContainer from "./components/customs/CalenderContainer";
import { Events } from "./components/customs/Events";

function App() {
  useEffect(() => {
    console.clear();
    console.log(
      "%cCreated By Satendra Kumar Parteti",
      "color: yellow; font-size: 30px; font-weight: bold; text-align: center;"
    );
  }, []);

  return (
    <div className="p-4">
      <div className="text-center font-bold md:text-3xl">
        <h1>Event Manager</h1>
        <p className="text-sm font-normal text-black/20">by Satendra</p>
      </div>
      <div className="calender-container rounded-lg md:flex-row">
        <div className="calender flex flex-col items-center justify-center p-5">
          <CalenderContainer />
        </div>
        <div className="list h-full border p-2">
          <Events />
        </div>
      </div>
    </div>
  );
}

export default App;
