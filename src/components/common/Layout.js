import React from "react";

const Layout = (props) => {
  return (
    <section className={`content ${props.title}`}>
      <figure></figure>
      <div className="inner">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;
