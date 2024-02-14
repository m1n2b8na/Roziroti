import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class Home extends Component {
  state = {
    TotalBalance: 1000,
    lastTransaction: '',
    showAdd: false,
    showDraw: false,
    isLoading: true,
    addAmount: null,
    drawAmount: null,
  }

  componentDidMount() {
    this.changeLoading()
  }

  changeLoading = () => {
    this.setState({isLoading: false})
  }

  firstView = () => {
    const {TotalBalance, showAdd, showDraw, lastTransaction} = this.state
    return (
      <div className="main_container">
        <h1>Available Balance : {TotalBalance}</h1>
        <p>{lastTransaction}</p>
        <div className="btn_container">
          <button type="button" className="btn" onClick={this.onShowAdd}>
            Add Amount
          </button>
          <button type="button" className="btn" onClick={this.onShowDraw}>
            With Draw
          </button>
        </div>
        {showAdd ? this.onAddAmount() : null}
        {showDraw ? this.onDrawAmount() : null}
      </div>
    )
  }

  onShowDraw = () => {
    this.setState({showDraw: true})
  }

  onShowAdd = () => {
    this.setState({showAdd: true})
  }

  addSubmit = () => {
    const {TotalBalance, addAmount} = this.state
    const amount = parseInt(addAmount)
    this.setState(prevState => ({
      TotalBalance: prevState.TotalBalance + amount,
    }))
    this.setState({
      showAdd: false,
      lastTransaction: `${addAmount} credited to your account`,
    })
  }

  onAmount = event => {
    this.setState({addAmount: event.target.value})
  }

  onAddAmount = () => {
    const {addAmount} = this.state
    return (
      <form onSubmit={this.addSubmit}>
        <h1>Enter Amount</h1>
        <div className="input_container">
          <input
            type="text"
            placeholder="Enter amount"
            value={addAmount}
            onChange={this.onAmount}
          />
          <button type="submit" className="add_btn">
            Add
          </button>
        </div>
      </form>
    )
  }

  drawSubmit = () => {
    const {TotalBalance, drawAmount} = this.state
    if (parseInt(drawAmount) > TotalBalance) {
      alert('you do not have that much of amount')
    } else {
      const dAmount = parseInt(drawAmount)
      this.setState(prevState => ({
        TotalBalance: prevState.TotalBalance - dAmount,
      }))
      this.setState({
        showDraw: false,
        lastTransaction: `${dAmount} Debited from your account`,
      })
    }
  }

  onDraw = event => {
    this.setState({drawAmount: event.target.value})
  }

  onDrawAmount = () => {
    const {drawAmount} = this.state
    return (
      <form onSubmit={this.drawSubmit}>
        <h1>Enter Amount</h1>
        <div className="input_container">
          <input
            type="text"
            placeholder="Enter amount"
            value={drawAmount}
            onChange={this.onDraw}
          />
          <button type="submit" className="add_btn">
            Draw
          </button>
        </div>
      </form>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        ) : (
          this.firstView()
        )}
        )
      </div>
    )
  }
}

export default Home
