import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import get from "lodash/get";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import { getUsers, updateUsers } from "actions/users";
import { bindActionCreators } from "redux";
import UsersList from "components/UsersList";
import InputText from "components/InputText";
import SortField from "components/SortField";
import { generateShowName } from "utils/strings";
import { sortOptions } from "constants/users";
import { CircularProgress } from "@material-ui/core";

import "./styles.scss";

function UsersPage({ fetchUsers, putUsers, users, loaded, loading }) {
  // state to handle the users list with updates
  const [filteredList, setFilteredList] = useState([]);
  // state to handle the filter value
  const [filter, setFilter] = useState("");
  // state to handle the sort value
  const [sort, setSort] = useState("");
  // state to handle the edit selected user
  const [edit, setEdit] = useState("");

  // initial fetch to get users
  useEffect(() => {
    // results is the total of users that we want to receive
    fetchUsers({ results: 20 });
    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    // once the action is completed, populate the local state filteredList
    if (loaded) {
      setFilteredList(users);
    }
    //  eslint-disable-next-line
  }, [loaded]);

  // method to filter list by full name
  const generateFilteredList = (val) =>
    users.filter(
      (item) =>
        generateShowName(item)
          .toLowerCase()
          .indexOf(val.toLowerCase().trim()) !== -1
    );

  // method to sort list by name (currently only ASC)
  const generateSortedList = (list) =>
    list.sort(({ name: nameA = {} }, { name: nameB = {} }) => {
      if (nameA.first > nameB.first) {
        return 1;
      }
      if (nameA.first < nameB.first) {
        return -1;
      }
      return 0;
    });

  // handles the filtering events
  const handleFilter = (e) => {
    const {
      target: { value }
    } = e;

    // close user card edit mode
    if (edit !== "") {
      setEdit("");
    }

    setFilter(value);
    // generate the filtered list
    let filtered = generateFilteredList(value);
    if (sort !== "") {
      // if the sort is selected then generate a filtered and sorted list
      filtered = generateSortedList(filtered);
    }
    setFilteredList(filtered);
  };

  // handles the sorting events
  const handleSort = (e) => {
    const {
      target: { value }
    } = e;

    // close user card edit mode
    if (edit !== "") {
      setEdit("");
    }

    // returns the list filtered only if is the case
    const list = generateFilteredList(filter);
    if (value !== sort) {
      setSort(value);
      // generate the sorted list
      const sorted = generateSortedList(list);
      setFilteredList([...sorted]);
    } else {
      // clears the sort order
      setSort("");
      setFilteredList(list);
    }
  };

  // handles the edit user events and saving to the store action
  const handleEdit = useCallback(
    (selected) => {
      const {
        login: { uuid: current }
      } = selected;
      if (current === edit) {
        // close edit mode
        setEdit("");
        // add the edited user to the list
        const payload = users.map((item) => {
          if (item.login.uuid === current) {
            return selected;
          }
          return item;
        });
        // trigger action to update the users in store
        putUsers(payload);
      } else {
        // open edit mode
        setEdit(current);
      }
    },
    [edit, putUsers, users]
  );

  // handles the user form inputs update
  const handleCardInputChange = useCallback(
    (e, item) => {
      const {
        target: { name, value }
      } = e;
      let newItem = {};
      // update filteredList local state
      const updated = filteredList.map((v) => {
        // modify the current user
        if (v.login.uuid === item.login.uuid) {
          newItem = set(cloneDeep(item), name, value);
          return newItem;
        }
        return v;
      });

      setFilteredList(updated);
    },
    [filteredList]
  );

  // discard the current user changes on click event
  const handleEditCancel = useCallback(
    (val) => {
      const {
        login: { uuid }
      } = val;
      const original = users.find(({ login }) => login.uuid === uuid);
      const updated = filteredList.map((v) => {
        if (v.login.uuid === uuid) {
          return original;
        }
        return v;
      });
      setFilteredList(updated);
      // close edit mode
      setEdit("");
    },
    [filteredList, users]
  );
  // if data is loading or is not loaded show spinner
  const showSpinner = !loaded || loading;

  return (
    <div className="users-container">
      <h1 className="title">CODE TEST - USERS LIST</h1>
      {showSpinner && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {loaded && (
        <>
          <div className="customs-container">
            <div className="customs-filtering">
              <div className="customs-input-filter">
                <InputText
                  label="Filter"
                  onChange={handleFilter}
                  value={filter}
                  name="Filter"
                />
              </div>
              <SortField
                options={sortOptions}
                selected={sort}
                onChange={handleSort}
              />
            </div>
          </div>
          <h2 className="title">Showing: {filteredList.length} Results</h2>
          <UsersList
            onClick={handleEdit}
            edit={edit}
            onCancel={handleEditCancel}
            onChange={handleCardInputChange}
            list={filteredList}
          />
        </>
      )}
    </div>
  );
}

UsersPage.propTypes = {
  fetchUsers: PropTypes.func,
  putUsers: PropTypes.func,
  users: PropTypes.array,
  loaded: PropTypes.bool,
  loading: PropTypes.bool
};

UsersPage.defaultProps = {
  users: [],
  loaded: false,
  loading: false
};

// this can be replaced with useSelector hooks but i think it keeps the code cleaner this way
const mapStateToProps = (state) => ({
  loading: get(state, "users.loading", false),
  loaded: get(state, "users.loaded", false),
  users: get(state, "users.list", [])
});

// the same, can be replaced with useDispatch
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUsers: getUsers,
      putUsers: updateUsers
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
