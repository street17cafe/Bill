import React from 'react'
import { connect } from 'react-redux'
import { snackbarSuccess, snackbarError } from '../../Store/actions/snackbar'
import VerticalNav from './VerticalNav'
import { withRouter } from 'react-router-dom'
import { fetchAllDishes, groupDishes } from '../Common'
import ConfirmServing from './Modals/ConfirmServing'
import { addItem, removeItem } from '../../Store/actions/Cart'

class AllDishes extends React.Component {
  state = {
    data: [],
    dishes: {},
    modal: {
      open: false,
      value: 'R',
      quantity: 1
    }
  }

  componentDidMount = () => {
    fetchAllDishes((err, data) => {
      if(err){
        this.props.snackbarError(data.message)
      }
      this.setState({data: groupDishes(data.data)})
    })
  }

  addClick = (groupIndex, id) => {
    let item = {}

    for(let j = 0; j < this.state.data[groupIndex].items.length; j++){
      if(this.state.data[groupIndex].items[j]._id === id){
        item = this.state.data[groupIndex].items[j]
        break
      }
    }
    this.setState(prevState => ({
      modal: {
        ...prevState.modal,
        item,
        open: true
      }
    }))
  }

  deleteClick = (id) => {
    console.log(id)
    this.props.removeItem(id)
  }

  handleConfirmClose = () => {
    this.setState({
      modal: {
        open: false,
        value: 'R',
        quantity: 1
      }
    })
  }

  onServingSizeChange = e => {
    let value = e.target.value;
    this.setState(prevState => ({
      modal: {
        ...prevState.modal,
        value
      }
    }))
  }

  handleQuantityChange = e => {
    let l = e.target.value
    this.setState(prevState => ({
      modal: {
        ...prevState.modal,
        quantity: l
      }
    }))
  }

  handleConfirmationSubmit = e => {
    //get the item id, size, qunatity
    let price = -1
    this.state.modal.item.serving.forEach(serving => {
      
      if(serving.size === this.state.modal.value)
        price = serving.price
    })
    let item = {
      id: new Date().getTime(),
      _id: this.state.modal.item._id,
      size: this.state.modal.value,
      quantity: this.state.modal.quantity,
      name: this.state.modal.item.name,
      price
    }
    this.setState({
      modal: {
        open: false,
        value: 'R',
        quantity: 1
      }
    })
    this.props.addItem(item)
  }

  render = () => {
    return (
      <React.Fragment>
        <VerticalNav 
          data={this.state.data}
          addClick={this.addClick}
          deleteClick={this.deleteClick}
        />
        {
          this.state.modal.open && 
          <ConfirmServing 
            handleClose={this.handleConfirmClose}
            {...this.state.modal}
            handleQuantityChange={this.handleQuantityChange}
            onServingSizeChange={this.onServingSizeChange}
            handleSubmit={this.handleConfirmationSubmit}
            />
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({

  snackbarSuccess: message => dispatch(snackbarSuccess(message)),
  snackbarError: message => dispatch(snackbarError(message)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: id => dispatch(removeItem(id))

})

export default withRouter(connect(null, mapDispatchToProps)(AllDishes))