import React from "react";

interface Item {
  name: string;
  href: string;
}

const SideBar = ({ items }: { items: Item[] }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.href}>
          <a role="navigation" href={item.href}>
            {item.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SideBar;