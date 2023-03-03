// Query.js - Libraries imports.

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Query.js - Login queries.

export async function SigninQuery(navigation, email, password) {
  try {
    const data = {
      email: email,
      password: password,
      authTokenName: "",
    };

    const response = await axios.post(
      "http://localhost:8080/auth/login",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("id", response.data.data.account.id);
      await AsyncStorage.setItem("token", response.data.data.bearerToken);
      await AsyncStorage.setItem("name", response.data.data.account.username);
      navigation.navigate("UserStack", { screen: "Dash" });
    } else {
      alert("Error while connecting to your account.");
    }
  } catch (error) {
    alert("Error while connecting to your account.");
  }
}

export async function SignupQuery(navigation, username, email, password) {
  try {
    const data = {
      email: email,
      username: username,
      password: password,
      authTokenName: "",
    };

    const response = await axios.post(
      "http://localhost:8080/auth/signup",
      data
    );

    if (response.status === 200) {
      await AsyncStorage.setItem("id", response.data.data.account.id);
      await AsyncStorage.setItem("token", response.data.data.bearerToken);
      await AsyncStorage.setItem("name", response.data.data.account.username);
      navigation.navigate("UserStack", { screen: "Dash" });
    } else {
      alert("Error while creating your account.");
    }
  } catch (error) {
    alert("Error while creating your account.");
  }
}

// Query.js - Scenario queries.

export async function PostScenarioQuery(
  navigation,
  scenario,
  firstService,
  trigger,
  secondService,
  reaction
) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const data = {
      name: scenario,
      trigger: {
        name: trigger,
        serviceName: firstService,
        params: [],
      },
      reaction: {
        name: reaction,
        serviceName: secondService,
        params: [
          {
            name: "text",
            value: "Hello World",
            required: true,
          },
        ],
      },
    };

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:8080/scenarios/create",
      data,
      config
    );

    if (response.status === 200) {
      navigation.navigate("UserStack", { screen: "Dash" });
    } else {
      alert("Error while creating scenario.");
    }
  } catch (error) {
    alert("Error while creating scenario.");
  }
}

export async function GetScenariosQuery() {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "http://localhost:8080/scenarios",
      config
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      alert("Error while fetching scenarios.");
    }
  } catch (error) {
    alert("Error while fetching scenarios.");
  }
}

export async function DeleteScenarioQuery(id) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      "http://localhost:8080/scenarios/delete/" + id,
      config
    );

    if (response.status === 200) {
      return null;
    } else {
      alert("Error while deleting scenario.");
    }
  } catch (error) {
    alert("Error while deleting scenario.");
  }
}

// Query.js - Service queries.

export async function GetServicesQuery() {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "https://api.automateme.fr/services",
      config
    );

    if (response.status === 200) {
      return response.data;
    } else {
      alert("Error while fetching services.");
    }
  } catch (error) {
    alert("Error while fetching services.");
  }
}

export async function GetServicesLinkedQuery() {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "https://api.automateme.fr/subscriptions/",
      config
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      alert("Error while fetching linked services.");
    }
  } catch (error) {
    alert("Error while fetching linked services.");
  }
}

export async function GetServiceLinkQuery(service) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "https://api.automateme.fr/subscriptions/" + service,
      config
    );

    if (response.status === 200) {
      return response.data.data.url;
    } else {
      alert("Error while fetching authentication link.");
    }
  } catch (error) {
    alert("Error while fetching authentication link.");
  }
}

export async function PostServiceLinkQuery(navigation, service, code) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const data = {
      code: code,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      "https://api.automateme.fr/subscriptions/" + service,
      data,
      config
    );

    if (response.status === 200) {
      navigation.navigate("UserStack", { screen: "Profile" });
    } else {
      alert("Error while validating authentication link.");
    }
  } catch (error) {
    return null;
  }
}

export async function DeleteServiceQuery(service) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      "https://api.automateme.fr/subscriptions/" + service,
      config
    );

    if (response.status === 200) {
      return null;
    } else {
      alert("Error while deleting service.");
    }
  } catch (error) {
    alert("Error while deleting service.");
  }
}

// Query.js - Token query.

export async function PutAccessTokenQuery(service) {
  try {
    const bearerToken = await AsyncStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + bearerToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(
      "https://api.automateme.fr/subscriptions/" + service,
      config
    );

    if (response.status === 200) {
      alert("Access token successfully refreshed.");
    } else {
      alert("Error while updating access token.");
    }
  } catch (error) {
    alert("Error while updating access token.");
  }
}
