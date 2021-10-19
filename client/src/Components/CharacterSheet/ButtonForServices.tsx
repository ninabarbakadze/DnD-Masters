export default function ButtonForServices() {
  const handleClick = (sevrvice:string) => {
    console.log(sevrvice);
  };
  return (
    <div>
      <button type="button" onClick={() => { handleClick('A'); }}>B</button>
    </div>
  );
}
