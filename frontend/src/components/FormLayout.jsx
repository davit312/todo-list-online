export default function FormLayout({ children }) {
  return (
    <div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden m-auto mt-3.5">
        <div className="flex rounded-t-xl overflow-hidden border-b border-gray-200">
          <div className="flex-1 py-3 pl-2 text-lg font-semibold text-gray-700 bg-gray-200"></div>
        </div>
        <p className="p-5 pb-0">Բարի գալուստ միասնական ցուցակների համակարգ։</p>

        {/* <!-- Form Body --> */}
        <div className="p-8 space-y-5">
          <form action="#" method="POST" className="space-y-5">
            {children}
          </form>
        </div>
      </div>
    </div>
  );
}
