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
    if (input.length > 0 && input.split("").some(char => char !== ' ')) {
      let search = input.toLowerCase();
      while (search.startsWith(' ')) {
        search = search.slice(1);
      }

      colorsList = list.filter(l => (l.toLowerCase()).startsWith(search)).map((l, i) => {
        return (
          <li key={i}>{l}</li>
        )
      })
    }

    return (
      <section className='container'>
        <div className='main'>
          <span className='title'>Welcome to Color Finder!</span>
          <input type="text" 
            placeholder="Begin typing for colors to populate below..."
            value={input} 
            onChange={this.update('input')}/>
          <ul>
            {colorsList}
          </ul>
        </div>
      </section>
    )
  }
}

export default Typeahead;