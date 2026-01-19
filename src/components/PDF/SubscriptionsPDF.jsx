import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import { transactionCategories } from "../../lib/transaction-categories";

export const SubscriptionsPDF = ({ data, email }) => {
  const totalAmount = data?.reduce((sum, item) => sum + item.amount, 0);
  return (
    <Document>
      <Page orientation="landscape" style={styles.font}>
        <Image src={"public/icons/logo.png"} style={styles.image} />

        <View style={styles.header}>
          <Text style={styles.title}>Subscriptions Data</Text>
          <Text>{email}</Text>
          {data.length ? (
            <Text>
              {new Date(data[data.length - 1].due_date).toLocaleDateString()} -{" "}
              {new Date(data[0].due_date).toLocaleDateString()}
            </Text>
          ) : (
            ""
          )}
        </View>

        {data.length ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Category</Text>
              <Text style={styles.tableCellHeader}>Subscription</Text>
              <Text style={styles.tableCellHeader}>Due Date</Text>
              <Text style={styles.tableCellHeader}>Amount</Text>
              <Text style={styles.tableCellHeader}>Payment Method</Text>
              <Text style={styles.tableCellHeader}>Status</Text>
            </View>
            {data.map((subscription) => {
              return (
                <View style={styles.tableRow} key={subscription.id}>
                  {transactionCategories.map((category) => {
                    if (category.id == subscription.category) {
                      return (
                        <Text style={styles.tableCell}>{category.name}</Text>
                      );
                    }
                  })}
                  <Text style={styles.tableCell}>
                    {subscription.subscription}
                  </Text>
                  <Text style={styles.tableCell}>
                    {new Date(subscription.due_date).toLocaleDateString()}
                  </Text>
                  <Text style={styles.tableCell}>{subscription.amount}</Text>
                  <Text style={styles.tableCell}>
                    {subscription.payment_method}
                  </Text>
                  <Text style={styles.tableCell}>{subscription.status}</Text>
                </View>
              );
            })}
            <View style={[styles.tableRow, styles.colspan]}>
              <Text style={[styles.tableCell, styles.totalRow]}>Total</Text>
              <Text style={[styles.tableCell, styles.totalRow]}></Text>
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
          <Text>&copy; {new Date().getFullYear()} Vaulto - Finance App</Text>
          <Text>Printed on {new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
};
