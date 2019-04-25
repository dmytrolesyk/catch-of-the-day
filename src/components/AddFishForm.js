import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddFishForm extends Component {
  static propTypes = {
    addFish: PropTypes.func,
  }
  state = {
    name: '',
    price: '',
    desc: '',
    image: '',
    status: 'available',
  }

  createFish = (e) => {
    const {
      addFish
    } = this.props
    e.preventDefault()
    const {
      name,
      price,
      desc,
      image,
      status,
    } = this.state
    const fish = {
      name,
      price: parseFloat(price, 10),
      desc,
      image,
      status,
    }
    addFish(fish)
    this.setState({
      name: '',
      price: '',
      desc: '',
      image: '',
      status,
    })
  }

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  render() {
    const {
      name,
      price,
      desc,
      image,
      status
    } =this.state
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          onChange={this.onChange}
          name="name"
          value={name}
          type="text"
          placeholder="Name"/>
        <input
          onChange={this.onChange}
          name="price"
          value={price}
          type="text" 
          placeholder="Price"/>
        <select
          onChange={this.onChange}
          name="status">
          value={status}
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          onChange={this.onChange} 
          name="desc"
          value={desc}
          placeholder="Desc">
        </textarea>
        <input 
          onChange={this.onChange} 
          name="image"
          value={image}
          type="text" 
          placeholder="Image"/>
        <button type="submit">+ Add Fish</button>
      </form>
    )
  }
}

export default AddFishForm
