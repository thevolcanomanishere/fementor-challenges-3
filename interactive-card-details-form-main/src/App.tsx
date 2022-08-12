import React, { Fragment, useEffect, useRef, useState } from "react";
import BgDesktopGradient from "../public/bg-main-desktop.png";
import BgMobileGradient from "../public/bg-main-mobile.png";
import CardFront from "../public/bg-card-front.png";
import CardBack from "../public/bg-card-back.png";
import { Transition } from "@headlessui/react";
import autoAnimate from "@formkit/auto-animate";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationDateMonth: "",
    expirationDateYear: "",
    cvv: "",
  });
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [showMonthIsEmpty, setShowMonthIsEmpty] = useState(false);
  const [showCvvIsEmpty, setShowCvvIsEmpty] = useState(false);
  const [showNameIsEmpty, setShowNameIsEmpty] = useState(false);
  const [showCardIsEmpty, setShowCardIsEmpty] = useState(false);
  const [showYearIsEmpty, setShowYearIsEmpty] = useState(false);
  const startOfCardNumber = creditCardNumber.slice(
    0,
    creditCardNumber.length - 1
  );
  const endOfCardNumber = creditCardNumber.slice(
    creditCardNumber.length - 1,
    creditCardNumber.length
  );

  console.log(creditCardNumber);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const showNameValidation = formData.name.length > 1 ? true : false;
  const nameValid = formData.name.length > 3 ? true : false;

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
          setShowCvvIsEmpty(false);
          break;
        }
      case "expirationDateMonth":
        if (e.target.value.length >= 2) {
          e.target.value = e.target.value.slice(0, 2);
          setShowMonthIsEmpty(false);
          break;
        }
      case "expirationDateYear":
        if (e.target.value.length >= 2) {
          e.target.value = e.target.value.slice(0, 2);
          setShowYearIsEmpty(false);
          break;
        }
      default:
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate mastercard and visa with regex
  const validateCreditCard = () => {
    const cardNumber = formData?.cardNumber.split(" ").join("");
    const regex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    return regex.test(cardNumber);
  };

  const renderCreditCardValidation = () => {
    if (formData.cardNumber.length < 18)
      return <p className="invisible mt-2 text-sm">👏</p>;
    if (validateCreditCard()) {
      return (
        <p className="mt-2 text-sm font-light opacity-0 transition-opacity duration-1000 delay-[2000ms]">
          Looks good 👏
        </p>
      );
    } else {
      return (
        <p className="mt-2 text-sm font-light text-red-400">
          Not a valid card number 🤔
        </p>
      );
    }
  };

  const handleConfirm = () => {
    // Check if formdata fields are filled
    if (formData.name.length < 3) {
      setShowNameIsEmpty(true);
    }
    if (formData.cardNumber.length < 18) {
      setShowCardIsEmpty(true);
    }
    if (formData.expirationDateMonth.length < 2) {
      setShowMonthIsEmpty(true);
    }
    if (formData.expirationDateYear.length < 2) {
      setShowYearIsEmpty(true);
    }
    if (formData.cvv.length < 3) {
      setShowCvvIsEmpty(true);
    }
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
            <img className="animate" src={CardFront} alt="" />
            <div className="flex flex-row items-center absolute top-36 left-6">
              {creditCardNumber
                .split("")
                .filter((c) => c != " ")
                .map((c, i) => (
                  <Transition
                    as={Fragment}
                    show
                    appear
                    enter="transform transition duration-[400ms]"
                    enterFrom="opacity-0 rotate-[-120deg] scale-50"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                  >
                    <span
                      className={`text-3xl tracking-widest text-white ${
                        (i + 1) % 4 === 0 ? "mr-2" : ""
                      }`}
                    >
                      {c}
                    </span>
                  </Transition>
                ))}
            </div>

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
              {showNameValidation ? (
                nameValid ? (
                  <p className="mt-2 mb-1 text-sm font-light text-black opacity-0 transition-opacity duration-1000 delay-[2000ms]">
                    Looks good 👍
                  </p>
                ) : (
                  <p className="mt-2 mb-1 text-sm font-light text-red-400">
                    You must enter your name
                  </p>
                )
              ) : (
                <p className="invisible mt-2 mb-1 text-sm">Invisible div</p>
              )}
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
              {renderCreditCardValidation()}
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
                    className="capitalize border w-[90px] rounded-lg min-h-[50px] focus:ring-[#8B7A94] focus:mb-[1px]  focus:border-none focus:ring-2 focus:outline-none pl-2"
                    name="expirationDateMonth"
                    type="number"
                    maxLength={2}
                    pattern="[0-9]*"
                    onChange={handleFormChange}
                  />
                  {showMonthIsEmpty ? (
                    <p className="absolute mt-2 text-sm font-light text-red-400 w-36 top-12">
                      Can't be blank
                    </p>
                  ) : (
                    <p className="invisible absolute mt-2 text-sm font-lighw-36 top-12">
                      Invisible div
                    </p>
                  )}
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
                  {showCvvIsEmpty ? (
                    <p className="mt-2 text-sm font-light text-red-400">
                      Can't be blank
                    </p>
                  ) : (
                    <p className="invisible mt-2 text-sm font-light text-red-400">
                      Invisible div
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleConfirm()}
              className="bg-[#1F0B2E] text-white p-3 rounded-lg mt-4"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
