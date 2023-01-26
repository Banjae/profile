import { Route } from "react-router-dom";
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
      <Header />
      <Route exact path="/">
        <Visual />
        <Content />
      </Route>
      {/* <Route path="/department">
        <Department />
      </Route> */}
      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/join" component={Join} />
      <Route path="/location" component={Location} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/gallery" component={Gallery} />
      <Footer />
    </>
  );
}

export default App;
