export default function Button({ children, type }) {
  return (
    <button
      type={type}
      className="w-full py-4 text-lg font-semibold text-white bg-slate-500 rounded-xl shadow-lg hover:bg-primary-blue transition duration-300 mt-4"
    >
      {children}
    </button>
  );
}
