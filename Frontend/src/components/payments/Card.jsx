import React from "react";

const Card = ({ title, Icon, description, onClick }) => {
  return (
    <div className="cursor-pointer transition-all shadow-md duration-300 border-2 border-gray-400 rounded-2xl hover:bg-gray-200 " onClick={onClick}>
      <div className="p-4 text-center">
        <Icon className="w-6 h-6 mx-auto mb-2 "/>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-muted-foreground text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default Card;
