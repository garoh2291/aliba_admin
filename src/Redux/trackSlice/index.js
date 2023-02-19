import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../data";

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
      }

      return { user: data.user };
    } catch (e) {
      error(e);
      rejectWithValue(e);
    }
  }
);

export const setCitiesThunk = createAsyncThunk(
  "track/setCitiesThunk",
  async function ({ error, cb }, { dispatch, rejectWithValue }) {
    try {
      const res = await fetch(`${BACKEND_URL}/cities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        cb();
        throw new Error(data.error.message);
      }

      return data;
    } catch (e) {
      error(e);
    }
  }
);

export const createCityThunk = createAsyncThunk(
  "track,createCityThunk",
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
    createCity(state, action) {
      const city = action.payload.data;
      const cities = [...state.cities, city];
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
    [setUserThunk.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.status = "resolved";

      state.user = user;
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
  },
});

const { setUser, setPorts, createCity } = trackSlice.actions;

export default trackSlice.reducer;
