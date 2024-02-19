/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import RemoveIcon from "./icons/RemoveIcon";
import useDebounce from "../utils/useDebounce";
import useOutsideClick from "../utils/useOutsideClick";
const MultiSelectInput = ({ userList, onChange }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedUserList, setSelectedUserList] = useState([]);
  const [selectedUserID, setselectedUserID] = useState(new Set());
  const [filetrUserList, setFiletrUserList] = useState([]);
  const [openList, setOpenList] = useState(false);
  const searchDebounce = useDebounce(searchText, 500);
  const inputRef = useRef(null);
  const listRef = useOutsideClick(() => {
    setOpenList(false);
  });
  const handleSelectedUser = (id, image, firstName, lastName) => {
    setSelectedUserList([
      ...selectedUserList,
      { id, image, firstName, lastName },
    ]);
    setselectedUserID(new Set([...selectedUserID, id]));
    setSearchText("");
    setOpenList(false);
    inputRef?.current?.focus();
  };
  const removeSelectedUser = (id) => {
    const removeUser = selectedUserList.filter((user) => user.id !== id);
    setSelectedUserList(removeUser);
    const updateUserId = new Set(selectedUserID);
    updateUserId.delete(id);
    setselectedUserID(updateUserId);
  };
  const handleBackSpace = (e) => {
    if (e.code == "Backspace" && selectedUserList.length > 0 && !searchText) {
      const lastIndex = selectedUserList[selectedUserList.length - 1];
      removeSelectedUser(lastIndex.id);
    }
  };
  const hadleSearch = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const searchresult = userList.filter((user) =>
      user.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFiletrUserList(searchresult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);
  useEffect(() => {
    setFiletrUserList(userList);
  }, [userList]);
  useEffect(() => {
    onChange(selectedUserList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserList]);
  return (
    <div className="search_box_conatiner">
      <div className="search_box" onClick={() => setOpenList(true)}>
        {!!selectedUserList.length &&
          selectedUserList.map((user) => (
            <span key={user.id} className="selected_user">
              <img src={user?.image} className="selected_user_img" />
              <span>
                {user?.firstName} {user?.lastName}
              </span>
              <button
                className="remove_btn"
                onClick={() => removeSelectedUser(user?.id)}
              >
                <RemoveIcon />
              </button>
            </span>
          ))}
        <input
          type="text"
          className="search_box_input"
          placeholder="Search user"
          value={searchText}
          onChange={hadleSearch}
          onKeyDown={handleBackSpace}
          ref={inputRef}
        />
      </div>
      {openList && (
        <div className="search_suggetion" ref={listRef}>
          <ul className="list_items">
            {filetrUserList?.map(
              (list) =>
                !selectedUserID.has(list.id) && (
                  <li
                    key={list.id}
                    tabIndex={-1}
                    className="list_item"
                    onClick={() =>
                      handleSelectedUser(
                        list.id,
                        list.image,
                        list.firstName,
                        list.lastName
                      )
                    }
                  >
                    <img src={list.image} className="list_img" loading="lazy" />
                    <span>
                      {list.firstName} {list.lastName}
                    </span>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectInput;
