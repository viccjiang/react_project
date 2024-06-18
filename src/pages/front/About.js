import Banner from "../../components/Banner";
function About() {
  return (
    <div>
      <Banner />
      <div className="container my-6">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-between py-6">
            <div>
              <h2 className="fw-bolder">關於 FIT her.</h2>
              <h6> 歡迎來到 FIT her.，專為女性打造的身心健身房。</h6>
            </div>
            <p>
              我們堅信健身不僅是一項運動，更是一種積極向上的生活方式。每次鍛煉都是對自我的深情承諾，激發內在潛力。FIT
              her.
              融合現代美學與功能性設計，從柔和色調的裝飾到溫馨的休息區，每一個細節都為女性提供舒適、放鬆的健身環境。我們提供豐富多樣的課程，包括瑜伽、普拉提、高強度間歇訓練等，由經驗豐富的女性教練專業指導。不論您是初學者還是健身愛好者，我們都為您提供個性化的健康計劃，助您達成個人目標。探索
              FIT
              her.，在這裡，我們一起鍛煉，共同創造一個積極、健康、自信的女性社區，攜手迎接更美好的未來。
            </p>
          </div>
          <div className="col-md-6 py-6">
            <img
              className="img-fluid about-img rounded-5"
              src="https://images.unsplash.com/photo-1571019613914-85f342c6a11e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
