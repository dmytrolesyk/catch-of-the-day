import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'

class App extends Component {
  state = {
    fishes: {},
    order: {},
  }

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    const { match: { params: { storeId } } } = this.props
    const localStorageRef = localStorage.getItem(storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    } else {
      this.setState({order: {}})
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes',
    })
  }

  componentDidUpdate() {
    const { match: { params: { storeId } } } = this.props
    const { order } = this.state
    localStorage.setItem(storeId, JSON.stringify(order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addFish = (fish) => {
    const fishes = {...this.state.fishes}
    fishes[`fish${Date.now()}`] = fish
    this.setState({ fishes })
  }

  updateFish = (fish) => {
    const fishes = {...this.state.fishes}
    this.setState({
      fishes: {
        ...fishes,
        fish,
      }
    })
  }

  deleteFish = key => () => {
    const fishes = {...this.state.fishes}
    fishes[key] = null
    this.setState({ fishes })
  }

  addToOrder = fishKey => () => {
    const { order } = this.state
    const numberOfFishes = order[fishKey] + 1 || 1
    this.setState({ order: {...order, [fishKey]: numberOfFishes} })
  }

  removeFromOrder = fishKey => () => {
    const { order } = this.state
    delete order[fishKey]
    this.setState({ order })
  }
  
  loadSampleFishes = () => this.setState({ fishes: sampleFishes })

  render() {
    const {
      fishes,
      order,
    } = this.state
    const { match: { params: { storeId } } } = this.props
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header 
            tagline="fresh seafood market"
          />
          <ul className="fishes">
            {Object.entries(fishes).map(
              ([key, value ]) => (
                <Fish
                  key={key}
                  fish={value}
                  addToOrder={this.addToOrder(key)}
                />
              )
            )}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          fishes={fishes}
          loadSampleFishes={this.loadSampleFishes}
          storeId={storeId}
        />
      </div>
    )
  }
}

export default App