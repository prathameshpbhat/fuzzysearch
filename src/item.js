import React from "react";

const Item = (props) => {
  return (
    <div class="grid">
        <article>
    {/* <div className="item"> */}
     
    <div class="text">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
        <p>{props.type}</p>
        <a href={props.url} >Link</a>
        <h5>{props.by}</h5>
      </div>
     
    {/* </div> */}
    </article>
    </div>
  );
};

export default Item;
