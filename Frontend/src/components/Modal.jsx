// import React from 'react';
// import { X } from 'lucide-react';

// const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
//   if (!isOpen) return null;

//   const sizeClasses = {
//     sm: 'max-w-md',
//     md: 'max-w-lg',
//     lg: 'max-w-2xl',
//     xl: 'max-w-4xl',
//   };

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

//         <div className={`inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:w-full sm:p-6`}>
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-500 transition-colors"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           </div>

//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";
import { X } from "lucide-react";

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        {/* Close button (consumer handle karega) */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-medium text-gray-900">{title}</h1>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
