import { createContext, useContext, useState } from "react";

// Create a context to hold the date state
const dateContext = createContext(null);

// Custom hook to consume the date context in other components
export const useDateContext = () => {
  return useContext(dateContext);
};

// DateProvider component to provide date context to its children
export const DateProvider = ({ children }) => {
  // The date state is initialized to the current date
  const [date, setDate] = useState(new Date());
  return (
    <dateContext.Provider value={{ date, setDate }}>
      {children}
    </dateContext.Provider>
  );
};
