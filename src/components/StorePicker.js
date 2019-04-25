import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getFunName } from '../helpers'

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object,
  }
  textInput = React.createRef()
  goToStore = (e) => {
    e.preventDefault()
    this.props.history.push(`/store/${this.textInput.current.value}`)
  }
  render() {
    return (
      <form
        className="store-selector"
        onSubmit={this.goToStore}
      >
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.textInput}
          required 
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    )
  }
}

export default StorePicker