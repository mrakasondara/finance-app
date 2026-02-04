import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import { transactionCategories } from "../../lib/transaction-categories";

export const TransactionsPDF = ({ data, email }) => {
  const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);
  return (
    <Document>
      <Page orientation="landscape" style={styles.font}>
        <Image src={"public/icons/logo.png"} style={styles.image} />

        <View style={styles.header}>
          <Text style={styles.title}>Transactions Data</Text>
          <Text>{email}</Text>
          {data.length ? (
            <Text>
              {new Date(data[data.length - 1].date).toLocaleDateString()}
              {data.length > 1
                ? ` - ${new Date(data[0].date).toLocaleDateString()}`
                : ""}
            </Text>
          ) : (
            ""
          )}
        </View>

        {data.length ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Category</Text>
              <Text style={styles.tableCellHeader}>Purpose</Text>
              <Text style={styles.tableCellHeader}>Date</Text>
              <Text style={styles.tableCellHeader}>Amount</Text>
              <Text style={styles.tableCellHeader}>Payment Method</Text>
            </View>
            {data.map((transaction) => {
              return (
                <View style={styles.tableRow} key={transaction.id}>
                  {transactionCategories.map((category) => {
                    if (category.id == transaction.category) {
                      return (
                        <Text style={styles.tableCell}>{category.name}</Text>
                      );
                    }
                  })}
                  <Text style={styles.tableCell}>{transaction.purpose}</Text>
                  <Text style={styles.tableCell}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      transaction.transaction_type == "income"
                        ? styles.income
                        : styles.expense,
                    ]}
                  >
                    Rp.{" "}
                    {new Intl.NumberFormat(["ban", "id"]).format(
                      transaction.amount
                    )}
                  </Text>
                  <Text style={styles.tableCell}>
                    {transaction.payment_method}
                  </Text>
                </View>
              );
            })}
            <View style={[styles.tableRow, styles.colspan]}>
              <Text style={[styles.tableCell, styles.totalRow]}>Total</Text>
              <Text style={[styles.tableCell, styles.totalRow]}></Text>
              <Text style={[styles.tableCell, styles.totalRow]}></Text>
              <Text style={[styles.tableCell, styles.totalRow]}></Text>
              <Text style={[styles.tableCell, styles.totalRow]}>
                Rp. {new Intl.NumberFormat(["ban", "id"]).format(totalAmount)}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.empty}>You have no data</Text>
        )}

        <View style={styles.footer}>
          <Text>&copy; {new Date().getFullYear()} Arthavo - Finance App</Text>
          <Text>Printed on {new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};
