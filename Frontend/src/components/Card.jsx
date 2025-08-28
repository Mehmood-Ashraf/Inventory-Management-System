import React from "react";

const Card = ({ title, subtitle, icon: Icon, iconClass, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
          {Icon && <Icon className={`w-6 h-6 text-gray-500 ${iconClass}`} />}
          <div>
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      )}
      {children && <div className="p-6">{children}</div>}
    </div>
  );
};

export default Card;
