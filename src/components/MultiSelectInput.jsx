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
  const [filetrOptionList, setFiletrOptionList] = useState([]);
  const [openList, setOpenList] = useState(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);
  const objeRef = useRef(null);
  const iconRef = useRef(null);
  const ref = useOutsideClick(() => {
    divRef.current.classList.remove("active");
    iconRef.current.classList.remove("active");
    setOpenList(false);
  });
  const handleOpen = () => {
    divRef.current.classList.toggle("active");
    iconRef.current.classList.toggle("active");
    inputRef.current.focus();
    setOpenList(!openList);
  };
  const handleSelectedUser = (e, slectedOption) => {
    e.stopPropagation();
    setSelectedOptionList([...selectedOptionList, slectedOption]);
    if (typeof slectedOption === "object") {
      setselectedUserID(
        new Set([...selectedUserID, slectedOption[objeRef.current[0]]])
      );
    } else {
      setselectedUserID(new Set([...selectedUserID, slectedOption]));
    }

    setSearchText("");
    divRef.current.classList.remove("active");
    iconRef.current.classList.remove("active");
    setOpenList(false);
    inputRef?.current?.focus();
  };
  const removeSelectedUser = (e, id) => {
    e.stopPropagation();
    // const removeUser = selectedOptionList.filter((user) => user.id !== id);
    const removeUser = selectedOptionList.filter((item) => {
      if (typeof item == "object") {
        return item[objeRef.current[0]] !== id;
      } else {
        return item !== id;
      }
    });
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
    const searchresult = option.filter((item) => {
      if (typeof item == "object") {
        return item[objeRef.current[1]]
          .toLowerCase()
          .includes(searchText.toLowerCase());
      } else {
        return `${item}`.toLowerCase().includes(searchText.toLowerCase());
      }
    });
    divRef.current.classList.add("active");
    setFiletrOptionList(searchresult);
  };
  useEffect(() => {
    setFiletrOptionList(option);
    objeRef.current = option.length > 0 ? Object.keys(option[0]) : null;
  }, [option, openList]);
  useEffect(() => {
    onChange(selectedOptionList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptionList]);
  return (
    <div className="main">
      <div
        className="multi_select_box_container"
        onClick={handleOpen}
        ref={ref}
      >
        <div className="multi_select_box">
          <div className="multi_select_search_box">
            {!!selectedOptionList.length &&
              selectedOptionList.map((user) => {
                if (typeof user === "object" && user !== null) {
                  const objKey = Object.keys(user);
                  return (
                    <span
                      key={user[objKey[0]]}
                      className="multi_select_label"
                      onClick={(e) => removeSelectedUser(e, user?.id)}
                    >
                      <span>{user[[objKey[1]]]}</span>
                      <button className="remove_btn">
                        <RemoveIcon />
                      </button>
                    </span>
                  );
                } else {
                  return (
                    <span key={user} className="multi_select_label">
                      <span>{user}</span>
                      <button
                        className="remove_btn"
                        onClick={(e) => removeSelectedUser(e, user)}
                      >
                        <RemoveIcon />
                      </button>
                    </span>
                  );
                }
              })}
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
          <div className="multi_select_icon" ref={iconRef}>
            <ArrowIcon />
          </div>
        </div>
        <div className="suggetion_list" ref={divRef}>
          <ul>
            {filetrOptionList?.map((list) => {
              if (typeof list === "object" && list !== null) {
                const objKey = objeRef.current;
                return (
                  !selectedUserID.has(list[objKey[0]]) && (
                    <li
                      key={list[objKey[0]]}
                      className="list_item"
                      onClick={(e) => handleSelectedUser(e, list)}
                    >
                      <span>{list[objKey[1]]}</span>
                    </li>
                  )
                );
              } else {
                return (
                  !selectedUserID.has(list) && (
                    <li
                      key={list}
                      className="list_item"
                      onClick={(e) => handleSelectedUser(e, list)}
                    >
                      <span>{list}</span>
                    </li>
                  )
                );
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectInput;
