import Input from "./Input.js";
import BmiRes from "./BmiRes.js";
import { useReducer } from "react";

export default function Bmi() {
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => {
      console.log("state");
      console.log(state);
      console.log("newState");
      console.log(newState);

      return { ...state, ...newState };
    },
    { height: "", weight: "" }
  );

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setInputValues({ [name]: value });
  };

  return (
    <div className="bmi">
      <h3 className="fw-bolder mb-4">BMI 計算機</h3>
      <p className="text-muted mb-4">
        世界衛生組織建議以身體質量指數 (Body Mass Index, BMI) 來衡量肥胖程度。
      </p>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div>
              <p>輸入你的身體數值，掌握健康狀況，開啟健康新生活</p>
              <p>
                BMI = 體重 (公斤) / 身高<sup>2</sup> (公尺<sup>2</sup>)
              </p>
            </div>

            <div>
              <Input
                label={"身高"}
                id="height"
                name="height"
                min={0}
                hint={"輸入你的身高 cm"}
                type={"number"}
                onChange={handleOnChange}
                value={inputValues.height}
                className="form-control"
              />
              <br />
            </div>
            <div>
              <Input
                label={"體重"}
                id="weight"
                name="weight"
                min={0}
                hint={"輸入你的體重 kg"}
                type={"number"}
                onChange={handleOnChange}
                value={inputValues.weight}
                className="form-control"
              />
              <br />
            </div>
            {/* 清除按鈕 */}
            {/* 加上判斷，INPUT 有值時顯示清除按鈕 */}
            {inputValues.height || inputValues.weight ? (
              <button
                className="btn btn-outline-secondary btn-sm float-end"
                onClick={() => setInputValues({ height: "", weight: "" })}
              >
                重新計算
              </button>
            ) : null}
          </div>
          <div className="col-md-6">
            <table className="table table-bordered  text-center">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "100px" }}></th>
                  <th style={{ width: "150px" }}>
                    身體質量指數 (BMI)
                    <br />
                    (kg/m²)
                  </th>
                  <th style={{ width: "150px" }}>
                    腰圍
                    <br />
                    (cm)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bg-info text-white">體重過輕</td>
                  <td>BMI ＜ 18.5</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className="bg-info text-white">正常範圍</td>
                  <td>18.5 ≦ BMI ＜ 24</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className="bg-info text-white">異常範圍</td>
                  <td>
                    <div>
                      過重：24 ≦ BMI ＜ 27
                      <br />
                      輕度肥胖：27 ≦ BMI ＜ 30
                      <br />
                      中度肥胖：30 ≦ BMI ＜ 35
                      <br />
                      重度肥胖：BMI ≧ 35
                    </div>
                  </td>
                  <td>
                    男性：≧ 90公分
                    <br />
                    女性：≧ 80公分
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="fs-6 float-end m-0">資料來源：衛生福利部國民健康署</p>
          </div>
        </div>
        <BmiRes weight={inputValues.weight} height={inputValues.height} />
      </div>
    </div>
  );
}
