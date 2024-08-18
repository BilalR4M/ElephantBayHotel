import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import InvoiceTableRow from "./InvoiceTableRow";

const borderColor = "#00519C";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#3778C2"
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#00519C",
    backgroundColor: "#00519C",
    color: "#fff",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1
  },
  name: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  email: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  phone: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  date: {
    width: "20%"
  }
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    {/* Invoice Table Header */}
    <View style={styles.container}>
      <Text style={styles.name}>Name</Text>
      <Text style={styles.email}>Suggestions</Text>
      <Text style={styles.phone}>Rating</Text>
      <Text style={styles.date}>date</Text>
    </View>
    {/* Invoice Table Rows */}
    <InvoiceTableRow items={invoice.items} />
  </View>
);

export default InvoiceItemsTable;