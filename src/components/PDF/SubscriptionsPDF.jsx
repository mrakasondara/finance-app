import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "@/app/api/pdf/style";

export const SubscriptionsPDF = ({ data, email }) => {
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  return (
    <Document>
      <Page orientation="landscape">
        <Text style={styles.header}>Vaulto</Text>
        <Text style={styles.title}>Subscriptions Data</Text>
        <Text style={styles.author}>{email}</Text>
        <Text style={styles.date}>
          {new Date(data[data.length - 1].due_date).toLocaleDateString()} -{" "}
          {new Date(data[0].due_date).toLocaleDateString()}
        </Text>

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
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{subscription.category}</Text>
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
          <View style={styles.tableRow}>
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
      </Page>
    </Document>
  );
};
