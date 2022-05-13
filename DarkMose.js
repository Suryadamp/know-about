-------------------------------------Dark mode code.js---------------------------
import React,{useState} from "react";
import "./App.css";
import BlogSpot from "./views/BlogSpot";
import BlogList from "./views/BlogList";
import ReadMore from "./views/ReadMore";
import LoginBlog from "./views/LoginBlog";
import Footer from "./views/Footer";
import Header from "./views/Header";
import { Route, Routes } from "react-router-dom";
import AddBlog from "./views/AddBlog"
import { Provider } from "react-redux";
import store from "./store/reduxStore";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";




function App() {
  const [state, setState] = useState({
    darkMode: false,
    open: false,
    setOpen: false
  });
  const handleChange = name => event => {
    if (event.target.checked) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
    setState({ ...state, [name]: event.target.checked });
  };
  

  return (
    <div className="App">
     
    
      <Provider store={store}>
        <Header/>
    
     
        <Grid
          container
          justify="flex-end"
          direction="row"
        >
          <Switch
            checked={state.darkMode}
            onChange={handleChange("darkMode")}
            value="darkMode"
            size="medium"
            color="secondary"
          />
        </Grid>
      
        
  
        <Routes>
          <Route  exact path="/" element={<BlogSpot />} />
          <Route path="/Real" element={<BlogList />} />
          <Route path="/Add" element={<AddBlog />} />
          <Route path="/login" element={<LoginBlog />} />
          <Route path="/readmore/:individualBlogId" element={<ReadMore />} />
        </Routes>
        <Footer/>
      </Provider>
    </div>
  );
}

export default App;
