import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  }
  renderOrder = key => {
    const {
      order,
      fishes,
      removeFromOrder,
    } = this.props
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'
    if (!fish) return null
    if (!isAvailable) {
      return (
        <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
          <li key={key}>
            Sorry, {fish ? fish.name: 'fish'} is no longer available
          </li>
        </CSSTransition>
      )
    }
    return (
    <CSSTransition classNames="order" key={key} timeout={{ enter: 250, exit: 250 }}>
      <li key={key}>
        <span>
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={count} timeout={{ enter: 250, exit: 250 }}>
              <span>{count}</span>  
            </CSSTransition> 
          </TransitionGroup>
          lbs {fish.name}
          {' '}
          {formatPrice(count * fish.price)}
          <button onClick={removeFromOrder(key)}>&times;</button>
        </span>
      </li>
    </CSSTransition>
    )
  }
  render() {
    const {
      order,
      fishes,
    } = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const count = order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(key => this.renderOrder(key))}
        </TransitionGroup>
        <div className="total">
          Total:{' '}
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order
