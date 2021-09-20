import Category from "./component/Category";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from "./component/Login";
import Customers from "./component/Customers";
import WishList from "./component/WishList";
import Inventory from "./component/Inventory";
import Transaction from "./component/Transaction";
import TransactionList from "./component/TransactionList";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/category/' component={Category} />
          <Route exact path='/customers/' component={Customers} />
          <Route exact path='/wishlist/' component={WishList} /> 
          <Route exact path='/inventory' component={Inventory} />      
          <Route exact path='/transaction/' component={Transaction} />
          <Route exact path='/transaction_list/' component={TransactionList} />
        </Switch>
      </Router>

    </div>
  );
}

export default App; 
