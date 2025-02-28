import React, { useState } from 'react';

const SearchandSort = ({ shows, setFilteredShows }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('A-Z');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const filteredShows = shows
    .filter(show => show.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'A-Z') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'Z-A') {
        return b.title.localeCompare(a.title);
      } else if (sortOption === 'newest') {
        return new Date(b.updated) - new Date(a.updated);
      } else if (sortOption === 'oldest') {
        return new Date(a.updated) - new Date(b.updated);
      }
      return 0;
    });

  React.useEffect(() => {
    setFilteredShows(filteredShows);
  }, [searchQuery, sortOption, shows, setFilteredShows]);

  return (
    <div className="search-sort-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search Shows..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <select className="sort-bar" value={sortOption} onChange={handleSort}>
        <option value="A-Z">Sort A-Z</option>
        <option value="Z-A">Sort Z-A</option>
        <option value="newest">Most Recently Updated</option>
        <option value="oldest">Least Recently Updated</option>
      </select>
    </div>
  );
};

export default SearchandSort;
