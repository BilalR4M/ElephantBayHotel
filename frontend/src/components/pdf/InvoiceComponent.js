import React from "react";
import { Document, Page, StyleSheet, Image, Text, View } from "@react-pdf/renderer";
import InvoiceNo from "./InvoiceNo";
import InvoiceBillTo from "./InvoiceBillTo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import logo from '../../assets/img/logo2.png';
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    lineHeight: 1.5,
    flexDirection: "column"
  },
  logo: {
    width: 150,
    height: 150,
  },
  mainHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: 'flex-start',
  },
  text:{
    fontWeight: 'bold',
    paddingLeft: 30,
    paddingTop: -50,
    paddingBottom: 10,
    lineHeight: 1.5,
    flexDirection: "column"
  },
  viewer: {
    width: window.innerWidth / 3,
    height: window.innerHeight / 2,
  },
});

const InvoiceComponent = ({ invoice }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.mainHeader}>
          <Image
            style={styles.logo}
            src={logo}
          />
          <Text style={styles.text}>Hotel Elepantbay</Text>
        </View>
        <InvoiceNo invoice={invoice} />
        <InvoiceBillTo invoice={invoice} />
        <InvoiceItemsTable invoice={invoice} />
      </Page>
    </Document >
  );
};

export default InvoiceComponent;