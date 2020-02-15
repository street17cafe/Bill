import React, {useState} from 'react'
import { connect } from 'react-redux'
import { snackbarSuccess, snackbarError, snackbarInfo } from '../../Store/actions/snackbar'
import { fetchDishes } from '../../Store/actions/Dish'
import VerticalNav from './VerticalNav'
import { withRouter } from 'react-router-dom'
import ConfirmServing from './Modals/ConfirmServing'
import { addItem, removeItem } from '../../Store/actions/Cart'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Loading from '../../Enhancements/Loading'

class AllDishes extends React.Component {
  state = {
    data: [],
    modal: {
      open: false,
      value: 'R',
      quantity: 1
    },
    renderImages: false
  }

  componentDidMount = () => {
    if(this.props.Dish.data.length > 0){
      this.setState({data: this.props.Dish.dishes})
      return;
    }
    this.props.fetchDishes();
  }

  addClick = (groupIndex, id) => {
    let item = {}
    let dishes = this.props.Dish.data
    console.log(groupIndex, id)
    for(let j = 0; j < dishes[groupIndex].items.length; j++){
      if(dishes[groupIndex].items[j].id === id){
        item = dishes[groupIndex].items[j]
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
      _id: this.state.modal.item.id,
      size: this.state.modal.value,
      quantity: this.state.modal.quantity,
      name: this.state.modal.item.label,
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

  switchChange = e => {
    this.setState(prevState => ({
      renderImages: !prevState.renderImages
    }))
  }

  render = () => {
    //console.log(this.state)

    return (
      <Grid container>
        <Grid item xs={12} style={{minHeight: "400px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Loading isLoading={this.props.Dish.isFetching}>
            <VerticalNav 
              data={this.props.Dish.data}
              addClick={this.addClick}
              deleteClick={this.deleteClick}
              renderImages={this.state.renderImages}
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
            </Loading>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  Dish: state.Dish
})

const mapDispatchToProps = dispatch => ({

  snackbarSuccess: message => dispatch(snackbarSuccess(message)),
  snackbarError: message => dispatch(snackbarError(message)),
  snackbarInfo: message => dispatch(snackbarInfo(message)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: id => dispatch(removeItem(id)),
  fetchDishes: data => fetchDishes(dispatch, data)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllDishes))