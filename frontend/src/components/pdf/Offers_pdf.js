import React, { useEffect, useRef, useState } from 'react';
import summaryApi from "../../common";
import STATUS from "../../common/status";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import MyPDF from './InvoiceComponent';
import moment from "moment";

const Offers_pdf = () => {
    const pdfRef = useRef();

    const [allPackage, setAllPackage] = useState([]);
    const [activePackageCount, setActivePackageCount] = useState(0);
    const [inactivePackageCount, setInactivePackageCount] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const fetchAllPackage = async () => {
        try {
            const response = await fetch(summaryApi.allPackage.url);
            const dataResponse = await response.json();
            console.log("package data", dataResponse);
            const packages = dataResponse?.data || [];
            setAllPackage(packages);
            // Calculate counts

            const activePackages = packages.filter(pack => pack?.status === STATUS.Active);
            const inactivePackages = packages.filter(pack => pack?.status !== STATUS.Active);
            setActivePackageCount(activePackages.length);
            setInactivePackageCount(inactivePackages.length);

        } catch (error) {
            console.error("Error fetching all packages:", error);
        }
    };

    useEffect(() => {
        fetchAllPackage();
    }, []);


    //messages
    const [allEmail, setAllEmail] = useState([]);
    const [openSendMessage, setOpenSendMessage] = useState(false);
    const fetchAllEmails = async () => {
        try {
            const response = await fetch(summaryApi.get_emails.url);
            const dataResponse = await response.json();
            console.log("email data", dataResponse);
            setAllEmail(dataResponse?.data || []);
        } catch (error) {
            console.error("Error fetching all emails:", error);
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            await fetchAllPackage();
            await fetchAllEmails();
      
            // Set current date and time
            const now = new Date();
            const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
            const formattedTime = `${now.getHours()}:${now.getMinutes()}`;
            setCurrentDate(`${formattedDate} `);
            setCurrentTime(`${formattedTime} `);
          };
          fetchInitialData();
    }, []);



const InvoiceData = {
    id: "5df3180a09ea1",
    invoice_no: "873512-28",
    email: "hotelelephantbay@gmail.com",
    phone: "+94 352 266 731",
    address: "Pinnawala, Pinnawala, 71100",
    trans_date: currentDate,
    time: currentTime,
    companyID: "10001",
    companyName: "Hotel Elepantbay",
    all: allPackage.length,
    active: activePackageCount,
    deactive: inactivePackageCount,
    msg: allEmail.length,
    items: allEmail.map((data, index) => ({
        sno: index + 1,
        name: data.firstName,
        email: data.email,
        phone: data.phone,
        date: moment(data?.createdAt).format('LL')
    }))
};

return (
    <div>
        <PDFViewer style={{ width: "100%", height: "800px" }} showToolbar={false}>
            <MyPDF invoice={InvoiceData} />
        </PDFViewer>

        {/* Download button */}
        <div style={{ textAlign: 'center', marginTop: '2px' }}>
            <PDFDownloadLink
                document={<MyPDF invoice={InvoiceData} />}
                fileName="offers.pdf"
            >
                {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
            </PDFDownloadLink>
        </div>
    </div>
);
};

export default Offers_pdf;
