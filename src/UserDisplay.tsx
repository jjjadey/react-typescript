import React from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchUser, selectUser, selectUserFetchStatus } from "./userSlice";

export default function UserDisplay() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectUser);
  const userFetchStatus = useAppSelector(selectUserFetchStatus);

  return (
    <div>
      {/* Display the current user name */}
      <div role="contentinfo">{name}</div>
      {/* On button click, dispatch a thunk action to fetch a user */}
      <button onClick={() => dispatch(fetchUser())}>Fetch user</button>
      {/* At any point if we're fetching a user, display that on the UI */}
      {userFetchStatus === "loading" && <div>Fetching user...</div>}
    </div>
  );
}
