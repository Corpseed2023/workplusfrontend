import React from "react"

const CmBtn = ({ className = "", data, icon, ...props }) => {
  return (
    <button className={`cm-btn-one ${className}`} {...props}>
     {icon} {data}
    </button>
  )
}

export default CmBtn


