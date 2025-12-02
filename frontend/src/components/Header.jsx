import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-200 text-white flex items-center justify-center h-16">
      <p className="text-2xl text-gray-800 font-semibold">
        <Link to="/">📝 ToDo List Online 🌐</Link>
      </p>
    </header>
  );
}
