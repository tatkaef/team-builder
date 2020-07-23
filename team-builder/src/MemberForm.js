import React from "react";

export default function MemberForm(props) {
  const { values, update, submit } = props;

  const onChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    update(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  return (
    <form className="form container" onSubmit={onSubmit}>
      <div className="form-group submit">
        <h2>Add a Member</h2>
        <button disabled={!values.username || !values.email || !values.role}>
          submit
        </button>
      </div>

      <div className="form-group inputs">
        <h4>General information</h4>

        <label htmlFor="usernameInput">
          Username:&nbsp;
          <input
            id="usernameInput"
            name="username"
            type="text"
            placeholder="Enter username"
            maxLength="20"
            value={values.username}
            onChange={onChange}
          />
        </label>

        <label htmlFor="emailInput">
          Email:&nbsp;
          <input
            id="emailInput"
            name="email"
            type="email"
            placeholder="Enter email"
            maxLength="20"
            value={values.email}
            onChange={onChange}
          />
        </label>

        <label>
          Role:&nbsp;
          <select name="role" value={values.role} onChange={onChange}>
            <option value="">Select a role</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="tl">Team Lead</option>
            {/* <option disabled value=" ">Not availble</option> */}
          </select>
        </label>
      </div>
    </form>
  );
}
