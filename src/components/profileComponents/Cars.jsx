import React from "react";
import { Input, Button } from "@material-tailwind/react";

function Cars() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div className="flex justify-end mt-8">
        <Button variant="gradient" onClick={() => setShowModal(true)}>
          Add Car
        </Button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-center px-28 py-6 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-normal  uppercase">
                    Add a new car
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 mx-4">
                  <form className="mt-4 mb-2">
                    <div className="mb-4">
                      <Input
                        size="lg"
                        label="Car name"
                        name="name"
                        type="text"
                        pattern="[A-Za-z]{3,}"
                        title="Please enter at least 3 letters"
                        required
                      />
                    </div>

                    <div className="mb-4">
                    <Input
                      size="lg"
                      label="Brand"
                      name="brand"
                      type="text"
                      pattern="[A-Za-z]{3,}"
                      title="Please enter at least 3 letters"
                      required
                    />
                     </div>

                     <div className="mb-4">
                     <Input
                      size="lg"
                      label="Rent per hour"
                      name="rent"
                      type="number"
                      pattern="[A-Za-z]{3,}"
                      required
                    /> 
                      </div>

                      <Input
                      size="lg"
                      label="Car image"
                      name="image"
                      type="text"
                      required
                    /> 

                    <select className="mt-4" required>
                    <option value="">Select fuel type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Petrol">Diesel</option>
                      <option value="Petrol">Electric</option>
                      <option value="Petrol">Hybrid</option>
                    </select>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Cars;
