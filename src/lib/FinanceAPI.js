const baseAPI = "http://localhost:3000/api";
class FinanceAPI {
  static async register(userData) {
    try {
      const response = await fetch(`${baseAPI}/register`, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static getSubcriptions() {}
  static getTransactions() {}
}

export default FinanceAPI;
