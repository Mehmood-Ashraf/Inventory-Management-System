
export default function Card({ title, value, isButton, onclick }) {
  return (
    <div className="bg-white shadow rounded p-4 flex-1 min-w-[200px] flex flex-col justify-center items-center">
      <h2 className="text-sm text-gray-500 text-center">{title}</h2>
      {isButton ? (
        <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer" onClick={onclick}>
          {value}
        </button>
      ) : (
        <p className="text-xl font-bold mt-1">{value}</p>
      )}
    </div>
  );
}