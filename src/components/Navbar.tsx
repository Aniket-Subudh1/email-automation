import logo from '../assets/logo.png';
const Navbar = () => {
  return (
    <div className="flex fixed justify-center mt-4 top-0 left-0 right-0  z-10">
      <div className="flex items-center border border-black rounded-full shadow-md bg-white px-6 py-2 h-16 w-1/2">
        <img
          src={logo}
          alt="Logo"
          className=" w-14 h-14  mr-2"
        />
        <span className="text-m text-gray-600  font-semibold">
          Email Automation Tool
        </span>
      </div>
    </div>
  );
};

export default Navbar;
