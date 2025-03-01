import React from 'react';
import { useDispatch } from 'react-redux';
import {
  clearQuery,
  setQuery,
  setStatus,
  useFilter,
} from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterState = useFilter();

  function handleQueryChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const value = ev.target.value;

    dispatch(setQuery(value));
  }

  function handleSelectChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setStatus(ev.target.value));
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterState.status}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={filterState.query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterState.query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(clearQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
