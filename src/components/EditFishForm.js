import React, { Component } from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func,
  }
  
  onChange = ({ target: { name, value } }) => {
    const { fish, updateFish } = this.props
    const updatedFish = {
    ...fish,
    [name]: value
  }
  updateFish(updatedFish)
}

  render() {
    const {
      fish: {
        name, 
        price,
        status,
        image,
        desc,
      },
      deleteFish,
    } = this.props
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.onChange}
        />
        <input
          type="text"
          name="price"
          value={price}
          onChange={this.onChange}
        />
        <select
          name="status"
          value={status}
          onChange={this.onChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={desc}
          onChange={this.onChange}
        >
        </textarea>
        <input
          type="text"
          name="image"
          value={image}
          onChange={this.onChange}
        />
        <button onClick={deleteFish}>Remove Fish</button>
      </div>
    )
  }
}

export default EditFishForm