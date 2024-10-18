import React from 'react';

const empView = () => {

    return (

<div>
<FormTemplate
  onNext={handleContinue}
  onPrevious={handlePrevious}
  heading={`${category}`}
  submit="Submit"
  showApplicationId
  applicationId={applicationId}
>
  <div>
    {/* Summary Download Button */}
    <div className="flex justify-between print:hidden">
      <h1 className=" font-bold text-lg">Summary</h1>
      <PDFDownloadLink
        document={
          <SummaryDocument
            questionsWithAnswers={questionsWithAnswers}
            equipmentList={equipmentList}
            hours={hours}
            attachment={attachment}
            address={address}
            applicationId={applicationId}
            placename={placeName}
            county={county}
            org_name={orgName}
            category={category}
          />
        }
        fileName={`${applicationId}.pdf`}
        className="Download flex items-center justify-center gap-2 p-2 bg-blue-500 text-sm mr-8 text-white text-button w-28 focus:scale-110 focus:bg-opacity-90 rounded"
      >
        <img src={downloadicon} className="w-4 h-4"></img>
        Download{" "}
      </PDFDownloadLink>
    </div>
  </div>

  {/* Place, Address & Organization Section */}
  <table className="w-full text-left mt-5 mb-4">
    <thead>
      <th className=" w-1/6">
        <span className="flex gap-2 text-gray-300 text-sm font-normal">
          <img src={locationicon} />
          Place
        </span>
      </th>
      <th className=" w-1/2 ">
        <span className="flex gap-2 text-gray-300 text-sm font-normal">
          <img src={locationicon} />
          Address
        </span>
      </th>
      <th className=" w-1/4">
        <span className="flex gap-2 text-gray-300 text-sm font-normal">
          <img src={organizationicon} />
          Organization
        </span>
      </th>
    </thead>
    <tr>
      <td className="py-3">{placeName}</td>
      <td>{address}</td>
      <td>{orgName}</td>
    </tr>
  </table>

  {/* Questions Section */}
  <div className="bg-highlight rounded-md mr-8">
    <p className="font-semibold text-headerbg text-lg mb-4">Questions</p>
    <div className="overflow-hidden border border-gray-400 rounded-lg ">
      <table className="table-auto w-full ">
        <tbody>
            return (
              <tr>
                <td className="p-2  w-3/4 border-b border-gray-400">
                  <p className="font-normal p-2">
                    county </p>
                </td>
                <td className="border-b border-gray-400">
                  <p className=" w-1/6 ml-8 font-semibold">answer</p>
                </td>
                <td
                  className={`border-b border-gray-400 ml-10 ${
                    isEditable ? "cursor-pointer" : "cursor-not-allowed"
                  } `}
                  style={{ width: "72px" }}
               
                >
                  <img
                    src={editicon}
                    className="h-5 w-5"
                    style={{
                      filter: isEditable ? "none" : "grayscale(100%)",
                      opacity: isEditable ? 1 : 0.5,
                    }}
                  />
                </td>
              </tr>
            );
        </tbody>
      </table>
    </div>
  </div>
  {/* Attachments Section */}
  <div className="bg-highlight mt-4 rounded-md mr-8">
    <p className="font-semibold text-headerbg text-h2 mb-4">Attachments</p>
    <div className="overflow-x-auto border border-gray-400 rounded-lg ">
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="px-4 py-4 border-b border-gray-400 w-8/12">
              <p className="">Dust Control</p>
            </td>
            <td className="px-4 py-4  border-b border-gray-400  w-3/12">
              {attachment["Dust_Control"]?.name ? (
                <a
                  href={attachment["Dust_Control"]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-500 ml-20"
                >
                  {attachment["Dust_Control"]?.name}
                </a>
              ) : (
                <span>No document attached</span>
              )}
            </td>
            <td
              className="px-4 py-4  border-b border-gray-400 w-1/12 cursor-pointer"
              onClick={() => handleEdit(17)}
            >
              <img src={editicon} className="h-5 w-5" />
            </td>
          </tr>
          {county !== "Pima" && attachment["OM"] && (
            <tr>
              <td className="px-4 py-4 w-8/12">
                <p className="">O&M</p>
              </td>
              <td className="px-4 py-4 text-blue-500 w-3/12">
                {attachment["OM"]?.name ? (
                  <a
                    href={attachment["OM"]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline ml-20"
                  >
                    {attachment["OM"]?.name}
                  </a>
                ) : (
                  <span>No document attached</span>
                )}
              </td>
              <td
                className="px-4 py-4 w-1/12 cursor-pointer"
                onClick={() => handleEdit(18)}
              >
                <img src={editicon} className="h-5 w-5" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  {/* Equipment Section */}
  <div className="bg-highlight mt-6 rounded-md">
    <p className="font-semibold text-headerbg text-h2 mb-4">Equipment List</p>
    <div className="flex justify-between">
      <p className=" mt-1 mb-3">What are your equipment details?</p>
      <img
        src={editicon}
        className="h-5 w-5 mr-20 cursor-pointer"
        onClick={() => handleEdit(14)}
      />
    </div>
    <div className="border border-gray-400 rounded-lg mr-10">
      <div className=" overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white custom-scrollbar h-full">
        <table className="table-auto w-full">
          <thead className="bg-gray-20 w-full m-2">
            <tr className="text-button text-sm text-left">
              <th className="px-4 py-4 border-b border-gray-400">
                Equipment Type
              </th>
              <th className="px-4 py-2 border-b border-gray-400">
                Max Rated Capacity
              </th>
              <th className="px-4 py-2 border-b border-gray-400">Unit</th>
              <th className="px-4 py-2 border-b border-gray-400">Make</th>
              <th className="px-4 py-2 border-b border-gray-400">
                Model
              </th>
              <th className="px-4 py-2 border-b border-gray-400">
                Serial ID
              </th>
              <th className="px-4 py-2 border-b border-gray-400">
                Date of Manufacturing
              </th>
            </tr>
          </thead>
          <tbody className="text-button m-2">
            {equipmentList.map((equipment, index) => (
              <tr key={index}>
                <td className="border-b border-gray-400 px-4 py-5 text-left">
                  {equipment.equipment_type}
                </td>
                <td className="border-b border-gray-400 px-4 py-2 text-left">
                  {equipment.maximum_rated_capacity}
                </td>
                <td className="border-b border-gray-400 px-4 py-2 text-left">
                  {equipment.unit}
                </td>
                <td className="border-b border-gray-400 px-4 py-2 text-left">
                  {equipment.make}
                </td>
                <td className="border-b border-gray-400 px-4 py-2 text-left">
                  {equipment.model}
                </td>
                <td className="border-b border-gray-400 px-4 py-2 text-left">
                  {equipment.serial_id}
                </td>
                <td className="border-b border-gray-400 px-4 py-2 text-left">
                  {equipment.date_of_mfg}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full sticky">
        <p className="font-semibold text-sm bg-blue-50  w-full p-3">
          Hours of Operation: <span className="mx-2">{hours} hrs</span>
        </p>
      </div>
    </div>
  </div>
  <br />
</FormTemplate>

</div>
    )}


    export default empViewPage;