const BmiRes = (props) => {
  const { weight, height } = props;
  let resultDOM = null;

  const res = Math.floor((weight / Math.pow(height / 100, 2)) * 100) / 100;

  res < 18.5
    ? (resultDOM = <span className="under">{res} 體重過輕</span>)
    : res > 18.5 && res < 24
    ? (resultDOM = <span className="normal">{res} 正常範圍</span>)
    : (resultDOM = <span className="over">{res} 體重過重</span>);

  return (
    <>
      {weight && height && weight !== "0" && height !== "0" ? (
        <>
          <div className="border bg-dark text-light p-3 rounded-3 hover-gradient">
            <p className="m-1">{height} 公分</p>
            <p className="m-1">{weight} 公斤</p>
            <p className="m-0">你的BMI值為 : {resultDOM}</p>
          </div>
        </>
      ) : (
        <p>請輸入完整的身高及體重</p>
      )}
    </>
  );
};

export default BmiRes;
