import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#3778C2";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#3778C2",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold"
  },
  name: {
    width: "10%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  email: {
    width: "50%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8
  },
  phone: {
    width: "20%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8
  },
  date: {
    width: "20%",
    textAlign: "right",
    paddingRight: 8
  }
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.sno.toString()}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
      <Text style={styles.date}>{(item.date)}</Text>
    </View>
  ));
  return <>{rows}</>;
};

export default InvoiceTableRow;