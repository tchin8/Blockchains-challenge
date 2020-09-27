import React from 'react';

class Typeahead extends React.Component {
  constructor(props) {
    super(props);   // why is super crossed out? deprecated API?
    this.state = {
      input: '',
    }
  }

  render() {
    const { list } = this.props;
    const { input } = this.state;

    let colorsList = null;
    if (input.length > 0 && input.split("").every(char => char !== ' ')) {
      colorsList = list.map((l, i) => {
        return (
          <li key={i}>{l}</li>
        )
      })
    }

    return (
      <section>
        <input type="text"/>
        <ul>
          {colorsList}
        </ul>
      </section>
    )
  }
}

export default Typeahead;