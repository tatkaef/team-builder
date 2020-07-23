import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Member from "./Member";
import MemberForm from "./MemberForm";

import "./App.css";

const teamMembers = [
  {
    id: uuid(), // uuid is a lib to generate random, unique ids
    username: "Vasya",
    email: "vasya@good.yes",
    role: "Student",
  },
];

const emptyMember = {
  ///// TEXT INPUTS /////
  username: "",
  email: "",
  ///// DROPDOWN /////
  role: "",
};

const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data: teamMembers });
};
const fakeAxiosPost = (url, { username, email, role }) => {
  const newMember = { id: uuid(), username, email, role };
  return Promise.resolve({ status: 200, success: true, data: newMember });
};

function App() {
  const [members, setMembers] = useState([]);
  const [formValues, setFormValues] = useState(emptyMember); // начинаем с пустого объекта

  const updateForm = (inputName, inputValue) => {
    const updatedFormValues = { ...formValues, [inputName]: inputValue };
    setFormValues(updatedFormValues);
  };

  const submitForm = () => {
    const newMember = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    };
    if (!newMember.username || !newMember.email || !newMember.role) return;
    fakeAxiosPost("fakeapi.com", newMember).then((res) => {
      const friendFromAPI = res.data;
      setMembers([friendFromAPI, ...members]);
      setFormValues(emptyMember);
    });
  };
  useEffect(() => {
    fakeAxiosGet("fakeapi.com").then((res) => setMembers(res.data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Team members</h1>
      </header>

      <MemberForm values={formValues} update={updateForm} submit={submitForm} />

      {members.map((member) => {
        return <Member key={member.id} details={member} />;
      })}
    </div>
  );
}

export default App;
