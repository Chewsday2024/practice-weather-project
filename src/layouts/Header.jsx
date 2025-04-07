import { Link } from "react-router-dom";








function Header () {
  return (
    <div className="bg-dark p-3 mb-3 text-center">
      <Link to='/weather' className="text-white text-decoration-none fs-1">台南天氣預報練習</Link>
    </div>
  );
};

export default Header;