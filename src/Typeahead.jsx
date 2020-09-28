import React from 'react';

class Typeahead extends React.Component {
  constructor(props) {
    super(props);   // why is super crossed out? deprecated API?
    this.state = {
      input: '',
      backgroundColor: 'white',
    }

    this.list = [];
  }

  componentDidMount() {
    let that = this;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        let liColors = document.getElementsByClassName('each-color');
        for (let i = 0; i < liColors.length; i++) {
          let li = liColors[i];
          if (document.activeElement === li) {
            that.setState({ 
              backgroundColor: li.getAttribute('id').toLowerCase(),
              input: li.getAttribute('id'),
            });
            let input = document.getElementsByTagName('input');
            input[0].focus();
          }
        }
      } else if (e.key === 'Tab' && that.list.length) {
        if (document.activeElement === document.getElementsByTagName('input')[0] && that.list.length) {
          let liColors = document.getElementsByClassName('each-color');
          setTimeout(() => liColors[0].focus(), 1);
        }
      }
    });
    
  }

  update(field) {
    return e => (
      this.setState({ [field]: e.target.value })
    )
  }

  render() {
    const { list } = this.props;
    const { input, backgroundColor } = this.state;

    let colorsList = null, errorMsg = null;
    if (input.length > 0 && input.split("").some(char => char !== ' ') && !list.some(l => l === input)) {
      let search = input.toLowerCase();
      while (search.startsWith(' ')) {
        search = search.slice(1);
      }

      this.list = list.filter(l => (l.toLowerCase()).startsWith(search));
      colorsList = this.list.map((l, i) => {
        let bold = l.slice(0, search.length);
        let normal = l.slice(search.length);
        return (
          <li key={i} className='each-color' tabIndex='0' id={l}>
            <span className='bold'>{bold}</span>
            <span className='normal'>{normal}</span>
          </li>
        )
      })

      if (!colorsList.length) {
        errorMsg = (
          <span className='error'>Oops! Looks like there are no colors that start with those letters. Please try again. </span>
        )
      }
    }

    return (
      <section className='background' style={{ backgroundColor: backgroundColor }}>
        <div className='container'>
          <div className='main'>
            <span className='title'>Welcome to Color Finder!</span>
            <input type="text" 
              placeholder="Begin typing to find a color..."
              value={input} 
              className={colorsList && colorsList.length ? 'show-list' : ''}
              onChange={this.update('input')}/>
            {colorsList ? 
              <ul className='colors-list'>
                {colorsList}
              </ul> : null
            }
            {errorMsg}
          </div>
        </div>
      </section>
    )
  }
}

export default Typeahead;