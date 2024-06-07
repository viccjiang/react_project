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
        輸入你的身體數值，掌握健康狀況，開啟健康新生活
      </p>
      <div>
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
          hint={"輸入你的身高"}
          type={"number"}
          onChange={handleOnChange}
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
          hint={"輸入你的體重"}
          type={"number"}
          onChange={handleOnChange}
          className="form-control"
        />
        <br />
      </div>
      <BmiRes weight={inputValues.weight} height={inputValues.height} />
    </div>
  );
}
