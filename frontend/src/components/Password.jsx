export default function () {
  return (
    <div className="w-full max-w-sm min-w-[200px] relative">
      <input
        type="password"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder="Գաղտնաբառ"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
      >
        {/* <!-- Eye Icon (View Password) --> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.067 12.064c.269.458.552.883.84 1.28l.94 1.233c.96 1.272 2.067 2.378 3.328 3.315C9.407 19.34 11.666 20 12 20s2.593-.66 4.825-2.176c1.261-.937 2.368-2.043 3.328-3.315l.94-1.233c.288-.397.571-.822.84-1.28M2 12c.269-.458.552-.883.84-1.28l.94-1.233c.96-1.272 2.067-2.378 3.328-3.315C9.407 4.66 11.666 4 12 4s2.593.66 4.825 2.176c1.261.937 2.368 2.043 3.328 3.315l.94 1.233c.288.397.571.822.84 1.28M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      </button>
    </div>
  );
}
