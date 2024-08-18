import React, { useEffect, useState } from "react";
import UploadRoom from "../components/uploadRoom";
import SummaryApi from "../common";
import AdminRoomCard from "../components/AdminRoomCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AllRooms = () => {
  const [openUploadRoom, setOpenUploadRoom] = useState(false);
  const [allRoom, setAllRoom] = useState([]);

  const fetchAllRoom = async () => {
    try {
      const response = await fetch(SummaryApi.allRoom.url);
      const dataResponse = await response.json();
      console.log("Room data", dataResponse);
      setAllRoom(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all rooms:", error);
    }
  };

  useEffect(() => {
    fetchAllRoom();
  }, []);

  // Function to handle generating the report
   // Function to handle generating the report
   const handleGenerateReport = () => {
    // Logic to generate report goes here
    console.log("Generating report...");

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Get the total room count
    const roomCount = allRoom.length;

    // Add room count to the PDF
    pdf.text(`Total Rooms: ${roomCount}`, 10, 10);

    // Convert the component to canvas using html2canvas
    html2canvas(document.getElementById("roomTable")).then((canvas) => {
      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png");

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 10, 20, 180, 160);

      // Save the PDF
      pdf.save("room_report.pdf");
    });
  };
  return (
    <div className="pt-12">
      <div className="bg-black px-5 py-2 flex justify-between items-center">
        <h2 className="font-bold text-lg text-white">All Room</h2>
        <button
          className="border-2 py-2 px-4 text-sm text-white"
          onClick={() => setOpenUploadRoom(true)}
        >
          Add Room
        </button>
        <button
            className="border-2 py-2 px-4 text-sm text-white"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
      </div>

      {/* all package show*/}
      {/* overflow-y-scroll [calc(100vh-0px)]*/}
      <div className="">
        <section className="pt-20 pb-10 h-full overflow-y-scroll" id="roomTable">
          <div className="container">
            <div className="">
              <div className="col">
                <div className="woocommerce">
                  <div className="cart-product-wrap">
                    <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                      <tbody>
                        <tr>
                        <td className="">Room Image</td>
                          <td className="">Room Number</td>
                          <td className="">Category</td>
                          <td className="">Air conditioning</td>
                          <td className="">Beds</td>
                          <td className="">Status</td>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      {allRoom.map((product, index) => {
                        return (
                          <AdminRoomCard
                            data={product}
                            key={index + "allRoom"}
                            fetchdata={fetchAllRoom}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* create room */}
      {openUploadRoom && (
        <UploadRoom
          onClose={() => setOpenUploadRoom(false)}
          fetchdata={fetchAllRoom}
        />
      )}
    </div>
  );
};
export default AllRooms;
