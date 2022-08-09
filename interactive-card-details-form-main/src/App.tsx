import React, { useEffect, useState } from "react";
import BgDesktopGradient from "../public/bg-main-desktop.png";
import BgMobileGradient from "../public/bg-main-mobile.png";
import CardFront from "../public/bg-card-front.png";
import CardBack from "../public/bg-card-back.png";

const App = () => {
  const [formData, setFormData] = useState({
    name: "Alex McGonagle",
    cardNumber: "4567890123456789",
    expirationDate: "02/20",
    cvv: "999",
  });
  const [creditCardNumber, setCreditCardNumber] = useState("");

  console.log(formData);

  const handleCardDisplay = () => {
    const rawText = [...formData?.cardNumber.split(" ").join("")];
    //@ts-ignore
    let creditCard = [];
    rawText.forEach((t, i) => {
      if (i % 4 === 0) creditCard.push(" ");
      creditCard.push(t);
    });
    //@ts-ignore
    return creditCard.join("");
  };

  useEffect(() => {
    setCreditCardNumber(handleCardDisplay());
  }, [formData.cardNumber]);

  const handleFormChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full relative">
        <img
          className="h-full hidden lg:block"
          src={BgDesktopGradient}
          alt=""
        />
        <img className="h-1/3 lg:hidden" src={BgMobileGradient} alt="" />
        <div className="absolute top-[20%] left-[8%]">
          <div className="relative">
            <img className="" src={CardFront} alt="" />
            <span className="absolute top-36 left-6 text-white text-3xl tracking-widest">
              {creditCardNumber}
            </span>
            <span className="absolute bottom-6 left-6 text-white text-lg uppercase">
              {formData.name}
            </span>
            <span className="absolute bottom-6 right-6 text-white text-lg uppercase">
              {formData.expirationDate}
            </span>
            <div className="absolute top-6 left-6 rounded-full h-12 w-12 bg-white" />
            <div className="absolute top-[36px] left-20 rounded-full h-6 w-6 border border-white" />
          </div>
        </div>

        <div className="absolute  top-[50%] left-[15%]">
          <div className="relative">
            <img className="" src={CardBack} alt="" />
            <span className="absolute top-[107px] right-12 text-white text-lg uppercase">
              {formData.cvv}
            </span>
          </div>
        </div>

        <div className="m-auto">
          <div className="flex flex-col z-10 max-w-[400px]">
            <div className="flex flex-col">
              <label className="uppercase mb-2" htmlFor="name">
                Cardholder Name
              </label>
              <input
                className="border rounded-lg p-3 border-[#1F0B2E]"
                name="name"
                type="text"
                onChange={handleFormChange}
              />
              <p className="text-red-400 font-light text-sm mt-2 mb-1">
                You must enter your name
              </p>
            </div>
            <div className="flex flex-col mb-6 ">
              <label className="uppercase mb-2" htmlFor="card-number">
                Card Number
              </label>
              <input
                className="capitalize border p-3 rounded-lg border-[#1F0B2E]"
                name="cardNumber"
                type="text"
                onChange={handleFormChange}
                value={handleCardDisplay()}
                maxLength={20}
              />
              <p className="text-red-400 font-light text-sm mt-2">
                Wrong format, numbers only
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <label
                  className="mb-2 uppercase tracking-wide"
                  htmlFor="exp-date-month"
                >
                  Exp. Date (MM/YY)
                </label>
              </div>
              <div className="flex flex-row w-full space-x-1 relative">
                <div className="flex flex-col ">
                  <input
                    className="capitalize border w-[90px] rounded-lg min-h-[50px] border-[#1F0B2E]"
                    id="exp-date-month"
                    type="number"
                  />
                  <p className="text-red-400 font-light text-sm mt-2">
                    Can't be blank
                  </p>
                </div>

                <input
                  className="capitalize border w-[90px] rounded-lg border-[#1F0B2E]  max-h-[50px]"
                  id="exp-date-year"
                  type="number"
                />
                <div className="flex flex-col w-full">
                  <label className="absolute left-[180px] -top-8" htmlFor="cvc">
                    CVC
                  </label>
                  <input
                    className="capitalize border rounded-lg border-[#1F0B2E] min-h-[50px]"
                    id="cvc"
                    type="number"
                  />
                  <p className="text-red-400 font-light text-sm mt-2">
                    Can't be blank
                  </p>
                </div>
              </div>
            </div>

            <button className="bg-[#1F0B2E] text-white p-3 rounded-lg mt-6">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
