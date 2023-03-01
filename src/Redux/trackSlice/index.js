import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../data";
import { getCitiesRequest } from "../../helpers/api";

export const setUserThunk = createAsyncThunk(
  "track/setUserThunk",
  async function ({ values, cb, error }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error || data.status > 205) {
        throw new Error(data.message);
      } else {
        localStorage.setItem("token", JSON.stringify(data.token));
        cb();

        dispatch(setUser({ data }));
      }
    } catch (e) {
      error(e);
      rejectWithValue(e);
    }
  }
);

export const setCitiesThunk = createAsyncThunk(
  "track/setCitiesThunk",
  async function ({ query, error, cb }, { dispatch, rejectWithValue }) {
    try {
      const data = await getCitiesRequest(query);
      if (!data || data.error) {
        cb();
        console.log("hello");
        throw new Error(data.error.message);
      }

      return data;
    } catch (e) {
      error(e);
    }
  }
);

export const setFobThunk = createAsyncThunk(
  "track/setFobThunk",
  async function ({ cb }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/fob`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const createCityThunk = createAsyncThunk(
  "track/createCityThunk",
  async function ({ values }, { dispatch, rejectWithValue }) {
    const res = await fetch(`${BACKEND_URL}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data);
    dispatch(createCity({ data }));
  }
);

export const createPortThunk = createAsyncThunk(
  "track/createPortThunk",
  async function ({ values, cbError }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/ports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (data.code) throw new Error("Duplicated City");
      dispatch(createPort({ data }));
    } catch (e) {
      console.log(e);
      cbError();
    }
  }
);

export const changePortThunk = createAsyncThunk(
  "track/changePortThunk",

  async function ({ values, _id, onclose }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/ports/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.code === 11000) {
        alert("Duplicated");
      }

      dispatch(editPort({ data }));
      onclose();
    } catch (e) {
      console.log(e);
    }
  }
);

export const changeCityThunk = createAsyncThunk(
  "track/changeCityThunk",

  async function ({ values, _id, changeEdit }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/cities/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      dispatch(editCity({ data }));
      changeEdit();
    } catch (e) {
      console.log(e);
      alert("Duplicated");
    }
  }
);

export const deleteCityThunk = createAsyncThunk(
  "track/deleteCityThunk",
  async function ({ _id }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/cities/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!res.ok) {
        console.log(_id);
      } else {
        dispatch(deleteCity({ _id }));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const setPortThunk = createAsyncThunk(
  "track/setPortThunk",
  async function (_, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/ports`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      dispatch(setPorts({ data }));
    } catch (e) {
      console.log(e);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const trackSlice = createSlice({
  name: "track",
  initialState: {
    user: null,
    cities: [],
    ports: [],
    fob: [],
    error: null,
    status: null,
  },
  reducers: {
    setUser(state, action) {
      const { user } = action.payload.data;
      return {
        ...state,
        user,
      };
    },
    setPorts(state, action) {
      const ports = action.payload.data;

      return {
        ...state,
        ports,
      };
    },
    createPort(state, action) {
      const port = action.payload.data;
      const ports = [...state.ports, port];
      return {
        ...state,
        ports,
      };
    },
    editPort(state, action) {
      const editedPort = action.payload.data;
      const ports = state.ports.map((port) => {
        if (port._id === editedPort._id) {
          return editedPort;
        }
        return port;
      });

      return {
        ...state,
        ports,
      };
    },
    createCity(state, action) {
      const city = action.payload.data;
      const cities = [...state.cities, city];
      return {
        ...state,
        cities,
      };
    },
    editCity(state, action) {
      const changedCity = action.payload.data;
      const cities = state.cities.map((city) => {
        if (city._id === changedCity._id) {
          return changedCity;
        }
        return city;
      });

      return {
        ...state,
        cities,
      };
    },
    deleteCity(state, action) {
      const deletedId = action.payload._id;
      const cities = state.cities.filter((city) => city._id !== deletedId);
      return {
        ...state,
        cities,
      };
    },
  },
  extraReducers: {
    [setUserThunk.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [setUserThunk.rejected]: setError,
    [setCitiesThunk.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [setCitiesThunk.fulfilled]: (state, action) => {
      const data = action.payload;
      state.status = "resolved";
      state.cities = data;
    },
    [setCitiesThunk.rejected]: setError,
    [setPortThunk.fulfilled]: (state, action) => {
      state.status = "resolved";
    },
    [setPortThunk.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [setPortThunk.rejected]: setError,
  },
});

const {
  editPort,
  setUser,
  setPorts,
  createCity,
  deleteCity,
  editCity,
  createPort,
} = trackSlice.actions;

export default trackSlice.reducer;
