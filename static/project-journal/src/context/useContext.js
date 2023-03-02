import React, { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const MyContext = createContext();

function MyProvider({ children }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const addData = (newData) => {
    setData(newData);
  };
  const updateData = (newData) => {
    setData((prevData) => {
      return [...prevData, newData];
    });
  };

  const deleteData = (id) => {

      setData((prevData) => {
        return prevData.filter((item) => {
          return item.id !== id;
        });
      });
    navigate("/");
  };
  const changeData = (id, name) => {
    setData(() => {
      return data.map((item) => {
        if (item.id === id) {
          return { ...item, name: name };
        }
        return item;
      });
    });
  };
  return (
    <MyContext.Provider
      value={{ data, updateData, deleteData, changeData, addData }}
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { MyProvider, MyContext };
