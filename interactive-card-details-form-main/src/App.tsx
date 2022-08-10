import React, { useEffect, useState } from "react";
import BgDesktopGradient from "../public/bg-main-desktop.png";
import BgMobileGradient from "../public/bg-main-mobile.png";
import CardFront from "../public/bg-card-front.png";
import CardBack from "../public/bg-card-back.png";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDateMonth: "",
    expirationDateYear: "",
    cvv: "",
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
    switch (e.target.name) {
      case "cvv":
        if (e.target.value.length >= 3) {
          e.target.value = e.target.value.slice(0, 3);
          break;
        }
      case "expirationDateMonth":
        if (e.target.value.length >= 2) {
          e.target.value = e.target.value.slice(0, 2);
          break;
        }
      case "expirationDateYear":
        if (e.target.value.length >= 2) {
          e.target.value = e.target.value.slice(0, 2);
          break;
        }
      default:
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="flex items-center justify-center h-screen overflow-hidden">
      <div className="relative flex flex-col w-full h-full lg:flex-row">
        <img
          className="hidden h-full lg:block"
          src={BgDesktopGradient}
          alt=""
        />
        <img className="h-1/3 lg:hidden" src={BgMobileGradient} alt="" />
        <div className="absolute top-[20%] left-[8%]">
          <div className="relative">
            <img className="" src={CardFront} alt="" />
            <span className="absolute text-3xl tracking-widest text-white top-36 left-6">
              {creditCardNumber}
            </span>
            <span className="absolute text-lg text-white uppercase bottom-6 left-6">
              {formData.name}
            </span>
            <span className="absolute text-lg text-white uppercase bottom-6 right-6">
              {formData.expirationDateMonth}
              {formData.expirationDateMonth && <span>/</span>}
              {formData.expirationDateYear}
            </span>
            <div className="absolute w-12 h-12 bg-white rounded-full top-6 left-6" />
            <div className="absolute top-[36px] left-[88px] rounded-full h-6 w-6 border border-white" />
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
              <label className="mb-2 uppercase" htmlFor="name">
                Cardholder Name
              </label>
              <input
                className="border rounded-lg p-3 focus:ring-[#8B7A94] focus:m-[1px] focus:border-none focus:ring-2 focus:outline-none"
                name="name"
                type="text"
                onChange={handleFormChange}
              />
              <p className="mt-2 mb-1 text-sm font-light text-red-400">
                You must enter your name
              </p>
            </div>
            <div className="flex flex-col mb-6 ">
              <label className="mb-2 uppercase" htmlFor="card-number">
                Card Number
              </label>
              <input
                className="border rounded-lg p-3 focus:ring-[#8B7A94] focus:m-[1px] focus:border-none focus:ring-2 focus:outline-none"
                name="cardNumber"
                type="text"
                onChange={handleFormChange}
                value={handleCardDisplay()}
                maxLength={20}
              />
              <p className="mt-2 text-sm font-light text-red-400">
                Wrong format, numbers only
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <label
                  className="mb-2 tracking-wide uppercase"
                  htmlFor="exp-date-month"
                >
                  Exp. Date (MM/YY)
                </label>
              </div>
              <div className="relative flex flex-row w-full space-x-1">
                <div className="relative flex flex-col">
                  <input
                    className="capitalize border w-[90px] rounded-lg min-h-[50px] focus:ring-[#8B7A94] focus:mb-[1px] focus:mt-[1px] focus:border-none focus:ring-2 focus:outline-none pl-2"
                    name="expirationDateMonth"
                    type="number"
                    maxLength={2}
                    pattern="[0-9]*"
                    onChange={handleFormChange}
                  />
                  <p className="absolute mt-2 text-sm font-light text-red-400 w-36 top-12">
                    Can't be blank
                  </p>
                </div>

                <input
                  className="capitalize border w-[90px] rounded-lg focus:ring-[#8B7A94] focus:mb-[1px] focus:mt-[1px] focus:border-none focus:ring-2 focus:outline-none max-h-[50px] pl-2"
                  name="expirationDateYear"
                  type="number"
                  maxLength={2}
                  pattern="[0-9]*"
                  onChange={handleFormChange}
                />
                <div className="flex flex-col w-full">
                  <label className="absolute left-[187px] -top-8" htmlFor="cvc">
                    CVC
                  </label>
                  <input
                    className="capitalize border rounded-lg focus:ring-[#8B7A94] focus:mx-[1px] focus:border-none focus:ring-2 focus:outline-none min-h-[50px] pl-2"
                    name="cvv"
                    type="number"
                    maxLength={3}
                    pattern="[0-9]*"
                    onChange={handleFormChange}
                  />
                  <p className="invisible mt-2 text-sm font-light text-red-400">
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
