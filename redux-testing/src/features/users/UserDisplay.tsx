import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUser, selectUserName, selectUserFetchStatus } from "./userSlice";
import styles from "./user.module.css";

export default function UserDisplay() {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);
  const userFetchStatus = useAppSelector(selectUserFetchStatus);

  const [userId, setUserId] = useState(1);

  return (
    <div>
      <input
        className={styles.textbox}
        aria-label="user id"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      {/* Display the current user name */}
      <div>{userName}</div>
      {/* On button click, dispatch a thunk action to fetch a user */}
      <button
        className={styles.button}
        onClick={() => dispatch(fetchUser(userId))}
      >
        Fetch user
      </button>
      {/* At any point if we're fetching a user, display that on the UI */}
      {userFetchStatus === "loading" && <div>Fetching user...</div>}
    </div>
  );
}
