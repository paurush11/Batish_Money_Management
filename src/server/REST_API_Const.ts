const USERS = "localhost:8080/users/"
const GET_USER_BY_EMAIL_OR_ID = "localhost:8080/users/" // + ID OR EMAIL
const REGISTER = "localhost:8080/api/v1/auth/register"
const AUTHENTICATE = "localhost:8080/api/v1/auth/authenticate"
const GET_ALL_EXPENSES = "localhost:8080/expenses/"
const ADD_EXPENSE = "localhost:8080/expenses/"
const ADD_EXPENSES = "localhost:8080/expenses/all/"
const GET_EXPENSE_BY_OR_ID = "localhost:8080/expenses/" // + ID
const EDIT_EXPENSE_BY_OR_ID = "localhost:8080/expenses/" // + ID
const DELETE_EXPENSE_BY_OR_ID = "localhost:8080/expenses/" // + ID

export {
    USERS,
    GET_ALL_EXPENSES,
    GET_EXPENSE_BY_OR_ID,
    GET_USER_BY_EMAIL_OR_ID,
    REGISTER,
    ADD_EXPENSE, ADD_EXPENSES,
    AUTHENTICATE, EDIT_EXPENSE_BY_OR_ID,
    DELETE_EXPENSE_BY_OR_ID
};
