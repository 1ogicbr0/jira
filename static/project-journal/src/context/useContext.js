import React, { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const MyContext = createContext();

function MyProvider({ children }) {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  const addJournals= (newJournal) => {
    setJournals(newJournal);
  };
  const updateJournals= (newJournal) => {
   
    setJournals((prevJournals) => {
      return [...prevJournals, newJournal];
    });
  };

  const deleteJournal = (id) => {

      setJournals((prevJournals) => {
        return prevJournals.filter((item) => {
          return item.id !== id;
        });
      });
    navigate("/");
  };
  const editJournal = (id, name) => {
    setJournals(() => {
      return journals.map((item) => {
        if (item.id === id) {
          return { ...item, name: name };
        }
        return item;
      });
    });
  };
  return (
    <MyContext.Provider
      value={{ journals, updateJournals, deleteJournal, editJournal, addJournals}}
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { MyProvider, MyContext };
