import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Poppins Light",
  src: "public/fonts/poppins.light.ttf",
});

Font.register({
  family: "Poppins Medium",
  src: "public/fonts/poppins.medium.ttf",
});

export const styles = StyleSheet.create({
  font: {
    fontFamily: "Poppins Light",
  },
  header: {
    marginBottom: 20,
    display: "grid",
    paddingHorizontal: 10,
    marginTop: 20,
    fontSize: 11,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins Medium",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    padding: 10,
  },
  image: {
    width: 64,
    height: 64,
  },
  table: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 11,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontFamily: "Poppins Medium",
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
    textTransform: "capitalize",
  },
  totalRow: {
    fontWeight: "bold",
  },
  colspan: {
    fontFamily: "Poppins Medium",
  },
  empty: {
    textAlign: "center",
  },
});
