import {
    UserOutlined, DownloadOutlined
} from "@ant-design/icons";
import { saveAs } from "file-saver";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Import html2canvas for taking a screenshot
import { Card, Space, Statistic, Button, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import domtoimage from 'dom-to-image';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [proData, setProData] = useState([]);
    const [TaskStatus, setTaskStatus] = useState([]);
    const chartRef = useRef(null); // Ref for the chart container

    const pendingComplaints = TaskStatus.filter(task => task.status === 'Pending').length;
    const InProgressTask = TaskStatus.filter(task => task.status === 'InProgress').length;
    const CompletedTask = TaskStatus.filter(task => task.status === 'Completed').length;

    const reveneuData = {
        labels: ["Total Employes", "In-Progress", "Pending", "Completed"],
        datasets: [{
            label: "Tasks Performances",
            data: [proData.length, pendingComplaints, InProgressTask, CompletedTask],
            backgroundColor: [
                "#874CCC",   // Employes
                "#FB6D48",   // In-Progress
                "#E72929",   // Pending
                "#4CCD99"    // Completed
            ],
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "EBH Housekeeping Statistics",
            },
        },
    };

    const EmpData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/getemployee');
            setProData(response.data);
        } catch (error) {
            console.log('Error while fetching data:', error);
        }
    };

    const TaskData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/gettask');
            setTaskStatus(response.data);
        } catch (error) {
            console.log('Error while fetching data:', error);
        }
    };

    useEffect(() => {
        EmpData();
        TaskData();
    }, []);

    const handleDownloadReport = async () => {
        const pdf = new jsPDF();
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.text('EBH Housekeeping Report', 10, 15);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        const currentDate = new Date().toLocaleDateString();
        pdf.text(`Date: ${currentDate}`, 10, 25);

        pdf.text("", 10, 40); // Add a blank line for spacing
        pdf.text(`Total Employees: ${proData.length}`, 10, 30);
        pdf.text(`Total Pending Tasks: ${pendingComplaints}`, 10, 45);
        pdf.text(`Total Tasks In Progress: ${InProgressTask}`, 10, 60);
        pdf.text(`Total Tasks Completed: ${CompletedTask}`, 10, 75);

        // Take a screenshot of the dashboard
        const chartContainer = document.getElementById('chart-container');
        const canvas = await html2canvas(chartContainer);
        const imgData = canvas.toDataURL('image/png');

        // Embed the screenshot into the PDF
        pdf.addImage(imgData, 'PNG', 10, 90, 180, 100);
        pdf.save('EBH_Housekeeping_Report.pdf');
    };

    return (
        <>
            <Button
                type="primary"
                icon={<DownloadOutlined />}
                style={{ position: 'absolute', bottom: 10, right: 150, zIndex: 10 }}
                onClick={handleDownloadReport}
            >
                Download Report
            </Button>
            <Space size={20} direction="vertical" style={{ marginLeft: "420px" }}>
                <Typography.Title level={10} color="white" style={{ overflowY: "hidden" }}>EBH Housekeeping</Typography.Title>
                <Space direction="horizontal">
                    <DashboardCard
                        icon={<UserOutlined style={{ color: "white", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                        title={"Total Employes"}
                        value={proData.length}
                    />
                    <DashboardCard
                        icon={<UserOutlined style={{ color: "white", backgroundColor: "red", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                        title={"Total  Pending Task"}
                        value={pendingComplaints}
                    />
                    <DashboardCard
                        icon={<UserOutlined style={{ color: "white", backgroundColor: "orange", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                        title={"Total Task Inprogress "}
                        value={InProgressTask}
                    />
                    <DashboardCard
                        icon={<UserOutlined style={{ color: "white", backgroundColor: "green", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                        title={"Total Task Completed"}
                        value={CompletedTask}
                    />
                </Space>
                <Space>
                    <DashboardChart reveneuData={reveneuData} options={options} />
                </Space>
            </Space>
        </>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function DashboardChart({ reveneuData, options }) {
    return (
        <Card style={{ width: 1000, height: 600 }}>
            <div id="chart-container">
                <Bar options={options} data={reveneuData} />
            </div>
        </Card>
    );
}

export default Dashboard;

// import {
//     UserOutlined, DownloadOutlined
// } from "@ant-design/icons";
// import { saveAs } from "file-saver"
// import jsPDF from 'jspdf';
// import { Card, Space, Statistic, Button, Typography } from "antd";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// import React from "react";
// import { useState,useEffect } from "react";
// import axios from "axios";
// import domtoimage from 'dom-to-image';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Dashboard=()=> {
//     const [proData, setProData] = useState([]);
//     const [TaskStatus, setTaskStatus] = useState([]);

//     const pendingComplaints= TaskStatus.filter(task => task.status === 'Pending').length;
//     const InProgressTask= TaskStatus.filter(task => task.status === 'InProgress').length;
//     const CompletedTask= TaskStatus.filter(task => task.status === 'Completed').length;

//     // console.log("pending task",pendingComplaints);

//     // // const orders = 150; // Example static data
//     // const inventory = 20; // Example static data
//     // const customers = 15; // Example static data
//     // const revenue = 5; // Example static data

//     // const recentOrders = [
//     //     { title: "Product 1", quantity: 2, discountedPrice: 20 },
//     //     { title: "Product 2", quantity: 1, discountedPrice: 15 },
//     //     { title: "Product 3", quantity: 3, discountedPrice: 25 },
//     // ]; // Example static data

//     const reveneuData = {
//         labels: ["Total Employes","In-Progress", "Pending", "Completed"],
//         datasets: [{
//             label:  [
//               "Tasks Performances"
//             ],
//             data: [proData.length, pendingComplaints, InProgressTask, CompletedTask],
//             backgroundColor: [
//                 "#874CCC",   // Employes
//                 // "#51829B",  // Task
//                 "#FB6D48",   // In-Progress
//                 "#E72929", // Pending
//                 "#4CCD99"    // Completed
//             ],
//         }],
//     };
    

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: "bottom",
//             },
//             title: {
//                 display: true,
//                 text: "EBH Housekeeping Statistics",
//             },
//         },
//     };

//     const EmpData = async () => {
//         try {
//           const response = await axios.get('http://localhost:8080/api/v1/getemployee');
//           console.log(response);
//           setProData(response.data);
//           console.log("data is",proData);
//         } catch (error) {
//           console.log('Error while fetching data:', error);
//         }
//       };
//     const TaskData = async () => {
//         try {
//           const response = await axios.get('http://localhost:8080/api/v1/gettask');
//           console.log(response);
//           setTaskStatus(response.data);
//           console.log("data is",proData);
//         } catch (error) {
//           console.log('Error while fetching data:', error);
//         }
//       };
    
//     useEffect(() => {
//         EmpData();
//         TaskData();
//     }, []);

//     const handleDownloadReport = () => {
//         const pdf = new jsPDF();
    
//         // Set properties for the report
//         pdf.setFont('helvetica', 'bold'); // Set font name and style (bold)
//         pdf.setFontSize(16);
    
//         // Add title
//         pdf.text('EBH Housekeeping Report', 10, 15);
    
//         // Set properties for content
//         pdf.setFont('helvetica', 'normal'); // Set font name and style (normal)
//         pdf.setFontSize(12);
    
//         // Add content to the report with proper formatting and spacing
//         pdf.text(`Total Employees: ${proData.length}`, 10, 30);
//         pdf.text(`Total Pending Tasks: ${pendingComplaints}`, 10, 45);
//         pdf.text(`Total Tasks In Progress: ${InProgressTask}`, 10, 60);
//         pdf.text(`Total Tasks Completed: ${CompletedTask}`, 10, 75);
    
//         // Delay capturing process to ensure proper rendering
//         setTimeout(() => {
//             // Add chart image to the report
//             const chartContainer = document.getElementById('chart-container');
//             console.log('Chart container:', chartContainer);
    
//             domtoimage.toPng(chartContainer)
//                 .then(function (dataUrl) {
//                     // Log the dataUrl to inspect
//                     console.log('Chart image data URL:', dataUrl);
    
//                     const imgWidth = 180; // Adjust as needed
//                     const imgHeight = 100; // Adjust as needed
//                     pdf.addImage(dataUrl, 'PNG', 10, 90, imgWidth, imgHeight); // Add chart image to the PDF
//                     pdf.save('EBH_Housekeeping_Report.pdf'); // Save the PDF
//                 })
//                 .catch(function (error) {
//                     console.error('Error generating chart image:', error);
//                 });
//         }, 1000); // Adjust delay as needed
    
//         // Save the PDF
//         pdf.save('EBH_Housekeeping_Report.pdf');
    
//         console.log("download report");
//     };
    
    

//     return (
//         <>
//         <Button
//             type="primary"
//             icon={<DownloadOutlined />}
//             style={{ position: 'absolute', bottom: 10, right: 150, zIndex : 10 }}
//             onClick={handleDownloadReport}
//         >
//             Download Report
//         </Button>
//         <Space size={20} direction="vertical" style={{ marginLeft: "420px" }}>
//             <Typography.Title level={10} color="white" style={{overflowY:"hidden"}}>EBH Housekeeping</Typography.Title>
//             <Space direction="horizontal">
           
//                 <DashboardCard
//                     icon={<UserOutlined style={{ color: "white", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
//                     title={"Total Employes"}
//                     value={proData.length}
//                 />
//                   <DashboardCard
//                     icon={<UserOutlined style={{ color: "white", backgroundColor: "red", borderRadius: 20, fontSize: 24, padding: 8 }} />}
//                     title={"Total  Pending Task"}
//                     value={pendingComplaints}
//                 />
                
//                 <DashboardCard
//                     icon={<UserOutlined style={{ color: "white", backgroundColor: "orange", borderRadius: 20, fontSize: 24, padding: 8 }} />}
//                     title={"Total Task Inprogress "}
//                     value={InProgressTask}
//                 />
              
//                 <DashboardCard
//                     icon={<UserOutlined style={{ color: "white", backgroundColor: "green", borderRadius: 20, fontSize: 24, padding: 8 }} />}
//                     title={"Total Task Completed"}
//                     value={CompletedTask}
//                 />
//             </Space>
//             <Space>
//                 {/* <RecentOrders recentOrders={recentOrders} /> */}
//                 <div id="chart-container">
//                     <DashboardChart reveneuData={reveneuData} options={options} />
//                 </div>
//             </Space>
//         </Space>
//         </>
//     );
// }

// function DashboardCard({ title, value, icon }) {
//     return (
//         <Card>
//             <Space direction="horizontal">
//                 {icon}
//                 <Statistic title={title} value={value} />
//             </Space>
//         </Card>
//     );
// }

// // function RecentOrders({ recentOrders }) {
// //     return (
// //         <>
// //             {/* <Typography.Text>Recent Complains</Typography.Text> */}
// //             {/* <Table
// //                 columns={[
// //                     { title: "Title", dataIndex: "title" },
// //                     { title: "Quantity", dataIndex: "quantity" },
// //                     { title: "Price", dataIndex: "discountedPrice" },
// //                 ]}
// //                 dataSource={recentOrders}
// //                 pagination={false}
// //             /> */}
// //         </>
// //     );
// // }

// // function DashboardChart({ reveneuData, options }) {
// //     return (
// //         <Card style={{ width: 900, height: 600 }}>
// //             <Bar options={options} data={reveneuData} />
// //         </Card>
// //     );
// // }

// function DashboardChart({ reveneuData, options }) {
//     const barStyle = {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%', // Ensure the Bar fills the Card horizontally
//         height: '100%' // Ensure the Bar fills the Card vertically
//     };

//     return (
//         <Card style={{ width: 1000, height: 600 }}>
//             <div style={barStyle}>
//                 <Bar options={options} data={reveneuData} />
//             </div>
//         </Card>
//     );
// }


// export default Dashboard;
