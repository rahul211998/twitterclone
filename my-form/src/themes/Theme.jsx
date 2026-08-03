import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Theme = () => {
        const [dark, setDark] = useState(true);

  const changeTheme = () => {
    const theme = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    setDark(!dark);
  };
  return (
    <div className="fixed top-5 right-5 z-50">
      {dark ? (
        <FaSun
          size={25}
          className="cursor-pointer"
          onClick={changeTheme}
        />
      ) : (
        <FaMoon
          size={25}
          className="cursor-pointer"
          onClick={changeTheme}
        />
      )}
    </div>
  )
}

export default Theme