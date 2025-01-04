import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Bienvenue</h2>
          <p className="text-sm text-gray-500">Gérez votre centrale à béton</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-500" />
          </button>
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="text-sm font-medium">AB</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;