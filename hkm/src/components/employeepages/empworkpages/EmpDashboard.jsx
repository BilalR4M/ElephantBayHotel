import {
    UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmpDashboard=()=> {
    const [proData, setProData] = useState([]);
    const [TaskStatus, setTaskStatus] = useState([]);

    const pendingComplaints= TaskStatus.filter(task => task.status === 'Pending').length;
    const InProgressTask= TaskStatus.filter(task => task.status === 'InProgress').length;
    const CompletedTask= TaskStatus.filter(task => task.status === 'Completed').length;

    const reveneuData = {
        labels: ["Total Employes","In-Progress", "Pending", "Completed"],
        datasets: [{
            label:  [
              "Tasks Performances"
            ],
            data: [proData.length, pendingComplaints, InProgressTask, CompletedTask],
            backgroundColor: [
                "#874CCC",   // Employes
                // "#51829B",  // Task
                "#FB6D48",   // In-Progress
                "#E72929", // Pending
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
          console.log(response);
          setProData(response.data);
          console.log("data is",proData);
        } catch (error) {
          console.log('Error while fetching data:', error);
        }
      };
    const TaskData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/gettask');
          console.log(response);
          setTaskStatus(response.data);
          console.log("data is",proData);
        } catch (error) {
          console.log('Error while fetching data:', error);
        }
      };
    
      useEffect(() => {
        EmpData();
        TaskData();
      }, []);

    return (
        <Space size={20} direction="vertical" style={{ marginLeft: "420px" }}>
            <Typography.Title level={10} color="white" style={{overflowY:"hidden"}}>My Dashboard</Typography.Title>
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



// function DashboardChart({ reveneuData, options }) {
//     return (
//         <Card style={{ width: 1000, height: 600 }}>
//             <Bar options={options} data={reveneuData} />
//         </Card>
//     );
// }

function DashboardChart({ reveneuData, options }) {
    const barStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Ensure the Bar fills the Card horizontally
        height: '100%' // Ensure the Bar fills the Card vertically
    };

    return (
        <Card style={{ width: 1000, height: 600 }}>
            <div style={barStyle}>
                <Bar options={options} data={reveneuData} />
            </div>
        </Card>
    );
}


export default EmpDashboard;
