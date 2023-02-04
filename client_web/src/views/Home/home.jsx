import React, { useEffect} from "react";
import '../../styles/style.css';
import MainNavbar from "../../components/mainNavbar";

export default function HomePage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#222222";
  }, []);
  return (
    <div>
    <MainNavbar />
  </div>
  );
};