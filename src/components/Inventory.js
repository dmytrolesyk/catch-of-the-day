import React, { Component } from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import Login from './Login'
import base, { firebaseApp } from '../base'

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
  }
  
  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async (authData) => {
    const { storeId } = this.props
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(storeId, { context: this })
    // 2. Claim it if there is no owner
    if (!store.owner) {
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      })
    }
    // 3. Set the state of the inventory to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner ||  authData.user.uid,
    })
  }

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler)
  }

  logout = async () => {
    await firebase.auth().signOut()
    this.setState({
      uid: null,
    })
  }
  
  render() {
    const {
      addFish,
      loadSampleFishes,
      fishes,
      updateFish,
      deleteFish,
    } = this.props
    const {
      uid,
      owner,
    } = this.state
    const logout = <button onClick={this.logout}>Log Out</button>
    if (!uid) return <Login authenticate={this.authenticate}/>
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry you are now the owner!</p>
          {logout}
        </div>
      )
    }
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.entries(fishes).map(([key, fish]) => (
          <EditFishForm
            key={key}
            fish={fish}
            updateFish={updateFish}
            deleteFish={deleteFish(key)}
          />
        ))}
        <AddFishForm addFish={addFish}/>
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory
