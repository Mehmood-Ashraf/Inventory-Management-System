import { useNavigate } from "react-router-dom";

export default function Topbar() {
    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate('/login')
    }
  return (
    <div className="w-full bg-black shadow py-4 text-white flex justify-around items-center">
      <h1 className="text-2xl font-semibold">
        Salman Mobile Wholesale Accounts & Invoicing
      </h1>
      <button className="bg-white px-3 text-black py-1.5 rounded-xl text-lg cursor-pointer hover:bg-gray-200" onClick={navigateToLogin}>
        Login
      </button>
    </div>
  );
}
