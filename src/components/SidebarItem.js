import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function SidebarItem({ item }) {

    const [open, setOpen] = useState(false)
    return (
        <div className={open ? "sidebar-item open" : "sidebar-item"}>
            <div className="sidebar-title">
                <span>
                    {item.icon && <i className={item.icon}></i>}
                    {item.title}
                </span>
                <i className="bi-chevron-up toggle-btn" onClick={() => setOpen(!open)}></i>
            </div>
            <div className="sidebar-content">
                {open ?
                    <NavLink to={item.childrens.path} className="sidebar-item plain">
                        {item.childrens.icon && <i className={item.childrens.icon}></i>}
                        {item.childrens.title}
                    </NavLink> : ""}
            </div>
        </div>
    )
}