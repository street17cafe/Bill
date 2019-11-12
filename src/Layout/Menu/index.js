import React from 'react'
import { connect } from 'react-redux'
import { snackbarSuccess, snackbarError } from '../../Store/actions/snackbar'
import VerticalNav from './VerticalNav'
import { withRouter } from 'react-router-dom'
import { fetchAllDishes, groupDishes } from '../Common'
import ConfirmServing from './Modals/ConfirmServing'

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
      confirm: {
        ...prevState.confirm,
        quantity: l
      }
    }))
  }

  handleConfirmationSubmit = e => {
    //get the item id, size, qunatity
    let item = {
      id: new Date().getTime(),
      itemId: this.state.modal.item._id,
      size: this.state.modal.value,
      quantity: this.state.modal.quantity
    }
    this.setState({
      modal: {
        open: false,
        value: 'R',
        quantity: 1
      }
    })
    console.log(item)
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
  snackbarError: message => dispatch(snackbarError(message))

})

export default withRouter(connect(null, mapDispatchToProps)(AllDishes))