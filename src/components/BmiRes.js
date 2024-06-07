const BmiRes = (props) => {
  const { weight, height } = props;
  let resultDOM = null;

  const res = Math.floor((weight / Math.pow(height / 100, 2)) * 100) / 100;

  // 判斷 BMI 所屬範圍並設定對應的 resultDOM
  if (res < 18.5) {
    resultDOM = (
      <>
        <span className="under fs-4 fw-bold mb-4">{res}</span>
        <p className="fs-4 fw-bold mb-4">
          {" "}
          「體重過輕」，需要多運動，均衡飲食，以增加體能，維持健康！
        </p>
      </>
    );
  } else if (res >= 18.5 && res < 24) {
    resultDOM = (
      <>
        <span className="normal fs-4 fw-bold mb-4">{res} </span>
        <p className="fs-4 fw-bold mb-4">恭喜！「健康體重」，要繼續保持！</p>
      </>
    );
  } else if (res >= 24 && res < 27) {
    resultDOM = (
      <>
        <span className="over fs-4 fw-bold mb-4">{res}</span>
        <p className="fs-4 fw-bold mb-4">
          「體重過重」了，要小心囉，趕快力行「健康體重管理」！
        </p>
      </>
    );
  } else if (res >= 27 && res < 30) {
    resultDOM = (
      <>
        <span className="mild-obesity fs-4 fw-bold mb-4">{res}</span>
        <p className="fs-4 fw-bold mb-4">
          輕度肥胖，需要立刻力行「健康體重管理」囉！
        </p>
      </>
    );
  } else if (res >= 30 && res < 35) {
    resultDOM = (
      <>
        <span className="moderate-obesity fs-4 fw-bold mb-4">{res}</span>
        <p className="fs-4 fw-bold mb-4">
          中度肥胖，需要立刻力行「健康體重管理」囉！
        </p>
      </>
    );
  } else if (res >= 35) {
    resultDOM = (
      <>
        <span className="severe-obesity fs-4 fw-bold mb-4">{res}</span>
        <p className="fs-4 fw-bold mb-4">
          重度肥胖，需要立刻力行「健康體重管理」囉！
        </p>
      </>
    );
  }

  return (
    <>
      {weight && height && weight !== "0" && height !== "0" ? (
        <>
          <div className="border bg-dark text-light p-3 rounded-3 hover-gradient my-4">
            <h3 className="text-center fw-bolder mb-4">BMI 計算結果</h3>

            <p className="m-1 d-inline-block">您是 {height}公分</p>
            <p className="m-1 d-inline-block">，{weight} 公斤</p>
            <div className="m-0">你的 BMI 值為 : {resultDOM} </div>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default BmiRes;
