/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import RemoveIcon from "./icons/RemoveIcon";
import ArrowIcon from "./icons/ArrowIcon";
import useOutsideClick from "../utils/useOutsideClick";
const MultiSelectInput = ({
  option,
  selectedItems = [],
  placeholder = "",
  onChange,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedOptionList, setSelectedOptionList] = useState(selectedItems);
  const [selectedUserID, setselectedUserID] = useState(new Set());
  const [filetrUserList, setFiletrUserList] = useState([]);
  const [openList, setOpenList] = useState(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const ref = useOutsideClick(() => {
    divRef.current.classList.remove("active");
    setOpenList(false);
  });
  const handleOpen = () => {
    divRef.current.classList.toggle("active");
    inputRef.current.focus();
    setOpenList(!openList);
  };
  const handleSelectedUser = (e, slectedOption) => {
    e.stopPropagation();
    setSelectedOptionList([...selectedOptionList, slectedOption]);
    setselectedUserID(new Set([...selectedUserID, slectedOption.id]));
    setSearchText("");
    divRef.current.classList.remove("active");
    setOpenList(false);
    inputRef?.current?.focus();
  };
  const removeSelectedUser = (e, id) => {
    e.stopPropagation();
    const removeUser = selectedOptionList.filter((user) => user.id !== id);
    setSelectedOptionList(removeUser);
    const updateUserId = new Set(selectedUserID);
    updateUserId.delete(id);
    setselectedUserID(updateUserId);
  };
  const handleBackSpace = (e) => {
    if (e.code == "Backspace" && selectedOptionList.length > 0 && !searchText) {
      const lastIndex = selectedOptionList[selectedOptionList.length - 1];
      removeSelectedUser(e, lastIndex.id);
    }
  };
  const hadleSearch = (e) => {
    setSearchText(e.target.value);
    const searchresult = option.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    divRef.current.classList.add("active");
    setFiletrUserList(searchresult);
  };
  useEffect(() => {
    setFiletrUserList(option);
  }, [option, openList]);
  useEffect(() => {
    onChange(selectedOptionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionList]);
  return (
    <div className="multi_select_box_container" onClick={handleOpen} ref={ref}>
      <div className="multi_select_box">
        <div className="multi_select_search_box">
          {!!selectedOptionList.length &&
            selectedOptionList.map((user) => (
              <span key={user.id} className="multi_select_label">
                <span>{user?.name}</span>
                <button
                  className="remove_btn"
                  onClick={(e) => removeSelectedUser(e, user?.id)}
                >
                  <RemoveIcon />
                </button>
              </span>
            ))}
          <input
            type="text"
            className="multi_select_search_input"
            placeholder={placeholder || "Search..."}
            value={searchText}
            onChange={hadleSearch}
            onKeyDown={handleBackSpace}
            ref={inputRef}
          />
        </div>
        <div className="multi_select_icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="suggetion_list" ref={divRef}>
        <ul>
          {filetrUserList?.map(
            (list) =>
              !selectedUserID.has(list.id) && (
                <li
                  key={list.id}
                  tabIndex={-1}
                  className="list_item"
                  onClick={(e) => handleSelectedUser(e, list)}
                >
                  <span>{list.name}</span>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectInput;
