import { createContext, useContext, useState } from "react";

const dateContext = createContext(null);

export const useDateContext = () => {
  return useContext(dateContext);
};

export const DateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date());
  return (
    <dateContext.Provider value={{ date, setDate }}>
      {children}
    </dateContext.Provider>
  );
};
