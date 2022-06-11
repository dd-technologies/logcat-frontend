import {
  COUNT_PER_PAGE,
  DATE_SELECTION,
  DATE,
  LOGTYPE,
  MULTY_CHECKBOX_SELECTION,
  RECORDS,
  SEARCH_FIELD,
  SELECT_PAGE_NO,
  SINGLE_CHECKBOX_SELECTION,
  SORT_ICON_FILTER,
  STATUS_SELECTION,
  ALL_CHECKBOX_SELECTED,
} from "./Type";

export const checkBoxReducer = (state, action) => {
  console.log("data action", action.data);

  switch (action.type) {
    //CHECKBOX SECTION
    case SINGLE_CHECKBOX_SELECTION:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    case MULTY_CHECKBOX_SELECTION:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    //PAGE SECTION
    case SELECT_PAGE_NO:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    //PAGINATION SECTION
    case DATE_SELECTION:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    case STATUS_SELECTION:
      return {
        ...state,
        type: action.type,
        statusSection: action.data,
      };

    case COUNT_PER_PAGE:
      return {
        ...state,
        type: action.type,
        countPerPage: action.data,
      };

    //LOGTYPE SECTION
    case LOGTYPE:
      return {
        ...state,
        type: action.type,
        logType: action.data,
      };

    //FILTER SECTION
    case SORT_ICON_FILTER:
      return {
        ...state,
        type: action.type,
        sortIconFilter: action.data,
      };

    //RECORDS SECTION
    case RECORDS:
      return {
        ...state,
        type: action.type,
        record: action.data,
      };

    //DATE SECTION
    case DATE:
      return {
        ...state,
        type: action.type,
        pageNo: action.data,
      };

    // SEARCH FILED
    case SEARCH_FIELD:
      return {
        ...state,
        type: action.type,
        searchField: action.data,
      };

    // ALL CHECKBOX SELECTION
    case ALL_CHECKBOX_SELECTED:
      return {
        ...state,
        type: action.type,
        allCheckBox: action.data,
      };

    default:
      return state;
  }
};
