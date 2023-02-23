import React, { useState } from "react";
import Button from "@atlaskit/button";
import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { v4 as uuid } from "uuid";
import {useNavigate} from 'react-router-dom'
import { useContext} from "react";
import { MyContext } from "../context/useContext";
export default function Home() {
  
  const { data, updateData } = useContext(MyContext);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const navigate = useNavigate()

  return (  
    <>
      <div>Home</div>
      {/* <Button onClick={() => setData([...data, 'new item'])}>Add</Button> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button appearance="primary" onClick={open}>
          Create a Project
        </Button>
        <ModalTransition>
          {isOpen && (
            <Modal onClose={close}>
              <ModalHeader>
                <ModalTitle>Page</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  placeholder="Project Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button appearance="subtle" onClick={close}>
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  onClick={() => {
                    updateData({name, id: uuid()});
                    close();
                  }}
                  autoFocus
                >
                  Submit
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </ModalTransition>
      </div>

    
        {data && data?.map((item) => (
         
          <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "10px",
            border: "none",
            borderRadius: "10px",
            margin: "10px 5px",
            width: "180px",
            fontSize: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        
           
          }}
          onClick={() => navigate(`/project/${item.id}`)}
          
          >
            <div>{item.name}</div>
          </div>
        ))}
      </>
 
  );
  
}
