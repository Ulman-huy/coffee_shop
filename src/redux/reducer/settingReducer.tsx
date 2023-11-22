import { createSlice } from "@reduxjs/toolkit";

interface SettingType {
  language: string;
  theme: string;
}

const initialSetting: SettingType = { language: "vi_VN", theme: "light" };

export const settingReducer = createSlice({
  name: "setting",
  initialState: initialSetting,
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    changeTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { changeLanguage, changeTheme } = settingReducer.actions;

export default settingReducer.reducer;
