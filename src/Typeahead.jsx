import React from 'react';

class Typeahead extends React.Component {
  constructor(props) {
    super(props);   // why is super crossed out? deprecated API?
    this.state = {
      input: '',
    }
  }

  update(field) {
    return e => (
      this.setState({ [field]: e.target.value })
    )
  }

  render() {
    const { list } = this.props;
    const { input } = this.state;

    let colorsList = null;
    if (input.length > 0 && input.split("").every(char => char !== ' ')) {
      let search = input;
      while (search.startsWith(' ')) {
        search = search.slice(1);
      }

      colorsList = list.filter(l => (l.toLowerCase()).startsWith(input.toLowerCase())).map((l, i) => {
        return (
          <li key={i}>{l}</li>
        )
      })
    }

    return (
      <section>
        <h1>Start typing for colors to auto-generate!</h1>
        <input type="text" value={input} onChange={this.update('input')}/>
        <ul>
          {colorsList}
        </ul>
      </section>
    )
  }
}

export default Typeahead;