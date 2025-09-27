import img from "../imgs/stadium-default.jpg";
export function Home() {
  return (
    <div
      style={{
        backgroundColor: "#2c3e50",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        color: "white",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    ></div>
  );
}
