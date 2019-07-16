import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { city: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.city);
  }

  render() {
    return (
      <div className="search-container">
        <form onSubmit={this.onFormSubmit}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter a city..."
              value={this.state.city}
              onChange={e => this.setState({ city: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
