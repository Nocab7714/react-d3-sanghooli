import { useState, useEffect } from "react";

const GoToTopComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="go-to-top position-fixed d-flex align-items-center justify-content-center rounded-circle p-4"
      style={{
        opacity: isVisible ? 1 : 0, // 透明度控制顯示
        visibility: isVisible ? "visible" : "hidden", // 避免透明時仍然可以點擊
      }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <span className="material-symbols-outlined material-filled fs-5">shift</span>
    </div>
  );
};

export default GoToTopComponent;