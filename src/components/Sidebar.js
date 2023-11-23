import SidebarItem from "./SidebarItem"
import items from "../data/sidebar.json"
import title from './title.png'
import '../index.css'

export default function Sidebar({children}) {
  return (
    <div className="overall-sidebar">
      <div className="navbar">
        <img src={title} alt="" />
      </div>

      <div className="sidebar_bottom">
        <div className="sidebar">
          {items.map((item, index) => <SidebarItem key={index} item={item} />)}
        </div>
        <div className="data_display">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Error at ex facilis assumenda nulla vero illo incidunt laudantium, corporis quasi eius alias impedit molestias similique voluptatibus illum modi tempora eaque? */}
          {children}
        </div>
      </div>
    </div>
  )
}