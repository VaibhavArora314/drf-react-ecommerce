import React from "react";

function Rating({color,text,value}) {
  return <div className="rating">
    <Star color={color} base={0} value={value}/>
    <Star color={color} base={1} value={value}/>
    <Star color={color} base={2} value={value}/>
    <Star color={color} base={3} value={value}/>
    <Star color={color} base={4} value={value}/>
    <span>{text}</span>
  </div>;
}

export default Rating;

function Star({color,base, value}) {
  return <span>
    <i style={{color}} className={
        value >= base + 1 ? 'fas fa-star' :
        value >= base + 0.5 ? 'fas fa-star-half-alt' :
        'far fa-star'
    }></i>
  </span>;
}
