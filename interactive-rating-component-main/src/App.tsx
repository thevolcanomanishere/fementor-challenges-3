import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import ThankYou from "./components/ThankYou";
const App = () => {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(1);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <main ref={parent} className="grid h-screen place-items-center">
      {step === 1 && (
        <div className="flex justify-between space-y-6 flex-col max-w-[420px] max-h-[420px] rounded-3xl p-8 bg-[#1E232C] text-white mx-6">
          <div className="h-12 w-12 p-4 bg-[#262B34] rounded-full">
            <svg width="17" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m9.067.43 1.99 4.031c.112.228.33.386.58.422l4.45.647a.772.772 0 0 1 .427 1.316l-3.22 3.138a.773.773 0 0 0-.222.683l.76 4.431a.772.772 0 0 1-1.12.813l-3.98-2.092a.773.773 0 0 0-.718 0l-3.98 2.092a.772.772 0 0 1-1.119-.813l.76-4.431a.77.77 0 0 0-.222-.683L.233 6.846A.772.772 0 0 1 .661 5.53l4.449-.647a.772.772 0 0 0 .58-.422L7.68.43a.774.774 0 0 1 1.387 0Z"
                fill="#FC7614"
              />
            </svg>
          </div>
          <h1 className="text-3xl">How did we do?</h1>
          <p className="text-[#959EAC]">
            Please let us know how we did with your support request. All
            feedback is appreciated to help us improve our offering!
          </p>
          <div className="flex flex-row items-center justify-between w-full h-12 my-24 align-middle select-none">
            {[1, 2, 3, 4, 5].map((rating) => {
              const baseStyle =
                "flex h-12 w-12 delay-50 transition-colors hover:bg-[#FB7413] hover:text-white rounded-full cursor-pointer select-none";
              if (selected === rating) {
                return (
                  <div
                    onClick={() => setSelected(rating)}
                    className={`${baseStyle} bg-[#959EAC] text-white`}
                  >
                    <p className="m-auto">{rating}</p>
                  </div>
                );
              }
              return (
                <div
                  onClick={() => setSelected(rating)}
                  className={`${baseStyle} bg-[#262B34] text-[#959EAC]`}
                >
                  <p className="m-auto">{rating}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={selected === 0}
            className="w-full uppercase bg-[#FB7413] disabled:bg-slate-500 disabled:active:text-white active:bg-white active:text-[#FB7413] rounded-full mt-10"
          >
            <p className="p-2">Submit</p>
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="flex justify-between align-middle space-y-6 flex-col max-w-[420px] max-h-[420px] rounded-3xl p-8 m-8 bg-[#1E232C] text-white">
          <div className="m-auto">
            <ThankYou />
          </div>
          <p className="text-center m-auto w-fit text-[#FB7413] self-center px-4 py-1 bg-[#282E37] rounded-full">
            You selected {selected} out of 5
          </p>

          <h1 className="text-3xl text-center">Thank you!</h1>
          <p className="text-[#959EAC] text-center">
            We appreciate you taking the time to give a rating. If you ever need
            more support, don't hesitate to get in touch!
          </p>
        </div>
      )}
    </main>
  );
};

export default App;
