import { StyleSheet, Font } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    // fontFamily: "Poppins",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 14,
    // fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    // fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#59ac77",
    marginTop: 20,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  table: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 20,
    fontSize: 13,
    marginLeft: 20,
    marginRight: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
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
    fontSize: 14,
  },
});
