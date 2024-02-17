const USERS = "http://localhost:8080/users/";
const GET_USER_BY_EMAIL_OR_ID = "http://localhost:8080/users/"; // + ID OR EMAIL
const GET_USER_BY_USERNAME = "http://localhost:8080/users/user"; // + ID OR EMAIL
const REGISTER = "http://localhost:8080/api/v1/auth/register";
const AUTHENTICATE = "http://localhost:8080/api/v1/auth/authenticate";
const GET_ALL_EXPENSES = "http://localhost:8080/expenses/";
const ADD_EXPENSE = "http://localhost:8080/expenses/";
const ADD_EXPENSES = "http://localhost:8080/expenses/all/";
const GET_EXPENSE_BY_OR_ID = "http://localhost:8080/expenses/"; // + ID
const EDIT_EXPENSE_BY_OR_ID = "http://localhost:8080/expenses/"; // + ID
const DELETE_EXPENSE_BY_OR_ID = "http://localhost:8080/expenses/"; // + ID
const GET_ALL_USER_EXPENSES = "http://localhost:8080/expenses/user"; // + ID
const DELETE_ALL_USER_EXPENSES = "http://localhost:8080/expenses/user"; // + ID
const DELETE_USER = "http://localhost:8080/users"; // + ID

export {
  USERS,
  GET_ALL_EXPENSES,
  GET_EXPENSE_BY_OR_ID,
  GET_USER_BY_EMAIL_OR_ID,
  REGISTER,
  ADD_EXPENSE,
  ADD_EXPENSES,
  AUTHENTICATE,
  EDIT_EXPENSE_BY_OR_ID,
  DELETE_EXPENSE_BY_OR_ID,
  GET_USER_BY_USERNAME,
  GET_ALL_USER_EXPENSES,
  DELETE_ALL_USER_EXPENSES,
  DELETE_USER,
};
