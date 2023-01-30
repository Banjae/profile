import { Route, Switch } from "react-router-dom";
// common
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
// main
import Visual from "./components/main/Visual";
import Content from "./components/main/Content";
// sub
import Department from "./components/sub/Department";
import Community from "./components/sub/Community";
import Join from "./components/sub/Join";
import Location from "./components/sub/Location";
import Youtube from "./components/sub/Youtube";
import Gallery from "./components/sub/Gallery";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {/* 라우터 값에 따라서 Header props로 type="main" */}
          <Header type={"main"} />
          <Visual />
          <Content />
        </Route>
        {/* 라우터에 따라 header css 달리하겠다 */}
        {/* <Header type={"sub"} /> */}
        <Route path="/" render={() => <header type={"sub"} />} />
      </Switch>

      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/location" component={Location} />
      <Route path="/join" component={Join} />

      <Footer />
    </>
  );
}

export default App;
