const baseAPI = "http://localhost:3000/api";

function buildQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "all"
    ) {
      query.append(key, value);
    }
  });
  return query.toString();
}

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
  static async getProfile() {
    try {
      const response = await fetch(`${baseAPI}/profile`, {
        credentials: "include",
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateShortProfile(newData) {
    try {
      const response = await fetch(`${baseAPI}/profile/short-profile`, {
        method: "PUT",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async updatePersonalProfile(newData) {
    try {
      const response = await fetch(`${baseAPI}/profile/personal-profile`, {
        method: "PUT",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async resetPassword(newData) {
    try {
      const response = await fetch(`${baseAPI}/profile/reset-password`, {
        method: "PUT",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async addSubscription(newData) {
    try {
      const response = await fetch(`${baseAPI}/subscriptions`, {
        method: "POST",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getSubcriptions(params = {}) {
    const query = buildQuery(params);
    const url = query
      ? `${baseAPI}/subscriptions?${query}`
      : `${baseAPI}/subscriptions`;
    try {
      const response = await fetch(url);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateSubscription(newData, id) {
    try {
      const response = await fetch(`${baseAPI}/subscriptions/${id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteSubscription(id) {
    try {
      const response = await fetch(`${baseAPI}/subscriptions/${id}`, {
        method: "DELETE",
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getTransactions(params = {}) {
    const query = buildQuery(params);
    const url = query
      ? `${baseAPI}/transactions?${query}`
      : `${baseAPI}/transactions`;
    try {
      const response = await fetch(url);
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async addTransactions(newData) {
    try {
      const response = await fetch(`${baseAPI}/transactions`, {
        method: "POST",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async updateTransaction(newData, id) {
    try {
      const response = await fetch(`${baseAPI}/transactions/${id}`, {
        method: "PUT",
        body: JSON.stringify(newData),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async deleteTransaction(id) {
    try {
      const response = await fetch(`${baseAPI}/transactions/${id}`, {
        method: "DELETE",
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  static async getOverview(section) {
    try {
      const response = await fetch(
        `${baseAPI}/overview${section ? `?section=${section}` : ""}`
      );
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default FinanceAPI;
